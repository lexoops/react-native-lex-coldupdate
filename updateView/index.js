import React from "react";
import ColdUpdate from "../index";
import PropTypes from 'prop-types';
import {EasyCode} from "../util/easyCode";
import {Modal} from "@ant-design/react-native";
import {EasyReactNative} from "../util/easyReactNative";
import {height, unitHeight, width} from "../util/AdapterUtil";
import {Toast, Modal, Result,Portal} from "@ant-design/react-native";
import {check, PERMISSIONS, request, RESULTS} from "react-native-permissions";
import {Text, TouchableOpacity, View, NativeModules, NativeEventEmitter, Platform} from "react-native";

export const STATUS_ENUM ={
    CHECKING:-1,//检查更新
    MOST_NEW:0,//目前已经最新
    FIND_NEW:1,//有更新
    DOWNLOADING:2,//下载中,
    FINISH:3,//已完成
    ERROR:4//出现问题
};
export default class UpdateView extends React.Component{
    static defaultProps = {
        remoteAppVer:'1.0.0',
        url:''
    };

    static propTypes = {
        remoteAppVer:'1.0.0',
        url:''
    };

    constructor(props) {
        super(props);
        let {remoteAppVer,remoteUri} =this.props;
        this.state={
            remoteAppVer,
            remoteUri,
            showUpdate:true,
            status:STATUS_ENUM.CHECKING,
            url:'',
            processText:'0%',
        };
        this.getPermission();
    }

    componentDidMount(): void {
        this.comparisionVersion();
        this.addEvent();
    }

    render() {
        let {showUpdate,status,footer} =this.state;
        return (<Modal  transparent onClose={()=>{this.setState({showUpdate:false})}} visible={showUpdate}>
            <View style={{justifyContent:'center',alignItems:'center',padding:20 *unitHeight}}>
                <Text>{status ===STATUS_ENUM.DOWNLOADING? '下载更新包，进度'+this.state.processText:this.makeText(status)}</Text>
            </View>
            {this.getFooter(status).length>0?(<View style={{marginTop:10 *unitHeight}}>
                <View style={{justifyContent:'space-between',alignItems:'center'}}>
                    {this.getFooter(status).map((obj,index)=>{
                        return (<TouchableOpacity key={"getFooter" +index} onPress={()=>{obj.onPress()}}>
                            <Text style={[globalStyle.Text26Normal,{color:globalStyle.firstColor}]}>{obj.text}</Text>
                        </TouchableOpacity>)
                    })}
                </View>
            </View>):null}
        </Modal>);
    }

    makeText(status){
        return status ===STATUS_ENUM.CHECKING?"应用检查更新中...":
            // status ===STATUS_ENUM.MOST_NEW?"现在已是最新版本啦。":
            status ===STATUS_ENUM.FIND_NEW?"发现新版本，点击立刻更新应用":
            status ===STATUS_ENUM.DOWNLOADING?"正在下载应用":
            status ===STATUS_ENUM.FINISH?"下载已完成":
            status ===STATUS_ENUM.ERROR?"下载出错":"未知状态"
    }

    getFooter(status){
        let footer =[];
        if (status ===STATUS_ENUM.FIND_NEW){footer.push({text: '立刻更新', onPress: () => {ColdUpdate.downloadApp(this.state.url);}})}
        if (status ===STATUS_ENUM.FINISH){footer.push({text: '手动安装', onPress: () => {ColdUpdate.installUpdate();}})}
        if (status ===STATUS_ENUM.ERROR){footer.push({text: '重试', onPress: () => {this.comparisionVersion();}})}
        return footer;
    }

    //比对版本
    comparisionVersion(){
        let {remoteAppVer,remoteUri} =this.state;
        ColdUpdate.getAppVersion((ver)=>{
            let remoteVer =EasyCode.removeAllStrOfStr(remoteAppVer, ".");
            let curtVer =EasyCode.removeAllStrOfStr(ver, ".");
            console.info('版本号 '+"remote:" +remoteVer +"  local:" +curtVer);
            if (parseInt(remoteVer) !==parseInt(curtVer)) {
                this.setState({url:remoteUri,status:STATUS_ENUM.FIND_NEW});}
            else{this.setState({showUpdate:false})}
        });
    }

    addEvent(){
        let self =this;
        let { ReactNativeLoading } = NativeModules;
        let ManagerEmitter = new NativeEventEmitter(ReactNativeLoading);
        ManagerEmitter.addListener('UpdateProgressEvent',(result)=>{
            let status =(result+"")==='99%'?STATUS_ENUM.FINISH:STATUS_ENUM.DOWNLOADING;
            self.setState({processText:result+"",status});
        });
        ManagerEmitter.addListener('UpdateAppErrorEvent',(result)=>{
            self.setState({status:STATUS_ENUM.ERROR});})
    }

    getPermission(){
        let permissionType =EasyReactNative.IsAndroid()?PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE:PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        check(permissionType).then((result)=>{
            if (result ===RESULTS.GRANTED){
            }else if (result ===RESULTS.BLOCKED) {
                Modal.alert("","文件访问不能开启，应用不能正常使用",[{"text":'手动开启',onPress:()=>{LEXTool.toSelfSetting()}}])
            }else{request(permissionType).then(result=>{this.getPermission();})}
        }).catch(()=>{
            Toast.info("访问文件失败，请检查设备是否具有文件功能",.8)
        });
    }

}


import {NativeModules} from 'react-native';
import prefix from "./prefix";
export default class ColdUpdate{
    downloadApp(url) {
        NativeModules.RnColdupdate.downloadApp(url);
    }
    installUpdate() {
        NativeModules.RnColdupdate.installUpdate();
    }
    getSystemVersion (callback){
        NativeModules.RnColdupdate.getSystemVersion(callback);
    }
    getAppVersion (callback=()=>{}) {
        NativeModules.RnColdupdate.getAppVersion(callback);
    }
};


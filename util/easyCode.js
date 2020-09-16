
export const EasyCode ={
    IsPhone:function( phoneNumber){
        var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;//8到16位数字与字母组合
        var pwdReg3 = /^[1][3456789][0-9]{9}$/;//用户名要是手机号
        if( !pwdReg3.exec(phoneNumber) ) {
            return false;
        }else return true;
    },
    IsIDCard:function( IsIDCard){
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if( !reg.exec(IsIDCard) ) {
            return false;
        }else return true;
    },

    IsNotEmpty:function ( value) {
        if (value!=="" &&value!==undefined && value!==null &&value.length!==0 && value !== false &&value!== [] &&value!== {}){
            return true;
        } else return false;

    },
    EmptyFromData:function(value){
        if (typeof value != 'object') {
            return value;
        }else {
            let arr = Object.values(value);
            var isNotEmpty = arr.every((item)=>{
                return this.IsNotEmpty(item)
            });
            return isNotEmpty
        }
    },
    //是否为小数
    IsDot:function ( value) {
        var result = (value.toString()).indexOf(".");
        if(result != -1) {
            return true
        } else return false;
    },

    //是否超过指定字符，否则截断回来
    IsThenB:function (value, length) {
        if (value.length >=length){
            return value.substring(0, length);
        }
        return value;
    },

    // 距离转换
    distanceConvert(value){
        let distance = parseInt(value);
        if (distance < 1000) {
            return {
                distance:distance,
                type:'米'
            }
        }else {
            return {
                distance:(distance/1000).toFixed(2),
                type:'公里'
            }
        }
    },

    //是否包含指定字符
    IsHaveStr:function(str, target){
        if(str.indexOf(target)!==-1){
            return true;
        }
        return false;

    },

    stamp2Time(stamp){
        let stamp2 =new Date(stamp);
        let date =stamp2.getFullYear() + '-'
            +(stamp2.getMonth().toString().length>9?+stamp2.getMonth():'0' +stamp2.getMonth())
            + '-'
            +(stamp2.getDay().toString().length>9?+stamp2.getDay():'0' +stamp2.getDay()) ;
        let time =stamp2.getHours() + ':'+stamp2.getMinutes();
        return stamp2.getDate() + ' '+stamp2.getTime();
    },


    num2hundred(num){
        num =parseInt( num);
        return num- num%100;
    },


    //批量替去除指定字符
    removeAllStrOfStr(str ,target){
        return str.split(target).join("");
    },


    //批量替换指定字符
    replaceAllStrOfStr(str ,target, tostr){
        return str.split(target).join(tostr);
    },


    //替换非数字
    getNum(str){
        return str.replace(/[^\d]+/, '');
    },


    getNotEmptyString(str) {
        if (this.IsNotEmpty(str)) {
            return str;
        }
        return '';
    },

    dateStampFormatter(stamp, formatter) {
        if (!this.IsNotEmpty(stamp) || isNaN(parseInt(stamp)) ) return "";
        let date =new Date(parseInt(stamp));
        return this.dateFtt(formatter, date)
    },

    dateFtt(fmt,date) { //author: meizz
        var o = {
            "M+" : date.getMonth()+1,     //月份
            "d+" : date.getDate(),     //日
            "h+" : date.getHours(),     //小时
            "m+" : date.getMinutes(),     //分
            "s+" : date.getSeconds(),     //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S" : date.getMilliseconds()    //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    },
    time2Stamp(time){
        return new Date(time).getTime();
    },
    // 字符串是否在某区间
    dateCompareHour(t1, t2) {
        var date = new Date();
        var dangqian=date.toLocaleTimeString('chinese',{hour12:false})
        var dq=dangqian.split(":");
        var a = t1.split(":");
        var b = t2.split(":");

        var dqdq=date.setHours(dq[0],dq[1]);
        var aa=date.setHours(a[0],a[1]);
        var bb=date.setHours(b[0],b[1]);
        return aa<dqdq && dqdq < bb;

    },

    //安全截取字符想要的最大长度
    getStringSafeSub(str, length, putStr ="..."){
        if (str===""){return ""}
        if ( (str+"").length>length){
            return str.toString().substring( 0, length) +putStr;
        }
        return str;
    },

    getStringSafeSubNotPoint(str, length){
        if (str===""){return ""}
        if ( (str+"").length>length){
            return str.toString().substring( 0, length) ;
        }
        return str;
    },

    //去除富文本标签

    replaceStr(str){
        if(this.IsNotEmpty(str)){
            return str.replace(/<[^>]+>/g,"")
        } else {
            return;
        }
    },



    getUrlParams(str ,targetName) {
        var urlSearch = str;
        var urlValue="";
        //以？*&来拆分
        var params = urlSearch.split(/[?*&]/);
        for(var i=0;i<params.length;i++){
            //如果url参数里包含传递过来names字段，则取=后面的部分
            if(params[i].indexOf(targetName) >= 0 ){
                urlValue=params[i].split("=")[1];
                return urlValue;
            }
        }

        return urlValue;
    },

    ConvertName:function(chineseText){
        //获取全写拼音（调用js中方法）
        //let fullName = pinyin.getFullChars(chineseText);
        //获取简写拼音（调用js中方法）
        let easyName = pinyin.getCamelChars(chineseText);
        return easyName;
    },

    formatLog(str){
        console.info(JSON.stringify(str,undefined,2))
    }



};

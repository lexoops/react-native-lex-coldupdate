import { Platform} from 'react-native';
export let EasyReactNative={
    PlatformDo(plantOs, iosDo, androidDo){
        if(plantOs=== 'ios'){iosDo();}
        else if(plantOs=== 'android'){androidDo();}
    },

    /**
     * @return {boolean}
     */
    IsAndroid(){
        return Platform.OS ==='android';
    },

    goToPage(self, pageName, params={}) {
        self.props.navigation.navigate(pageName,params);
    },

    getBack(self,params={}) {
        self.props.navigation.goBack();
    },

};

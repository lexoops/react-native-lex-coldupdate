package com.lex.coldupdate;

import android.widget.Toast;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.lex.coldupdate.RnColdupModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RnColdupPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new RnColdupModule(reactContext));

        return modules;
    }

    // override removed to be compatible with rn0.47+
    //@Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {


        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(
            ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

}

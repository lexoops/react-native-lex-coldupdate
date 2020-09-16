package com.lex.coldupdate;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;

import android.util.Log;

import androidx.core.content.FileProvider;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.lex.coldupdate.util.EasyCode;
import com.lex.coldupdate.util.EasyFile;
import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloadListener;
import com.liulishuo.filedownloader.FileDownloader;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;

import static android.content.ContentValues.TAG;


public class RnColdupModule extends ReactContextBaseJavaModule {

    public static ReactApplicationContext reactContext;
    public static RnColdupModule reactSelf;
    public String savePath =EasyFile.getPathOfString( "/yzstwm/apk");
    public String CachePath ="";


    public RnColdupModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactSelf = this;

    }


    public static Context getContext() {
        return reactContext;
    }

    @Override
    public String getName() {
        return "RnColdupdate";
    }




    @ReactMethod
    public void downloadApp(String packageAddr) {
        startDownload(packageAddr);
    }

    String fileUrl ="";
    private  void startDownload(String packageAddr){
        CachePath  =savePath +EasyCode.SubStr2Filename( packageAddr, "?");
        File cacheFile =new File(CachePath);
        if (cacheFile.isFile() && cacheFile.exists()) {
            cacheFile.delete();
        }
        FileDownloader.setup(getCurrentActivity());
        FileDownloader.getImpl().create(packageAddr)
                .setPath(CachePath)
                .setListener(new FileDownloadListener() {
                    @Override
                    protected void pending(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                        Log.d(TAG, "pending: "); }

                    @Override
                    protected void connected(BaseDownloadTask task, String etag, boolean isContinue, int soFarBytes, int totalBytes) {
                        Log.d(TAG, "connected: ");
                    }

                    @Override
                    protected void progress(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                        Log.d(TAG, "progress: ");
                        float dumpSize =totalBytes/100;
                        float curtProgress =soFarBytes/dumpSize;
                        String VideoDProgress = (curtProgress<10)?(curtProgress +"").substring(0,1).toString():(curtProgress +"").substring(0,2).toString();
                        sendEventToJs( "UpdateProgressEvent", VideoDProgress +"%");
                    }

                    @Override
                    protected void blockComplete(BaseDownloadTask task) {
                        Log.d(TAG, "blockComplete: ");
                    }

                    @Override
                    protected void retry(final BaseDownloadTask task, final Throwable ex, final int retryingTimes, final int soFarBytes) {
                        Log.d(TAG, "retry: ");
                        showMessageAndKill();
                    }

                    @Override
                    protected void completed(BaseDownloadTask task) {
                        Log.d(TAG, "completed: ");
                        File file =new File(CachePath);
                        if (file.exists() || file.length()>=0){
                            fileUrl =CachePath;
                            check8(CachePath);
                        }else{
                            showMessageAndKill();
                        }

                    }

                    @Override
                    protected void paused(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                        Log.d(TAG, "paused: ");
                        showMessageAndKill();
                    }

                    @Override
                    protected void error(BaseDownloadTask task, Throwable e) {
                        Log.d(TAG, "error: ");
                        showMessageAndKill();
                    }

                    @Override
                    protected void warn(BaseDownloadTask task) {
                        Log.d(TAG, "warn: ");
                        showMessageAndKill();
                    }
                }).start();
    }



    public void showMessageAndKill(){
        sendEventToJs( "UpdateAppErrorEvent", "");
    };


    public static void sendEventToJs(String eventName, String str){
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName,str);
    }




    @ReactMethod
    public void  installUpdate(){
        this.check8(fileUrl);
    }

    @ReactMethod
    public void  getSystemVersion(Callback callback) {
        int sdkVersion = Build.VERSION.SDK_INT;
        callback.invoke(sdkVersion);
    }

    @ReactMethod
    public void  getAppVersion(Callback callback) throws PackageManager.NameNotFoundException {
        String versionName =reactContext.getPackageManager().getPackageInfo(reactContext.getPackageName(), 0).versionName;
        callback.invoke(versionName);
    }


    //检查未知来源
    public  void check8(String CachePath){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            try {
                File apkFile = new File( CachePath);
                Uri apkUri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() +".fileprovider", apkFile);
                Intent installIntent = new Intent(Intent.ACTION_VIEW);
                installIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                installIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                installIntent.setDataAndType(apkUri, "application/vnd.android.package-archive");
                getCurrentActivity().startActivity(installIntent);// 安装
                //android.os.Process.killProcess(android.os.Process.myPid());
            }catch (Exception e){
                e.printStackTrace();
            }
        }else{
            EasyFile.installAPK(CachePath, getCurrentActivity());
        }
    }














}

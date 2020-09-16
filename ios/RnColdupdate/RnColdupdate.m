#import <UIKit/UIKit.h>
#import "RCTBridgeModule.h"
// 版本号
#define VersionNumber @"1.0.0"
#define AppStoreId @""

@interface RnColdupdate : NSObject <RCTBridgeModule>
@end

@implementation RnColdupdate

RCT_EXPORT_MODULE(RnColdupdate);

RCT_EXPORT_METHOD(exitApp)
{
    exit(0);
};

RCT_EXPORT_METHOD(downloadApp:(NSString *)url)
{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"openAppstore" object:nil];
    
}

RCT_EXPORT_METHOD(installUpdate)
{
    
}

RCT_EXPORT_METHOD(getSystemVersion:(RCTResponseSenderBlock)callback) {
    callback(@[VersionNumber]);
}

@end

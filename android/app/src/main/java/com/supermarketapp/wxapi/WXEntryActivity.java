/*
 * @Description: 
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-24 14:14:42
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-24 14:42:47
 */

package com.supermarketapp.wxapi;
import android.app.Activity;
import android.os.Bundle;
import com.theweflex.react.WeChatModule;
public class WXEntryActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WeChatModule.handleIntent(getIntent());
    finish();
  }
}

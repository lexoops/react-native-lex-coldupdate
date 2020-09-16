package com.lex.coldupdate.util;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EasyCode{

        //找到图片路径的最后一个/， 用于生成filename
        public static String SubStr2Filename(String str){
            int lastCodeBeginPos =0;
            for (int strTag=0;strTag<str.length();strTag++){
                if (str.substring(strTag, strTag+1).equals("/") ){
                    lastCodeBeginPos =strTag;
                }
            }

            return  str.substring(lastCodeBeginPos +1, str.length());
        }

        //找到图片路径的最后一个/， 用于生成filename
        public static String SubStr2Filename(String str, String endCode){
        int lastCodeBeginPos =0;
        for (int strTag=0;strTag<str.length();strTag++){
            if (str.substring(strTag, strTag+1).equals("/") ){
                lastCodeBeginPos =strTag;
            }
        }
        String formatAndvalue =str.substring(lastCodeBeginPos +1, str.length());
        String endResult =formatAndvalue;
        if (endCode!=""&& !endCode.equals("")){
            for (int endTag=0;endTag<formatAndvalue.length();endTag++){
                if (formatAndvalue.substring(endTag, endTag+1).equals(endCode) ){
                    endResult =formatAndvalue.substring(0, endTag);
                }
            }
        }
        return  endResult;
    }




    //找到图片路径的最后一个/， 取得去掉文件名后的dir
        public static String getFilePath(String str){
        int lastCodeBeginPos =0;
        for (int strTag=0;strTag<str.length();strTag++){
            if (str.substring(strTag, strTag+1).equals("/") ){
                lastCodeBeginPos =strTag;
            }
        }

        return  str.substring(0, lastCodeBeginPos +1);
    }


        //找到字符的格式，且变更为指定的字符
        public static String format2New(String str, String newFormat){
            int lastCodeBeginPos =0;
            for (int strTag=0;strTag<str.length();strTag++){
                if (str.substring(strTag, strTag+1).equals(".") ){
                    lastCodeBeginPos =strTag;
                }
            }
            newFormat =str.substring(0, lastCodeBeginPos) +newFormat;
            return  newFormat;
        }



        //去除所有特殊字符
        public static String rmSpCode(String str){
            return str.replaceAll("[^0-9a-zA-Z\u4e00-\u9fa5.，,。？“”]+","");
        }






    /*
     * 将时间转换为时间戳
     */
    public static String date2Stamp(String s) throws ParseException {
        String res;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = simpleDateFormat.parse(s);
        long ts = date.getTime();
        res = String.valueOf(ts);
        return res;
    }



    /*
     * 将时间戳转换为时间
     */
    public static String Stamp2Date(String s){
        String res;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long lt = new Long(s);
        Date date = new Date(lt);
        res = simpleDateFormat.format(date);
        return res;
    }



    //去掉特殊字符
    public static String CutAllSpWord(String str) {

        String regEx="[`~!@#$%^&*()+=|{}:;\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？a-zA-Z0-9 ]";
        Pattern pattern = Pattern.compile(regEx);
        Matcher matcher = pattern.matcher(str);
        return matcher.replaceAll("").trim();
    }

    //是否包含指定字符
    public static boolean IsHasCode(String sourcesText, String regText){
        return  sourcesText.contains(regText);
    }

    //是否不为空
    public static boolean IsNotEmpty(Object object){
        return object != "" && object != null;

    }



}

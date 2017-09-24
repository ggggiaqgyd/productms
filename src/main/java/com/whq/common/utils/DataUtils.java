package com.whq.common.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by wanghongqing on 16/3/19.
 */
public class DataUtils {
    /**
     * 将数据转换为返回值信息
     * @param list
     * @param totalCount
     * @return
     */
    public static HashMap<String,Object> responseData(List list,Integer totalCount){
        HashMap<String,Object> map = new HashMap<String, Object>();
        map.put("root",list);
        map.put("totalCount",totalCount);
        return map;
    }
    public static List<Integer> converIds(String ids){
        List<Integer> list = new ArrayList<Integer>();
        if(ids==null || "".equals(ids.trim())){
            return list;
        }
        String[] _userIds = ids.split(",");
        for (int i = 0; i < _userIds.length; i++) {
            list.add(Integer.parseInt(_userIds[i]));
        }
        return list;
    }
}

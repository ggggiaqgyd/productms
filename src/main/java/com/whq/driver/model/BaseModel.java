package com.whq.driver.model;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by wanghongqing on 16/3/14.
 */
public class BaseModel {
    /**
     * mybatis传值使用
     */
    private Map<String,Object> properties;

    public Map<String, Object> getProperties() {
        if(null == properties){
            properties = new HashMap<String, Object>();
        }
        return properties;
    }

    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }
    public void putProperties(String key,Object object){
        if(null == properties){
            properties = new HashMap<String, Object>();
        }
        properties.put(key,object);
    }
    public void setPropertiesValue(String key,Object value){
        if(null == properties){
            properties = new HashMap<String, Object>();
        }
        properties.put(key,value);
    }
}

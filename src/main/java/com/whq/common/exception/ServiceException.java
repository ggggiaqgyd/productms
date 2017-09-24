package com.whq.common.exception;

/**
 * Created by wanghongqing on 16/2/27.
 */
public class ServiceException extends RuntimeException {
    public ServiceException(String msg){
        super(msg);
    }
}

package com.whq.web.controller;

import com.whq.common.config.Config;
import com.whq.driver.model.BaseModel;
import com.whq.driver.model.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

/**
 * Created by wangying on 2016/2/23.
 */
public class BaseController {
    protected User getCurrentUser(HttpServletRequest request) {
        Object obj = request.getSession().getAttribute(Config.USER_SESSION);
        User user = (User) obj;
        return user;
    }

    protected HttpSession getSession(HttpServletRequest request) {
        return request.getSession();
    }

    /**
     * 加放公共设置分页方法
     *
     * @param model
     * @param request
     */
    protected void setLimit(BaseModel model, HttpServletRequest request) {
        String start = request.getParameter("start");
        String pageSize = request.getParameter("pageSize");
        Map<String, Object> map = model.getProperties();
        if (null != start && null != pageSize && start.length() > 0 && pageSize.length() > 0) {
            map.put("start", Integer.parseInt(start));
            map.put("pageSize", Integer.parseInt(pageSize));
        }
    }

}
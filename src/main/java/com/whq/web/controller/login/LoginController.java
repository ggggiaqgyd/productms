package com.whq.web.controller.login;

import com.whq.common.config.Config;
import com.whq.common.exception.ServiceException;
import com.whq.driver.model.User;
import com.whq.service.user.IUserService;
import com.whq.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 用于实现登陆的类
 * Created by wangying on 2016/2/20.
 */
@Controller
public class LoginController extends BaseController{
    @Autowired
    private IUserService iUserService;
    /**
     * @param user
     * @return
     */
    @RequestMapping(value = "/toIndex",method = RequestMethod.POST)
    public String toIndex(User user, Map<String,Object> map, HttpServletRequest request){
        String username = user.getUsername();
        String password = user.getPassword();
        if(null == username || null == password || username.length()==0 || password.length()==0){
            map.put("success",false);
            map.put("msg","用户名,密码不能为空!");
            return "login";
        }
        map.put("user",user);
        User tempUser = null;
        try {
            tempUser = iUserService.findUserByName(username);
        } catch (ServiceException e) {
            e.printStackTrace();
        }
        if(null == tempUser){
            map.put("success",false);
            map.put("msg","用户不存在,请查询后再试!");
            return "login";
        }else if(!tempUser.getPassword().equals(password)){
            map.put("success",false);
            map.put("msg","密码错误,请重试!");
            return "login";
        }
        request.getSession().setAttribute(Config.USER_SESSION,tempUser);
        return "index";
    }

    /**
     * 跳转到登陆页面
     * @return
     */
    @RequestMapping(value = "/")
    public String toLogin(){
        return "login";
    }
    @RequestMapping(value = "/logout")
    public String toLogout(HttpServletRequest request){
        request.getSession().setAttribute(Config.USER_SESSION,null);
        return "login";
    }

    /**
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getCurrentUser")
    public User getCurrentUser(HttpServletRequest request){
        User user = (User)request.getSession().getAttribute(Config.USER_SESSION);
        return user;
    }
}

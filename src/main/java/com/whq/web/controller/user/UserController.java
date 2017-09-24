package com.whq.web.controller.user;

import com.whq.common.utils.DataUtils;
import com.whq.driver.model.User;
import com.whq.service.user.IUserService;
import com.whq.web.controller.BaseController;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户控制器
 * Created by wanghongqing on 16/2/27.
 */
@RequestMapping("/user")
@Controller
public class UserController extends BaseController {
    private Log logger = LogFactory.getLog(UserController.class);
    @Autowired
    private IUserService iUserService;

    /**
     * 得到用户列表
     * @param user
     * @param request
     * @return
     */
    @RequestMapping("/getUserList")
    @ResponseBody
    public Map<String, Object> userList(User user, HttpServletRequest request){
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            this.setLimit(user, request);
            map = iUserService.findByUser(user);
        } catch (Exception e) {
            logger.error("得到用户列表出错",e);
            map.put("success",false);
            map.put("msg","程序出错,请联系管理员");
        }
        return map;
    }

    @RequestMapping("/saveUser")
    @ResponseBody
    public Map<String, Object> saveUser(User reqUser){
        HashMap<String, Object> map = new HashMap<String, Object>();
        try {
            if (reqUser.getId() != null) {
                iUserService.editUser(reqUser);
                map.put("success", true);
                map.put("msg", "保存成功!");
                return map;
            }

            User user = iUserService.findUserByName(reqUser.getUsername());
            if (null != user) {
                map.put("success", false);
                map.put("msg", "用户已存在!");
                return map;
            }
            reqUser.setRoleId(0);
            reqUser.setStatus(1);
            iUserService.saveUser(reqUser);
            map.put("success", true);
            map.put("msg", "保存成功!");
        } catch (Exception e) {
            logger.error("保存用户出错",e);
            map.put("success",false);
            map.put("msg","程序出错,请联系管理员");
        }
        return map;

    }

    @RequestMapping("/delUser")
    @ResponseBody
    public Map<String, Object> delUser(HttpServletRequest request) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        try {
            String userIds = request.getParameter("userIds");
            if (null == userIds || userIds.length() == 0) {
                map.put("success", false);
                map.put("msg", "没有获取到数据");
                return map;
            }
            List<Integer> ids = DataUtils.converIds(userIds);
            iUserService.delUsers(ids);
            map.put("success", true);
            map.put("msg", "删除成功!");
        } catch (Exception e) {
            logger.error("删除用户出错",e);
            map.put("success",false);
            map.put("msg","程序出错,请联系管理员");
        }
        return map;
    }

}

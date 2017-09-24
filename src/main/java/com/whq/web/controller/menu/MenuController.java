package com.whq.web.controller.menu;

import com.whq.common.utils.DataUtils;
import com.whq.driver.model.Menu;
import com.whq.driver.model.User;
import com.whq.service.menu.IMenuService;
import com.whq.web.controller.BaseController;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wanghongqing on 2016/3/9.
 */
@Controller
@RequestMapping(value = "/menu")
public class MenuController extends BaseController{
    private Log logger = LogFactory.getLog(MenuController.class);
    @Autowired
    private IMenuService iMenuService;

    @RequestMapping(value = "/firstMenus")
    @ResponseBody
    public List<Menu> getFirstMenu(HttpServletRequest request) {
        User user = this.getCurrentUser(request);
        List<Menu> list = new ArrayList<Menu>();
        try {
            list = iMenuService.getFirstMenus(user);
        } catch (Exception e) {
            logger.debug("读取一级单单失败",e);
        }
        return list;

    }

    @RequestMapping(value = "/getMenusByParentId")
    @ResponseBody
    public List<Menu> getMenuByParentId(HttpServletRequest request) {
        User user = this.getCurrentUser(request);
        List<Menu> list = new ArrayList<Menu>();
        try {
            String id = request.getParameter("node");
            Integer parentId = Integer.parseInt(id);
            list = iMenuService.getListMenuByParentId(parentId,user);
        } catch (NumberFormatException e) {
            logger.debug("读取二级单单失败",e);
        }
        return list;
    }
    @RequestMapping(value = "/getMenuList")
    @ResponseBody
    public Map<String,Object> getMenuList(Menu menu,HttpServletRequest request){
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            this.setLimit(menu,request);
            map = iMenuService.getListMenuByModel(menu);
        } catch (Exception e) {
            logger.debug("菜单列表失败",e);
        }
        return map;
    }
    @RequestMapping(value = "/saveMenu")
    @ResponseBody
    public Map<String,Object> saveMenu(Menu reqMenu){
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            if(null!=reqMenu.getId()&&!"".equals(reqMenu.getId())){
                iMenuService.updateMenu(reqMenu);
                map.put("success",true);
                map.put("msg","更新成功");
                return map;
            }
            iMenuService.saveMenu(reqMenu);
            map.put("success",true);
            map.put("msg","保存成功");
        } catch (Exception e) {
            map.put("success",false);
            map.put("msg","程序出错,请联系管理员");
            logger.debug("保存菜单失败",e);
        }
        return map;
    }
    @RequestMapping(value = "/delMenu")
    @ResponseBody
    public Map<String,Object> delMenu(HttpServletRequest request){
        HashMap<String, Object> map = new HashMap<String, Object>();
        try {
            String menuIds = request.getParameter("menuIds");
            if (null == menuIds || menuIds.length() == 0) {
                map.put("success", false);
                map.put("msg", "没有获取到数据");
                return map;
            }
            List<Integer> ids = DataUtils.converIds(menuIds);
            iMenuService.delMenu(ids);
            map.put("success", true);
            map.put("msg", "删除成功!");
        } catch (Exception e) {
            map.put("success",false);
            map.put("msg","程序出错,请联系管理员");
            logger.debug("删除菜单失败",e);
        }
        return map;
    }
}

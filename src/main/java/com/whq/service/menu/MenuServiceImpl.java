package com.whq.service.menu;

import com.whq.common.exception.ServiceException;
import com.whq.common.utils.DataUtils;
import com.whq.driver.dao.MenuMapper;
import com.whq.driver.dao.UserMenuMapper;
import com.whq.driver.model.Menu;
import com.whq.driver.model.User;
import com.whq.driver.model.UserMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by wangying on 2016/3/9.
 */
@Service
public class MenuServiceImpl implements IMenuService {
    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private UserMenuMapper userMenuMapper;
    public void addMenu(Menu menu){
        menuMapper.insert(menu);
    }

    /**
     * 根据menu为查询条件，得到1级菜单
     * @throws ServiceException
     * @param user
     */
    public List<Menu> getFirstMenus(User user){
        Menu menu = new Menu();
        if(!"admin".equals(user.getUsername())){
            createIds(user,menu);
        }
        menu.setParentId(0);
        return menuMapper.getMenuListByMenu(menu);
    }

    public List<Menu> getListMenuByParentId(Integer parentId, User user){
        Menu menu = new Menu();
        if(!"admin".equals(user.getUsername())){
            createIds(user,menu);
        }
        menu.setParentId(parentId);
        return menuMapper.getMenuListByMenu(menu);
    }
    /**
     * 根据传入的实体,查询满足条件的对象
     * @param menu
     * @return
     */
    public Map<String,Object> getListMenuByModel(Menu menu) {
        List<Menu> list =  menuMapper.getMenuListByMenu(menu);
        Integer count = menuMapper.getCountByMenu(menu);
        Map<String,Object> map = DataUtils.responseData(list,count);
        return map;
    }
    /**
     * 保存用户
     * @param menu
     */
    public void saveMenu(Menu menu) {
        menuMapper.insert(menu);
    }

    /**
     * 批量删除用户
     * @param ids
     */
    @Transactional
    public void delMenu(List<Integer> ids) {
        for (Integer id:ids){
            menuMapper.deleteByPrimaryKey(id);
        }
    }

    /**
     * 更新用户
     * @param reqMenu
     */
    public void updateMenu(Menu reqMenu) {
        menuMapper.updateByPrimaryKey(reqMenu);
    }

    private void createIds(User user,Menu menu){
        UserMenu userMenu = new UserMenu();
        userMenu.setUserId(user.getId());
        List<UserMenu> list = userMenuMapper.selectByModel(userMenu);
        List<Integer> ids = new ArrayList<Integer>();
        for (UserMenu um:list){
            ids.add(um.getMenuId());
        }
        menu.setPropertiesValue("ids",ids);
    }

}

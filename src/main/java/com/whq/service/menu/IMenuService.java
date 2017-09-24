package com.whq.service.menu;

import com.whq.common.exception.ServiceException;
import com.whq.driver.model.Menu;
import com.whq.driver.model.User;

import java.util.List;
import java.util.Map;

/**
 * 菜单实体类
 * Created by wanghongqing on 2016/3/9.
 */
public interface IMenuService {
    /**
     * 加添一个菜单
     * @param menu
     * @throws ServiceException
     */
    void addMenu(Menu menu);

    /**
     * 查询第一层菜单
     * @return
     * @throws ServiceException
     * @param user
     */
    List<Menu> getFirstMenus(User user);

    /**
     * 根据父ID查询菜单
     * @return
     * @throws ServiceException
     */
    List<Menu> getListMenuByParentId(Integer parentId, User user);

    /**
     * 根据传入的实体,查询满足条件的对象
     * @param menu
     * @return
     */
    Map<String,Object> getListMenuByModel(Menu menu);


    /**
     * 保存用户
     * @param menu
     */
    void saveMenu(Menu menu);

    /**
     * 删除用户
     * @param ids
     */
    void delMenu(List<Integer> ids);

    /**
     * 更新用户
     * @param reqMenu
     */
    void updateMenu(Menu reqMenu);
}

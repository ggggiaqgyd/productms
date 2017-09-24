package com.whq.service.usermenu;

import com.whq.driver.dao.UserMenuMapper;
import com.whq.driver.model.UserMenu;

import java.util.List;

/**
 * Created by wanghongqing on 2016/7/2.
 */
public interface IUserMenuService {
    List<UserMenu> getMenuList(UserMenu userMenu);
}

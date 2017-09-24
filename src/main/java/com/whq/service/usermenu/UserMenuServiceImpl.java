package com.whq.service.usermenu;

import com.whq.driver.dao.UserMenuMapper;
import com.whq.driver.model.UserMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wanghongqing on 2016/7/2.
 */
@Service
public class UserMenuServiceImpl implements IUserMenuService{
    @Autowired
    private UserMenuMapper userMenuMapper;

    public List<UserMenu> getMenuList(UserMenu userMenu) {
        return userMenuMapper.selectByModel(userMenu);
    }
}

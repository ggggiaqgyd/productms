package com.whq.driver.dao;

import com.whq.driver.model.UserMenu;

import java.util.List;

public interface UserMenuMapper {
    int insert(UserMenu record);

    int insertSelective(UserMenu record);

    List<UserMenu> selectByModel(UserMenu record);
}
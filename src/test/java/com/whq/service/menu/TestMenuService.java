package com.whq.service.menu;

import com.whq.common.exception.ServiceException;
import com.whq.driver.model.Menu;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * Created by wangying on 2016/3/9.
 */
@RunWith(SpringJUnit4ClassRunner.class) // 整合
@ContextConfiguration(locations="classpath:config/spring-mybatis.xml") // 加载配置
public class TestMenuService {
    @Autowired
    private IMenuService menuService;
    @Test
    public void testAddMenu(){
        Menu menu = new Menu();
        menu.setIsLeaf(0);
        menu.setText("菜单管理");
        menu.setParentId(1);
        menu.setUrl("");
        menu.setOrderBy(1);
        try {
            menuService.addMenu(menu);
        } catch (ServiceException e) {
            e.printStackTrace();
        }
    }
    @Test
    public void testGetFirstMenu() throws ServiceException {
        List<Menu> list = menuService.getFirstMenus(null);
        System.out.println(list);
    }
    @Test
    public void testGetMenuByParentId() throws ServiceException{
        List<Menu> list = menuService.getListMenuByParentId(2, null);
        System.out.println(list);
    }
}

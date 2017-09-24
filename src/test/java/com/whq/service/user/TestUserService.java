package com.whq.service.user;

import com.whq.common.exception.ServiceException;
import com.whq.driver.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * 用户service的测试类
 * Created by wanghongqing on 16/2/27.
 */
@RunWith(SpringJUnit4ClassRunner.class) // 整合
@ContextConfiguration(locations="classpath:config/spring-mybatis.xml") // 加载配置
public class TestUserService {
    @Autowired
    private IUserService iUserService;
    @Test
    public void testFindUserByname(){
        try {
            User user = iUserService.findUserByName("admin");
            System.out.println(user);
        } catch (ServiceException e) {
            e.printStackTrace();
        }
    }
    @Test
    public void testSaveUser(){
        User user = new User();
        user.setUsername("admin");
        user.setPassword("admin");
        user.setNameCn("管理员");
        user.setTelephone("13552575607");
        user.setRoleId(1);
        user.setStatus(0);
        try {
            iUserService.addUser(user);
        } catch (ServiceException e) {
            e.printStackTrace();
        }
    }
}

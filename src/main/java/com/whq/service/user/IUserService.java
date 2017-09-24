package com.whq.service.user;

import com.whq.common.exception.ServiceException;
import com.whq.driver.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 用户服务类
 * Created by wanghongqing on 16/2/27.
 */
public interface IUserService {
    /**
     * 保存用户
     * @param user
     * @throws ServiceException 若用户已经存在,则抛出异常
     */
    void addUser(User user);

    /**
     * 根据用户名查找用户
     * @param username 用户名
     * @return
     * @throws ServiceException
     */
    User findUserByName(String username);

    /**
     * 根据用户条件,查找
     * @param user
     * @return
     * @throws ServiceException
     */
    Map<String,Object> findByUser(User user);

    /**
     * @param user
     * @throws ServiceException
     */
    void saveUser(User user);

    /**
     * 批量删除用户
     * @param ids
     */
    void delUsers(List<Integer> ids);


    /**
     * 更新用户信息
     * @param reqUser
     */
    void editUser(User reqUser);
}

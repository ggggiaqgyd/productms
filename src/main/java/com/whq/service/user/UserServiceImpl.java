package com.whq.service.user;

import com.whq.common.exception.ServiceException;
import com.whq.common.utils.DataUtils;
import com.whq.driver.dao.UserMapper;
import com.whq.driver.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Created by wanghongqing on 16/2/27.
 */
@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserMapper userMapper;
    public void addUser(User user) throws ServiceException {
        userMapper.insert(user);
    }

    public User findUserByName(String username){
        return userMapper.selectByUsername(username);
    }

    public Map<String,Object> findByUser(User user){
        List<User> list = userMapper.selectByUser(user);
        Integer count = userMapper.getCountByUser(user);
        Map<String,Object> map = DataUtils.responseData(list,count);
        return map;
    }

    public void saveUser(User user) {
        userMapper.insert(user);
    }

    /**
     * 批量删除用户时,加入事务管理
     * @param ids
     */
    @Transactional
    public void delUsers(List<Integer> ids) {
        for (Integer integer:ids){
            userMapper.deleteByPrimaryKey(integer);
        }
    }

    public void editUser(User reqUser) {
        userMapper.updateByPrimaryKeySelective(reqUser);
    }

}

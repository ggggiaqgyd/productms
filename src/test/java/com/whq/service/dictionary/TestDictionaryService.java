package com.whq.service.dictionary;

import com.whq.driver.model.Dictionary;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * Created by wanghongqing on 2016/5/28.
 */
@RunWith(SpringJUnit4ClassRunner.class) // 整合
@ContextConfiguration(locations="classpath:config/spring-mybatis.xml") // 加载配置
public class TestDictionaryService {
    @Autowired
    private IDictionaryService iDictionaryService;
    @Test
    public void test1(){
        Dictionary dictionary = new Dictionary();
        dictionary.setFieldName("prod_type");
        dictionary.setDictKey(1);
        dictionary.setDictValue("狗粮");
        iDictionaryService.insertDictionary(dictionary);
    }
    @Test
    public void test2(){
        Dictionary dictionary = new Dictionary();
        List<Dictionary> list = iDictionaryService.getDictionaryBy("prod_type");
        System.out.println(list);
    }
}

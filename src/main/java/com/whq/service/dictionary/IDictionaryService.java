package com.whq.service.dictionary;

import com.whq.driver.model.Dictionary;

import java.util.List;

/**
 * Created by wanghongqing on 2016/5/28.
 */
public interface IDictionaryService {
    /**
     * 根据条件得到字典列表
     * @param fieldName
     * @return
     */
    List<Dictionary> getDictionaryBy(String fieldName);
    void insertDictionary(Dictionary dictionary);
}

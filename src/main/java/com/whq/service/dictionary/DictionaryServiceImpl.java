package com.whq.service.dictionary;

import com.whq.driver.dao.DictionaryMapper;
import com.whq.driver.model.Dictionary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wanghongqing on 2016/5/28.
 */
@Service
public class DictionaryServiceImpl implements IDictionaryService {
    @Autowired
    private DictionaryMapper dictionaryMapper;

    public List<Dictionary> getDictionaryBy(String fieldName) {
        Dictionary dictionary = new Dictionary();
        dictionary.setFieldName(fieldName);
        return dictionaryMapper.getDictionaryByRecord(dictionary);
    }

    public void insertDictionary(Dictionary dictionary) {
        dictionaryMapper.insert(dictionary);
    }
}

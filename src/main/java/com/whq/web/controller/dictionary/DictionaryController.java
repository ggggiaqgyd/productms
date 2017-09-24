package com.whq.web.controller.dictionary;

import com.whq.driver.model.Dictionary;
import com.whq.service.dictionary.IDictionaryService;
import com.whq.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wanghongqing on 2016/5/28.
 */
@RequestMapping("/dictionary")
@Controller
public class DictionaryController extends BaseController{
    @Autowired
    private IDictionaryService iDictionaryService;
    @RequestMapping("/getDictionaryByField")
    @ResponseBody
    public List<Dictionary> getDictionaryByField(HttpServletRequest request){
        Map<String,Object> map = new HashMap<String, Object>();
        String fieldName = request.getParameter("fieldName");
        List<Dictionary> dictionaries = iDictionaryService.getDictionaryBy(fieldName);
        map.put("root",dictionaries);
        return dictionaries;
    }
}

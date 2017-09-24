/**
 * Created by wangying on 2016/2/21.
 */
Ext.Loader.setConfig({enabled:true});//开启动态加载

Ext.application({
    name: 'Productms',//为应用程序起一个名字,相当于命名空间
    appFolder:'static/app',  //程序文件目录
    controllers: [//声明所用到的控制层
        'MainController'
    ],
    launch: function() {//开始
    }
});
Ext.onReady(function(){
    var name = Ext.get('grobalNameCn');
    Ext.Ajax.request({
        url : '/getCurrentUser',
        success:function(response){
            var jsonResult = Ext.JSON.decode(response.responseText);
            name.dom.innerHTML = '欢迎登陆:'+jsonResult.nameCn;
        }
    });
});
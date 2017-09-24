/**
 * 主控代码
 * Created by wanghongqing on 2016/2/21.
 */

Ext.define('Productms.controller.MainController', {
    extend: 'Ext.app.Controller',
    views: ['MainView'],//声明该控制层要用到的view
    refs: [//相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
        {
            ref: 'mainView',
            selector: 'mainView'
        }
    ],
    init: function() {
        var view = this.getView('MainView').create(), self = this;
        //添加加载菜单事件
        view.addEvents({
            afterrender: self.loadMenuResources(Ext.getCmp('sysMenu'))
        });
    },
    //根据权限加载菜单
    loadMenuResources: function (view) {
        var self = this;
        Ext.Ajax.request({
            url : 'menu/firstMenus',
            params : {id : '1'},
            success:function(response){
                var text = response.responseText;
                var data = eval(text);
                for(var i=0;i<data.length;i++){
                    var store = Ext.create('Ext.data.TreeStore', {
                        proxy: {
                            type: 'ajax',
                            url: 'menu/getMenusByParentId'
                        },
                        root: {
                            text: '根节点',
                            id: data[i].id,
                            expanded: true
                        },
                        folderSort: true,
                        sorters: [{
                            property: 'text',
                            direction: 'ASC'
                        }]
                    });
                    view.add(Ext.create('Ext.tree.Panel', {
                        title: data[i].text,
                        width: 200,
                        height: 150,
                        store: store,
                        rootVisible: false,
                        listeners: {
                            itemclick: function(view, record, item, index, e){//用了select这个事件不会触发。
                                self.loadController(self,view,record.raw.url,record);
                            }
                        }
                    }))
                }
            }
        });
        this.getMainView().doLayout();
    },
    loadController:function(self,view,url,record){
        if(!url||url==""){
            return;
        }
        var package = url.split("/")[0];
        var controller = url.split("/")[1];
        var center =  Ext.getCmp("MainCenter");
        var tabPanel = Ext.getCmp(url);
        if(tabPanel){
            center.setActiveTab(tabPanel);
        }else{
            var ctrl = self.getController(package + "." + controller);
            var childViewStr = controller.replace("Controller", "View");
            var childView = ctrl.getView(package + "." + childViewStr).create();
            tabPanel = center.add({
                id: url,
                title: record.data.text,
                closable: true,
                layout: 'fit',
                items: childView
            });
            center.setActiveTab(tabPanel);
        }
    }
});


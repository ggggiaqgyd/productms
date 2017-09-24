/**
 * Created by wanghongqing on 16/4/9.
 */
Ext.define('Productms.controller.menu.MenuController', {
    extend: 'Ext.app.Controller',
    views: ['menu.MenuView','menu.MenuForm'],//声明该控制层要用到的view
    stores:['menu.MenuStore'],
    refs: [//相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
        {
            ref: 'menuView',
            selector: 'menuView'
        },{
            ref: 'menuForm',
            selector: 'menuForm'
        }
    ],
    init: function() {
        this.control({
            'menuView': {
                itemdblclick: function(grid,row){
                    this.openEditMenuForm(grid,row);
                }
            },
            'menuView button[action=addMenu]': {
                click: this.openAddMenuForm
            },
            'menuView button[action=editMenu]':{
                click: function(){
                    var self = this;
                    var grid = self.getMenuView();
                    var records = grid.getSelectionModel().getSelection();
                    if(records.length==0){
                        Ext.Msg.alert('提示', "请先选择一条数据");
                        return;
                    }
                    if(records.length>1){
                        Ext.Msg.alert('提示', "只能先择一条数据");
                        return;
                    }
                    this.openEditMenuForm(null,records[0]);

                }
            },
            'menuView button[action=delMenu]':{
                click: this.delMenu
            },
            'menuForm button[action=saveMenu]':{
                click: this.saveMenu
            }
        });
    },
    openEditMenuForm:function(grid,row){
        var win = new Ext.Window({
            title:'编辑菜单',
            modal:true
        });
        var panel = Ext.create("Productms.view.menu.MenuForm");
        var form =  panel.getForm();
        form.loadRecord(row);
        win.add(panel);
        win.show();
    },
    openAddMenuForm:function(){
        var self = this;
        var grid = self.getMenuView();
        var records = grid.getSelectionModel().getSelection();
        var win = new Ext.Window({
            title:'添加菜单',
            modal:true
        });
        var panel = Ext.create("Productms.view.menu.MenuForm");
        if(records.length==1&&!records[0].data.leaf){
            var id = records[0].data.id;
            var parentIdObject = panel.query('textfield[name=parentId]')[0];
            var isLeafObject = panel.query('combo[name=isLeaf]')[0];
            parentIdObject.setValue(id);
            isLeafObject.setValue(1);
        }
        win.add(panel);
        win.show();
    },
    saveMenu:function(){
        var self = this;
        var form = self.getMenuForm().getForm();
        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                    if(action.result.msg){
                        self.getMenuForm().up("panel").close();
                        Ext.Msg.alert('保存成功', action.result.msg);
                    }else{
                        Ext.Msg.alert('保存失败', action.result.msg);
                    }
                    self.getMenuView().getStore().reload();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('操作失败', action.result.msg);
                }
            });
        }
    },
    delMenu: function () {
        var self = this;
        var grid = self.getMenuView();
        var records = grid.getSelectionModel().getSelection();
        if(records.length==0){
            Ext.Msg.alert("提示","请先择数据进行操作");
            return;
        }
        Ext.MessageBox.confirm('提示', '请确认是否要执行删除操作?', function (btn) {
            if (btn == "yes") {
                var menuIds = "";
                for (var i = 0; i < records.length; i++) {
                    var record = records[i];
                    menuIds += record.data.id + ",";

                }
                menuIds = menuIds.substr(0, menuIds.length - 1);
                Ext.Ajax.request({
                    url: 'menu/delMenu',
                    params: {menuIds: menuIds},
                    success: function (resp, opts) {
                        var respText = Ext.JSON.decode(resp.responseText);
                        Ext.Msg.alert(respText.success ? '保存成功' : '操作失败', respText.msg);
                        self.getMenuView().getStore().reload();
                    }
                });
            }


        });


    }
});
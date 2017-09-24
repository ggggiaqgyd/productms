/**
 * Created by wanghongqing on 16/3/12.
 */
/*
 商品控制层,
 所有逻辑代码都在这里写
 */
Ext.define('Productms.controller.user.UserController', {
    extend: 'Ext.app.Controller',
    views: ['user.UserView','user.UserForm'],//声明该控制层要用到的view
    stores:['user.UserStore'],
    refs: [//相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
        {
            ref: 'userView',
            selector: 'userView'
        },{
            ref: 'userForm',
            selector: 'userForm'
        }
    ],
    init: function() {
        this.control({
            'userView': {
                itemdblclick: function(grid,row){
                    this.openEditUserForm(grid,row);
                }
            },
            'userView button[action=addUser]': {
                click: this.openAddUserForm
            },
            'userView button[action=editUser]':{
                click: function(){
                    var self = this;
                    var grid = self.getUserView();
                    var records = grid.getSelectionModel().getSelection();
                    if(records.length==0){
                        Ext.Msg.alert('提示', "请先选择一条数据");
                        return;
                    }
                    if(records.length>1){
                        Ext.Msg.alert('提示', "只能先择一条数据");
                        return;
                    }
                    this.openEditUserForm(null,records[0]);

                }
            },
            'userView button[action=delUser]':{
                click: this.delUser
            },
            'userForm button[action=saveUser]':{
                click: this.saveUser
            }
        });
    },
    openEditUserForm:function(grid,row){
        var win = new Ext.Window({
            title:'编辑用户',
            modal:true
        });
        var panel = Ext.create("Productms.view.user.UserForm");
        var form =  panel.getForm();
        form.loadRecord(row);
        win.add(panel);
        win.show();
    },
    openAddUserForm:function(){
        var win = new Ext.Window({
            title:'添加用户',
            modal:true
        });
        var panel = Ext.create("Productms.view.user.UserForm");
        win.add(panel);
        win.show();
    },
    saveUser:function(){
        var self = this;
        var form = self.getUserForm().getForm();
        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                    if(action.result.msg){
                        self.getUserForm().up("panel").close();
                        Ext.Msg.alert('保存成功', action.result.msg);
                    }else{
                        Ext.Msg.alert('保存失败', action.result.msg);
                    }
                    self.getUserView().getStore().reload();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('操作失败', action.result.msg);
                }
            });
        }
    },
    delUser: function () {

        var self = this;
        var grid = self.getUserView();
        var records = grid.getSelectionModel().getSelection();
        if(records.length==0){
            Ext.Msg.alert("提示","请先择数据进行操作");
            return;
        }
        Ext.MessageBox.confirm('提示', '请确认是否要执行删除操作?', function (btn) {
            if (btn == "yes") {
                var userIds = "";
                for (var i = 0; i < records.length; i++) {
                    var record = records[i];
                    userIds += record.data.id + ",";

                }
                userIds = userIds.substr(0, userIds.length - 1);
                Ext.Ajax.request({
                    url: 'user/delUser',
                    params: {userIds: userIds},
                    success: function (resp, opts) {
                        var respText = Ext.JSON.decode(resp.responseText);
                        Ext.Msg.alert(respText.success ? '保存成功' : '操作失败', respText.msg);
                        self.getUserView().getStore().reload();
                    }
                });
            }
        });
    }
});
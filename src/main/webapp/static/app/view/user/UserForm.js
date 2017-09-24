/**
 * Created by wanghongqing on 16/3/20.
 */
Ext.define('Productms.view.user.UserForm', {
    extend:'Ext.form.Panel',
    alias: "widget.userForm",
    bodyPadding: 5,
    width: 350,
    // 将会通过 AJAX 请求提交到此URL
    url: 'user/saveUser',
    // 表单域 Fields 将被竖直排列, 占满整个宽度
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    // The fields
    defaultType: 'textfield',
    items: [{
        name: 'id',
        hidden:true
    },{
        fieldLabel: '用户名',
        name: 'username',
        allowBlank: false
    },{
        fieldLabel: '密码',
        name: 'password',
        inputType:'password',
        allowBlank: false
    },{
        fieldLabel: '真实姓名',
        name: 'nameCn',
        allowBlank: false
    },{
        fieldLabel: '电话号码',
        name: 'telephone',
        allowBlank: false
    }],

    // 重置 和 保存 按钮.
    buttons: [{
        text: '重置',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }, {
        text: '保存',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        action:'saveUser'
    }]
});
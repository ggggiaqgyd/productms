/**
 * Created by wanghongqing on 2016/6/4.
 */
Ext.define('Productms.view.customer.CustomerForm', {
    extend:'Ext.form.Panel',
    alias: "widget.customerForm",
    bodyPadding: 5,
    width: 350,
    // 将会通过 AJAX 请求提交到此URL
    url: 'customer/saveCustomer',
    // 表单域 Fields 将被竖直排列, 占满整个宽度
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    // The fields    fields: ['id','customName','telephone','level']
    defaultType: 'textfield',
    items: [{
        name: 'id',
        hidden:true
    },{
        fieldLabel: '客户名',
        name: 'customName',
        allowBlank: false
    },{
        fieldLabel: '手机号',
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
        action:'saveCustomer'
    }]
})
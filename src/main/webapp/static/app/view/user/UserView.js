/**
 * Created by wanghongqing on 16/3/12.
 */
Ext.define("Productms.view.user.UserView", {
    extend: "Ext.grid.Panel",
    alias: "widget.userView",
    store: "user.UserStore",
    viewConfig: {
        loadMask: true
    },
    tbar: [{
        iconCls: 'add',
        action:'addUser',
        text: '新增'
    }, {
        iconCls: 'edit',
        action:'editUser',
        text: '修改'
    }, {
        action:'delUser',
        iconCls: 'delete',
        text: '删除'
    }],
    selModel: {
        injectCheckbox: 0,
        mode: "MULTI",     //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true     //只能通过checkbox选择
    },
    selType: "checkboxmodel",
    columns: [
        {header: 'id', dataIndex: 'id', hidden: true},
        {header: '用户名', dataIndex: 'username', width: '20%'},
        {header: '真实姓名', dataIndex: 'nameCn', width: '20%'},
        {header: '电话号码', dataIndex: 'telephone', width: '30%'},
        {header: '用户类型', dataIndex: 'userType', width: '10%'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: "user.UserStore",
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: '无数据'
    }
});
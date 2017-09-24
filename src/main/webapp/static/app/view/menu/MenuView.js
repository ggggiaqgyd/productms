/**
 * Created by wanghongqing on 16/4/9.
 */
Ext.define("Productms.view.menu.MenuView", {
    extend: "Ext.grid.Panel",
    alias: "widget.menuView",
    store: "menu.MenuStore",
    viewConfig: {
        loadMask: true
    },
    tbar: [{
        iconCls: 'add',
        action:'addMenu',
        text: '新增'
    }, {
        iconCls: 'edit',
        action:'editMenu',
        text: '修改'
    }, {
        action:'delMenu',
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
        {header: '菜单名', dataIndex: 'text', width: '20%'},
        {header: '父节点', dataIndex: 'parentId', width: '20%'},
        {header: 'url访问地址', dataIndex: 'url', width: '30%'},
        {header: '排序标准', dataIndex: 'orderBy', width: '10%'},
        {header: '是否为叶子节点', dataIndex: 'leaf', width: '20%',
            renderer:function(value){
                if(value==true){
                    return "是";
                }else{
                    return "否";
                }
            }
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: "menu.MenuStore",
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: '无数据'
    }
});
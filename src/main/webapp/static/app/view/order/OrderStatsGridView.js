/**
 * Created by wanghongqing on 2016/6/21.
 */
Ext.define("Productms.view.order.OrderStatsGridView", {
    extend: "Ext.grid.Panel",
    alias: "widget.orderStatsGridView",
    store: "order.OrderStatsStore",
    viewConfig: {
        loadMask: true
    },
    tbar: [{
        iconCls: 'find',
        action:'oneDayStats',
        text: '查看日统计'
    }],
    selModel: {
        injectCheckbox: 0,
        mode: "MULTI",     //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true     //只能通过checkbox选择
    },
    selType: "checkboxmodel",
    //fields: ['id','orderCode','orderTime','orderStatus','customerId'],
    columns: [
        {header: 'id', dataIndex: 'id', hidden: true},
        {header: '订单编号', dataIndex: 'orderCode', width: '20%'},
        {header: '下单时间', dataIndex: 'orderTime', width: '20%',
            renderer:function(value){
                var date = new Date(value);
                return Ext.util.Format.date(date, "Y-m-d H:i:s");
            }},
        {header: '订单状态', dataIndex: 'orderStatus', width: '10%',
            renderer:function (value) {
                if(value==1){
                    return '未完成';
                }else{
                    return '已完成';
                }
            }
        },
        {header: '客户姓名', dataIndex: 'customer.customName', width: '15%'},
        {header: '客户手机号', dataIndex: 'customer.telephone',width: '10%'},
        {header: '客户等级', dataIndex: 'customer.level', width: '5%'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: "order.OrderStatsStore",
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: '无数据'
    }
});
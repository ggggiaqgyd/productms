/**
 * Created by wanghongqing on 16/4/16.
 */
Ext.define("Productms.view.order.OrderGridView", {
    extend: "Ext.grid.Panel",
    alias: "widget.orderGridView",
    store: "order.OrderStore",
    viewConfig: {
        loadMask: true
    },
    tbar: [{
        iconCls: 'add',
        action:'addOrder',
        text: '新建订单'
    },{
        iconCls: 'edit',
        action:'toBeFinishOrder',
        text: '完善订单'
    },{
        action:'delOrder',
        iconCls: 'delete',
        text: '删除订单'
    }],
    selModel: {
        injectCheckbox: 0,
        mode: "MULTI",     //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true     //只能通过checkbox选择
    },
    selType: "checkboxmodel",
    fields: ['id','orderCode','orderTime','orderStatus','customerId'], 
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
        {header: '客户等级', dataIndex: 'customer.level', width: '5%'},
        {
            text :'操作',
            sortable: false,
            dataIndex : 'id',
            renderer : function(value) {
                return '<input type="button" value="完成订单" href="javascript:void(0)" />';
            },
            listeners:{
                click:function(grid, item, index, colIndex, e, record){
                    Ext.Ajax.request({
                        url : 'order/finishOrder',
                        params : {orderId : record.data.id},
                        success:function(resp){
                            var respText = Ext.JSON.decode(resp.responseText);
                            if(respText.success){
                                Ext.Msg.alert(respText.success ? '保存成功' : '操作失败', respText.msg);
                                grid.getStore().load();
                            }
                        }
                    });

                }
            }
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: "order.OrderStore",
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: '无数据'
    }
});
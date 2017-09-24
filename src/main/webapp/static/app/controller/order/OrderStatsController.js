/**
 * Created by wanghongqing on 2016/6/21.
 */
Ext.define('Productms.controller.order.OrderStatsController', {
    extend: 'Ext.app.Controller',
    views: ['order.OrderStatsGridView','orderproduct.OrderProductStatsGridView','order.OrderStatsView','orderproduct.OrderTimeQueryForm'],
    stores:['order.OrderStatsStore','orderproduct.OrderProductStore','orderproduct.OrderProductStatsStore'],
    refs: [//相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
        {
            ref: 'orderStatsGridView',
            selector: 'orderStatsGridView'
        },{
            ref: 'orderProductStatsGridView',
            selector: 'orderProductStatsGridView'
        },{
            ref: 'orderStatsView',
            selector: 'orderStatsView'
        },{
            ref: 'orderTimeQueryForm',
            selector: 'orderTimeQueryForm'
        }
    ],
    init: function() {
        this.control({
            'orderStatsGridView': {
                itemdblclick: function(grid,row){
                    this.openOrderProductStatsGridView(grid,row);
                }
            },
            'orderStatsGridView button[action=oneDayStats]':{
                click: this.queryOneDayStats
            },
            'orderTimeQueryForm button[action=openStatsWin]':{
                click: this.openStatsWin
            },
            'orderTimeQueryForm button[action=canel]':{
                click: this.closetatsWin
            }

        });
    },
    openOrderProductStatsGridView:function (grid,row) {
        var self = this;
        var win = new Ext.Window({
            width:document.body.clientWidth*2/3,
            height:document.body.clientHeight/2,
            orderCode:row.data.orderCode,
            title:row.data["customer.customName"]+'  的订单  ['+row.data.orderCode+']',
            modal:true,
            layout:'fit'
        });
        var panel = Ext.create("Productms.view.orderproduct.OrderProductStatsGridView");
        win.add(panel);
        win.show();
        var store = self.getOrderProductStatsGridView().getStore();
        store.proxy.extraParams = {orderCode:row.data.orderCode};
        store.loadPage(1);
    },
    queryOneDayStats:function () {
        var win = new Ext.Window({
            width: 300,
            height: 200,
            title: '日期选择',
            modal: true,
            layout: 'fit'
        });
        var panel = Ext.create("Productms.view.orderproduct.OrderTimeQueryForm");
        win.add(panel);
        win.show();

    },
    openStatsWin:function(){
        var self = this;
        var form = self.getOrderTimeQueryForm().getForm();
        var param = form.getValues();
        if(!param.date){
            Ext.Msg.alert("提示","请选择要统计的日期!");
            return;
        }
        self.getOrderTimeQueryForm().up("panel").close();
        var win = new Ext.Window({
            width:document.body.clientWidth*2/3,
            height:document.body.clientHeight/2,
            title:'日统计信息',
            modal:true,
            layout:'fit'
        });
        var panel = Ext.create("Productms.view.orderproduct.OrderProductStatsGridView");
        win.add(panel);
        win.show();
        var store = self.getOrderProductStatsGridView().getStore();
        store.proxy.extraParams = {date:param.date};
        store.loadPage(1);
    },
    closetatsWin:function(){
        var self = this;
        self.getOrderTimeQueryForm().up("panel").close();
    }
});
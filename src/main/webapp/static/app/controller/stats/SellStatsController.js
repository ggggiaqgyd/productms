/**
 * Created by wanghongqing on 2016/7/3.
 */
Ext.define('Productms.controller.stats.SellStatsController', {
    extend: 'Ext.app.Controller',
    views: ['stats.SellStatsView','OrderTimeQueryForm'],//声明该控制层要用到的view
    stores:['stats.SellStatsStore'],
    refs: [//相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
        {
            ref: 'sellStatsView',
            selector: 'sellStatsView'
        },{
            ref: 'orderTimeQueryForm',
            selector: 'orderTimeQueryForm'
        }
    ],
    init: function() {
        this.control({
            'sellStatsView': {
                render: function(){
                    var date = new Date();
                    var store = this.getSellStatsView().getStore();
                    store.proxy.extraParams = {date:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()};
                    store.loadPage(1);

                }
            },
            'sellStatsView button[action=selectDate]': {
                click:this.selectDate
            },
            'orderTimeQueryForm button[action=openStatsWin]':{
                click: this.laodBySelectDate
            },
            'orderTimeQueryForm button[action=canel]':{
                click: this.closetatsWin
            }
        });
    },
    selectDate:function(){
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
    laodBySelectDate:function(){
        var self = this;
        var form = self.getOrderTimeQueryForm().getForm();
        var param = form.getValues();
        if(!param.date){
            Ext.Msg.alert("提示","请选择要统计的日期!");
            return;
        }
        self.getOrderTimeQueryForm().up("panel").close();
        var store = self.getSellStatsView().getStore();
        store.proxy.extraParams = {date:param.date};
        store.loadPage(1);
    },
    closetatsWin:function(){
        var self = this;
        self.getOrderTimeQueryForm().up("panel").close();
    }
});
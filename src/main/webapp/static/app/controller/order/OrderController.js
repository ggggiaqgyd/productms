/**
 * Created by wanghongqing on 16/3/12.
 */
Ext.define('Productms.controller.order.OrderController', {
    extend: 'Ext.app.Controller',
    views: ['order.OrderView','order.OrderGridView','customer.CustomerOrderView','customer.CustomerQueryForm','customer.CustomerGridView','customer.CustomerForm',
    'order.ProductTempGridView','order.OrderProductView','order.NorthPanelView','orderproduct.OrderProductGridView','order.ProductTempQueryForm'],
    stores:['order.OrderStore','customer.CustomerStore','product.ProductStoreForOrder','orderproduct.OrderProductStore'],
    refs: [//相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
        {
            ref: 'orderGridView',
            selector: 'orderGridView'
        },{
            ref: 'orderForm',
            selector: 'orderForm'
        },{
            ref: 'orderView',
            selector: 'orderView'
        },{
            ref: 'customerOrderView',
            selector: 'customerOrderView'
        },{
            ref: 'orderQueryForm',
            selector: 'orderQueryForm'
        },{
            ref: 'customerForm',
            selector: 'customerForm'
        },{
            ref: 'customerGridView',
            selector: 'customerGridView'
        },{
            ref: 'customerQueryForm',
            selector: 'customerQueryForm'
        },{
            ref: 'productTempQueryForm',
            selector: 'productTempQueryForm'
        },{
            ref: 'productTempGridView',
            selector: 'productTempGridView'
        },{
            ref: 'orderProductView',
            selector: 'orderProductView'
        },{
            ref: 'orderProductGridView',
            selector: 'orderProductGridView'
        }
    ],
    init: function() {
        this.control({
            'actioncolumn#addShoppingCart': {
                editclick: this.addShoppingCart
            },
            'actioncolumn#shoppingCasrtHandle': {
                addShoppingCarts: this.addShoppingCartById,
                minsShoppingCart: this.minusShoppingCartById,
                deleteShoppingCart:this.deleteShoppingCartById
            },
            'orderGridView': {
                itemdblclick: function(grid,row){
                    this.openfinishOrderWin(grid,row);
                }
            },
            'orderGridView button[action=addOrder]': {
                click: this.openAddOrderForm
            },
            'orderGridView button[action=toBeFinishOrder]':{
                click: function(){
                    var self = this;
                    var grid = self.getOrderGridView();
                    var records = grid.getSelectionModel().getSelection();
                    if(records.length==0){
                        Ext.Msg.alert('提示', "请先选择一条数据");
                        return;
                    }
                    if(records.length>1){
                        Ext.Msg.alert('提示', "只能先择一条数据");
                        return;
                    }
                    this.openfinishOrderWin(null,records[0]);

                }
            },
            'orderGridView button[action=delOrder]':{
                click: this.delOrder
            },
            'orderForm button[action=saveOrder]':{
                click: this.saveOrder
            },
            'productTempQueryForm button[action=query]':{
                click: this.query
            },
            'productTempQueryForm button[action=reset]':{
                click: this.reset
            },
            'customerGridView button[action=addCustomer]':{
                click:this.addCustomerWin
            },
            'customerQueryForm button[action=queryCustomer]':{
                click:this.queryCustomer
            },
            'customerForm button[action=saveCustomer]':{
                click:this.saveCustomer
            },
            'customerGridView button[action=openCustomerTemp]':{
                click:this.openCustomerTemp
            },
            'customerGridView': {
                itemdblclick: function(grid,row){
                    this.saveOrder(grid,row);
                }
            },
            'productTempQueryForm button[action=query]':{
                click: this.query
            }

        });
    },
    reset:function () {
        var self = this;
        var form = self.getProductTempQueryForm().getForm();
        form.reset();
        self.query();
    },
    query:function () {
        var self = this;
        var form = self.getProductTempQueryForm().getForm();
        if (form.isValid()==false) {
            Ext.Msg.alert('提示', "查询条件不合法");
            return;
        }
        var param = form.getValues();
        var store = self.getProductTempGridView().getStore();
        store.proxy.extraParams = param;
        store.loadPage(1);
    },
    queryCustomer:function () {
        var self = this;
        var form = self.getCustomerQueryForm().getForm();
        if (form.isValid()==false) {
            Ext.Msg.alert('提示', "查询条件不合法");
            return;
        }
        var param = form.getValues();
        var store = self.getCustomerGridView().getStore();
        store.proxy.extraParams = param;
        store.loadPage(1);
    },
    openfinishOrderWin:function(grid,row){
        var self = this;
        var win = new Ext.Window({
            width:document.body.clientWidth-20,
            height:document.body.clientHeight-30,
            orderCode:row.data.orderCode,
            title:row.data["customer.customName"]+'  的订单  ['+row.data.orderCode+']',
            modal:true,
            layout:'fit'
        });
        var panel = Ext.create("Productms.view.order.OrderProductView");
        win.add(panel);
        win.show();
        var store = self.getOrderProductGridView().getStore();
        store.proxy.extraParams = {orderCode:row.data.orderCode};
        store.loadPage(1);
        self.getProductTempGridView().getStore().load();
    },
    openAddOrderForm:function(){
        var self = this;
        var win = new Ext.Window({
            width:800,
            height:600,
            title:'选择用户',
            modal:true,
            layout:'fit'
        });
        var panel = Ext.create("Productms.view.customer.CustomerOrderView");
        win.add(panel);
        win.show();
        var store = self.getCustomerGridView().getStore();
        store.load();
    },
    saveOrder:function(grid,row){
        var self = this;
        self.getCustomerGridView().up("panel").up("panel").close();
        Ext.Ajax.request({
            url : 'order/saveOrder',
            params : {customerId : row.data.id},
            success:function(resp){
                var respText = Ext.JSON.decode(resp.responseText);
                if(respText.success){
                    //alert(respText.orderCode);
                    var win = new Ext.Window({
                        width:document.body.clientWidth-20,
                        height:document.body.clientHeight-30,
                        modal:true,
                        orderCode:respText.orderCode,
                        layout:'fit'
                    });
                    var panel = Ext.create("Productms.view.order.OrderProductView");
                    win.add(panel);
                    win.show();
                    var store = self.getOrderProductGridView().getStore();
                    store.proxy.extraParams = {orderCode:respText.orderCode};
                    store.loadPage(1);
                    self.getOrderGridView().getStore().load();
                    self.getProductTempGridView().getStore().load();
                }
            }
        });

    },
    delOrder: function () {
        var self = this;
        var grid = self.getOrderGridView();
        var records = grid.getSelectionModel().getSelection();
        if(records.length==0){
            Ext.Msg.alert("提示","请选择数据进行操作");
            return;
        }
        if(records.length>1){
            Ext.Msg.alert("提示","只能先择一条订单进行删除");
            return;
        }
        Ext.MessageBox.confirm('提示', '请确认是否要执行删除操作?', function (btn) {
            if (btn == "yes") {
                var orderId = records[0].data.id;
                var orderCode = records[0].data.orderCode;
                Ext.Ajax.request({
                    url: 'order/delOrder',
                    params: {orderId: orderId,orderCode:orderCode},
                    success: function (resp, opts) {
                        var respText = Ext.JSON.decode(resp.responseText);
                        Ext.Msg.alert(respText.success ? '保存成功' : '操作失败', respText.msg);
                        self.getOrderGridView().getStore().reload();
                    }
                });
            }
        });
    },
    addCustomerWin:function () {
        var win = new Ext.Window({
            // width:document.body.clientWidth,
            // height:document.body.clientHeight,
            title:'新增客户',
            modal:true
        });
        var panel = Ext.create("Productms.view.customer.CustomerForm");
        win.add(panel);
        win.show();
    },
    saveCustomer:function () {
        var self = this;
        var form = self.getCustomerForm().getForm();
        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                    if(action.result.msg){
                        self.getCustomerForm().up("panel").close();
                        Ext.Msg.alert('保存成功', action.result.msg);
                    }else{
                        Ext.Msg.alert('保存失败', action.result.msg);
                    }
                    self.getCustomerGridView().getStore().reload();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('操作失败', action.result.msg);
                }
            });
        }
    },
    openCustomerTemp:function () {
        var self = this;
        self.getCustomerGridView().up("panel").up("panel").close();
        Ext.Ajax.request({
            url : 'order/saveOrder',
            params : {customerId : 1},
            success:function(resp){
                var respText = Ext.JSON.decode(resp.responseText);
                if(respText.success){
                    var win = new Ext.Window({
                        width:document.body.clientWidth-20,
                        height:document.body.clientHeight-30,
                        modal:true,
                        orderCode:respText.orderCode,
                        layout:'fit'
                    });
                    var panel = Ext.create("Productms.view.order.OrderProductView");
                    win.add(panel);
                    win.show();
                    var store = self.getOrderProductGridView().getStore();
                    store.proxy.extraParams = {orderCode:respText.orderCode};
                    store.loadPage(1);
                    self.getOrderGridView().getStore().load();
                    self.getProductTempGridView().getStore().load();
                }
            }
        });
    },
    addShoppingCart: function(record) {
        var self = this;
        var mk = new Ext.LoadMask(self.getOrderProductView().up("panel"), {
            msg: '正在操作请稍后！',
            removeMask: true //完成后移除
        });
        mk.show(); //显示
        var grid = self.getProductTempGridView();
        Ext.Ajax.request({
            url: 'order/addToShoppingCarts',
            params: {productId:record.record.data.id,orderCode:self.getOrderProductView().up("panel").orderCode},
            success: function (resp, opts) {
                mk.hide();
                var respText = Ext.JSON.decode(resp.responseText);
                if(!respText.success){
                    Ext.Msg.alert("添加失败",respText.msg);
                    return;
                }
                grid.getStore().reload();
                self.getOrderProductGridView().getStore().reload();
            }
        });
    },
    minusShoppingCartById:function(record){
        if(record.record.data.sellCount == 1){
            Ext.Msg.alert("提示",'购买数量,最小为一件');
            return;
        }
        var self = this;
        var mk = new Ext.LoadMask(self.getOrderProductView().up("panel"), {
            msg: '正在操作请稍后！',
            removeMask: true //完成后移除
        });
        mk.show(); //显示
        var grid = self.getProductTempGridView();
        Ext.Ajax.request({
            url: 'order/shoppingCartsHandle',
            params: {id:record.record.data.id,type:'minus'},
            success: function (resp, opts) {
                mk.hide();
                var respText = Ext.JSON.decode(resp.responseText);
                if(!respText.success){
                    Ext.Msg.alert("操作失败",respText.msg);
                    return;
                }
                grid.getStore().reload();
                self.getOrderProductGridView().getStore().reload();
            }
        });
    },
    addShoppingCartById:function (record) {
        var self = this;
        var grid = self.getProductTempGridView();
        var mk = new Ext.LoadMask(self.getOrderProductView().up("panel"), {
            msg: '正在操作请稍后！',
            removeMask: true //完成后移除
        });
        mk.show(); //显示
        Ext.Ajax.request({
            url: 'order/shoppingCartsHandle',
            params: {id:record.record.data.id,type:'add'},
            success: function (resp, opts) {
                mk.hide();
                var respText = Ext.JSON.decode(resp.responseText);
                if(!respText.success){
                    Ext.Msg.alert("操作失败",respText.msg);
                    return;
                }
                grid.getStore().reload();
                self.getOrderProductGridView().getStore().reload();
            }
        });
    },
    deleteShoppingCartById:function (record) {
        var self = this;
        var grid = self.getProductTempGridView();
        var mk = new Ext.LoadMask(self.getOrderProductView().up("panel"), {
            msg: '正在操作请稍后！',
            removeMask: true //完成后移除
        });
        mk.show(); //显示
        Ext.Ajax.request({
            url: 'order/shoppingCartsHandle',
            params: {id:record.record.data.id,type:'clear'},
            success: function (resp, opts) {
                mk.hide();
                var respText = Ext.JSON.decode(resp.responseText);
                if(!respText.success){
                    Ext.Msg.alert("操作失败",respText.msg);
                    return;
                }
                grid.getStore().reload();
                self.getOrderProductGridView().getStore().reload();
            }
        });
    }
});
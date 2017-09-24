/**
 *  商品控制层,
 *  所有逻辑代码都在这里写
 * Created by wanghongqing on 16/3/12.
 */
Ext.define('Productms.controller.product.ProductController', {
    extend: 'Ext.app.Controller',
    views: ['product.ProductView','product.ProductGridView','product.ProductForm','product.ProductQueryForm'],//声明该控制层要用到的view,'product.ProductForm'
    stores:['product.ProductStore'],
    refs: [//相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
        {
            ref: 'productGridView',
            selector: 'productGridView'
        }
        ,{
            ref: 'productForm',
            selector: 'productForm'
        },{
            ref: 'productView',
            selector: 'productView'
        },{
            ref: 'productQueryForm',
            selector: 'productQueryForm'
        }
    ],
    init: function() {
        this.control({
            'productGridView': {
                itemdblclick: function(grid,row){
                    this.openEditProductForm(grid,row);
                }
            },
            'productGridView button[action=addProduct]': {
                click: this.openAddProductForm
            },
            'productGridView button[action=editProduct]':{
                click: function(){
                    var self = this;
                    var grid = self.getProductGridView();
                    var records = grid.getSelectionModel().getSelection();
                    if(records.length==0){
                        Ext.Msg.alert('提示', "请先选择一条数据");
                        return;
                    }
                    if(records.length>1){
                        Ext.Msg.alert('提示', "只能先择一条数据");
                        return;
                    }
                    this.openEditProductForm(null,records[0]);

                }
            },
            'productGridView button[action=delProduct]':{
                click: this.delProduct
            },
            'productForm button[action=saveProduct]':{
                click: this.saveProduct
            },
            'productQueryForm button[action=query]':{
                click: this.query
            },
            'productQueryForm button[action=reset]':{
                click: this.reset
            }
        });
    },
    reset:function () {
        var self = this;
        var form = self.getProductQueryForm().getForm();
        form.reset();
        self.query();
    },
    query:function () {
        var self = this;
        var form = self.getProductQueryForm().getForm();
        if (form.isValid()==false) {
            Ext.Msg.alert('提示', "查询条件不合法");
            return;
        }
        var param = form.getValues();
        var store = self.getProductGridView().getStore();
        store.proxy.extraParams = param;
        store.loadPage(1);
    },
    openEditProductForm:function(grid,row){
        var win = new Ext.Window({
            title:'编辑用户',
            modal:true
        });
        var panel = Ext.create("Productms.view.product.ProductForm");
        var form =  panel.getForm();
        form.loadRecord(row);
        win.add(panel);
        win.show();
    },
    openAddProductForm:function(){
        var win = new Ext.Window({
            title:'添加商品',
            modal:true
        });
        var panel = Ext.create("Productms.view.product.ProductForm");
        win.add(panel);
        win.show();
    },
    saveProduct:function(){
        var self = this;
        var form = self.getProductForm().getForm();
        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                    if(action.result.msg){
                        self.getProductForm().up("panel").close();
                        Ext.Msg.alert('保存成功', action.result.msg);
                    }else{
                        Ext.Msg.alert('保存失败', action.result.msg);
                    }
                    self.getProductGridView().getStore().reload();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('操作失败', action.result.msg);
                }
            });
        }
    },
    delProduct: function () {

        var self = this;
        var grid = self.getProductGridView();
        var records = grid.getSelectionModel().getSelection();
        if(records.length==0){
            Ext.Msg.alert("提示","请先择数据进行操作");
            return;
        }
        Ext.MessageBox.confirm('提示', '请确认是否要执行删除操作?', function (btn) {
            if (btn == "yes") {
                var productIds = "";
                for (var i = 0; i < records.length; i++) {
                    var record = records[i];
                    productIds += record.data.id + ",";

                }
                productIds = productIds.substr(0, productIds.length - 1);
                Ext.Ajax.request({
                    url: 'product/delProduct',
                    params: {productIds: productIds},
                    success: function (resp, opts) {
                        var respText = Ext.JSON.decode(resp.responseText);
                        Ext.Msg.alert(respText.success ? '保存成功' : '操作失败', respText.msg);
                        self.getProductGridView().getStore().reload();
                    }
                });
            }
        });
    }
});
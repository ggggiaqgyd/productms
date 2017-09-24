/**
 * Created by wanghongqing on 16/5/15.
 */
Ext.define('Productms.view.product.ProductForm', {
    extend:'Ext.form.Panel',
    alias: "widget.productForm",
    bodyPadding: 5,
    width: 350,
    // 将会通过 AJAX 请求提交到此URL
    url: 'product/saveProduct',
    // 表单域 Fields 将被竖直排列, 占满整个宽度
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    defaultType: 'textfield',
    items: [{
        name: 'id',
        hidden:true
    },{
        fieldLabel: '商品名',
        name: 'prodName',
        allowBlank: false
    },{
        fieldLabel: '进价',
        name: 'prodBasePrice',
        allowBlank: false
    },{
        fieldLabel: '商品编号',
        name: 'prodCode',
        allowBlank: false
    }/*,{
        fieldLabel: '商品图片',
        name: 'imgUrl',
        allowBlank: false
    }*/,{
        fieldLabel: '卖价',
        name: 'prodSalePrice',
        allowBlank: false
    },{
        fieldLabel: '库存',
        name: 'prodStore',
        allowBlank: false
    },{
        xtype: 'combo',
            fieldLabel: '商品类型',
            name: 'prodType',
            store: Ext.create('Ext.data.Store', {
                autoLoad:true,
                proxy : {
                    type: 'ajax',
                    url : '/dictionary/getDictionaryByField'
                },
                fields: [
                    { name: 'dictKey' },
                    { name: 'dictValue' }
                ],
                listeners: {
                    beforeload: function (s, e) {
                        e.params = { fieldName: "prod_type" }; //ajax 附加参数
                    }
                }
            }),
            displayField:'dictValue',
            valueField:'dictKey',
            editable:false
    },{
        fieldLabel: '排序',
        name: 'oderId'
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
        action:'saveProduct'
    }]
});
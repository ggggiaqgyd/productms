/**
 * Created by wanghongqing on 16/5/15.
 */
Ext.define("Productms.view.order.ProductTempQueryForm", {
    extend: "Ext.form.Panel",
    alias: "widget.productTempQueryForm",
    border: false,
    height: 100,
    items: [{
        layout: {
            type: 'table',
            columns: 4
        },
        xtype: 'fieldcontainer',
        fieldDefaults: {
            msgTarget: 'side',
            style: {
                marginLeft: '25px',
                marginTop: '10px'
            },
            labelWidth: 70
        },
        items: [{
            xtype:'textfield',
            fieldLabel: '商品名',
            name: 'prodName'
        },{
            xtype:'textfield',
            fieldLabel: '商品编号',
            name: 'prodCode'
        },{
            xtype:'combo',
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
            xtype:'combo',
            fieldLabel: '商品状态',
            name: 'prodStatus',
            store:Ext.create('Ext.data.Store',{
                fields:['value','name'],
                data:[{"value":1,"name":"上架"},
                    {"value":0,"name":"下架"},
                ]
            }),
            displayField:'name',
            valueField:'value',
            editable:false
        },{
            xtype: 'fieldcontainer',
            colspan:4,
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            width: '100%',
            items: [{
                xtype: 'button',
                msgTarget: 'side',
                style: {
                    marginLeft: '25px',
                    marginTop: '10px'
                },
                action: 'query',
                iconCls: 'find',
                text: '查询'
            }, {
                xtype: 'button',
                msgTarget: 'side',
                style: {
                    marginLeft: '25px',
                    marginTop: '10px'
                },
                action: 'reset',
                iconCls: 'find',
                text: '重置'
            }]
        }
        ]
    }]
});

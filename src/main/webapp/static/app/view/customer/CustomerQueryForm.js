/**
 * Created by wanghongqing on 2016/6/4.
 */
/**
 * Created by wanghongqing on 16/5/15.
 */
Ext.define("Productms.view.customer.CustomerQueryForm", {
    extend: "Ext.form.Panel",
    alias: "widget.customerQueryForm",
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
            fieldLabel: '模糊查询',
            name: 'likeField'
        },{
            xtype: 'fieldcontainer',
            items: [{
                xtype: 'button',
                msgTarget: 'side',
                style: {
                    marginLeft: '25px',
                    marginTop: '10px'
                },
                action: 'queryCustomer',
                iconCls: 'find',
                text: '查询'
            }]
        }
        ]
    }]
});

/**
 * Created by wanghongqing on 2016/6/23.
 */
Ext.define("Productms.view.orderproduct.OrderTimeQueryForm", {
    extend: "Ext.form.Panel",
    alias: "widget.orderTimeQueryForm",
    border: false,
    height: 100,
    items: [{
        layout: {
            type: 'table',
            columns: 1
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
            xtype: "datefield",
            name: "date",
            fieldLabel: "请选择日期",
            style:"margin-top:20px;margin-left:5px",
            editable: true,
            emptyText: "--请选择--",
            format: "Y-m-d",//日期的格式
            altFormats: "Y/m/d|Ymd"
        },{
            xtype: 'fieldcontainer',
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
                    marginTop: '10px'
                },
                action: 'openStatsWin',
                iconCls: 'find',
                text: '确定'
            }, {
                xtype: 'button',
                msgTarget: 'side',
                style: {
                    marginLeft: '25px',
                    marginTop: '10px'
                },
                action: 'canel',
                iconCls: 'find',
                text: '取消'
            }]
        }
        ]
    }]
});

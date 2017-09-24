/**
 * Created by wangying on 2016/2/21.
 */
Ext.define("Productms.view.MainView", {
    extend: "Ext.container.Viewport",
    alias: "widget.mainView",
    layout: {
        type: 'border',
        padding: 5
    },
    defaults: {
        split: true
    },
    items: [{
        region: 'north',
        height: 100,
        minHeight: 75,
        border:false,
        maxHeight: 250,
        buttonAlign:'bottom',
        bodyStyle: {
            //background: '#ffc',
            background: 'url(static/images/logo/sglogo.jpg) no-repeat #00FFFF',
            padding: '10px'
        },
        html: '<div style="margin-right: 30px;float: right;margin-top: 55px;">' +
        '<span id="grobalNameCn" style="margin-right: 8px;"></span>' +
        '<input type="button" style="cursor:pointer;background: rgb(0, 142, 173);padding: 7px 10px;' +
        'border-radius: 4px;border: 1px solid rgb(26, 117, 152);border-image: none;' +
        'color: rgb(255, 255, 255);font-weight: bold;width: 80px;" onclick="logout();" value="退出" /></div>'
    }, {
        id: 'sysMenu',
        title: '菜单',
        region: 'west',
        layout: "accordion",
        layoutConfig: {
            animate: true
        },
        collapsible: true,
        floatable: false,
        margins: '5 0 0 0',
        width: '20%',
        minWidth: 100,
        maxWidth: 250
    }, {
        id:'MainCenter',
        xtype:'tabpanel',
        collapsible: false,
        region: 'center',
        margins: '5 0 0 0',
        items:[
            new Ext.panel.Panel({
                title:'主页',
                border:false,
                html: '<h1>Main Page</h1><p>This is where the main content would go</p>'
            })
        ]

    }]
});
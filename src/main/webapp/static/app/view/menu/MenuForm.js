/**
 * Created by wanghongqing on 16/4/10.
 */
Ext.define('Productms.view.menu.MenuForm', {
    extend:'Ext.form.Panel',
    alias: "widget.menuForm",
    bodyPadding: 5,
    width: 350,
    // 将会通过 AJAX 请求提交到此URL
    url: 'menu/saveMenu',
    // 表单域 Fields 将被竖直排列, 占满整个宽度
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    // The fields    fields: ['id','text','parentId','url','orderBy','isLeaf']
    defaultType: 'textfield',
    items: [{
        name: 'id',
        hidden:true
    },{
        fieldLabel: '菜单名',
        name: 'text',
        allowBlank: false
    },{
        fieldLabel: '父节点ID',
        name: 'parentId',
        allowBlank: false
    },{
        fieldLabel: 'URL地址',
        name: 'url'
    },{
        fieldLabel: '排序',
        name: 'orderBy',
        allowBlank: false
    },{
        xtype:'combo',
        fieldLabel: '是否为叶子节点',
        name: 'isLeaf',
        store:Ext.create('Ext.data.Store',{
            fields:['value','name'],
            data:[{"value":1,"name":"是"},
                {"value":0,"name":"否"},
            ]
        }),
        allowBlank: false,
        displayField:'name',
        valueField:'value',
        editable:false
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
        action:'saveMenu'
    }]
});
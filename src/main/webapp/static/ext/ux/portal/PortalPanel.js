/**
 * @class Ext.ux.portal.PortalPanel
 * @extends Ext.panel.Panel
 * A {@link Ext.panel.Panel Panel} class used for providing drag-drop-enabled portal layouts.
 */
Ext.define('Ext.ux.portal.PortalPanel', {
    extend: 'Ext.panel.Panel',
    alternateClassName: 'Ext.ux.PortalPanel',
    alias: 'widget.portalpanel',
    requires: [
        'Ext.layout.container.Column',
        'Ext.ux.portal.PortalDropZone',
        'Ext.ux.portal.PortalColumn'
    ],
    cls: 'x-portal',
    bodyCls: 'x-portal-body',
    defaultType: 'portalcolumn',
    autoScroll: true,
    manageHeight: false,
    initComponent: function () {
        var me = this;

        // Implement a Container beforeLayout call from the layout to this Container
        this.layout = {
            type: 'column'
        };
        this.callParent();

        this.addEvents({
            validatedrop: true,
            beforedragover: true,
            dragover: true,
            beforedrop: true,
            drop: true
        });
    },
    // Set columnWidth, and set first and last column classes to allow exact CSS targeting.
    beforeLayout: function () {
        var items = this.layout.getLayoutItems(),
            len = items.length,
            firstAndLast = ['x-portal-column-first', 'x-portal-column-last'],
            i, item, last;

        for (i = 0; i < len; i++) {
            item = items[i];
            item.columnWidth = 1 / len;
            last = (i == len - 1);

            if (!i) { // if (first)
                if (last) {
                    item.addCls(firstAndLast);
                } else {
                    item.addCls('x-portal-column-first');
                    item.removeCls('x-portal-column-last');
                }
            } else if (last) {
                item.addCls('x-portal-column-last');
                item.removeCls('x-portal-column-first');
            } else {
                item.removeCls(firstAndLast);
            }
        }

        return this.callParent(arguments);
    },
    // private
    initEvents: function () {
        this.callParent();
        this.dd = Ext.create('Ext.ux.portal.PortalDropZone', this, this.dropConfig);
    },
    // private
    beforeDestroy: function () {
        if (this.dd) {
            this.dd.unreg();
        }
        this.callParent();
    },
    //��ȡλ����Ϣ
    getJsonPortal: function () {
        var state = [];
        var portal = this;
        var items = portal.items;
        for (var i = 0; i < items.getCount(); i++) {
            var c = items.get(i);
            //��PortalColumn���е�ÿһ��portlet��״̬��¼����  
            c.items.each(function (item, index) {
                var st = { id: item.id, col: i, index: index };
                state.push(st);
            });
        };
        return Ext.JSON.encode(state);
    },
    //����λ��
    setPortal: function (state) {
        var portal = this;
        var items = portal.items;

        //��Ԫ��ȫ�����  
        for (var i = 0; i < items.getCount(); i++) {
            var c = items.get(i);
            c.items.each(function (portlet) {
                c.remove(portlet, false);
            });
        }
        //���ݱ����״̬���²���            
        for (var i = 0; i < state.length; i++) {
            var st = state[i];
            items.get(st.col).add(Ext.getCmp(st.id));
        }  
    }
});

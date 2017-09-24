/**
 * Created by wanghongqing on 16/4/9.
 */
Ext.define('Productms.model.menu.Menu', {
    extend: 'Ext.data.Model',
    fields: ['id','text','parentId','url','orderBy','leaf','isLeaf']
});
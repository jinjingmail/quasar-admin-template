(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{facc:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{},[n("q-splitter",{attrs:{unit:"px",horizontal:e.$q.screen.xs,"emit-immediately":""},scopedSlots:e._u([{key:"before",fn:function(){return[n("coadmin-tree",{ref:"tree",staticClass:"q-mr-sm",staticStyle:{"background-color":"var(--q-color-table-bg)"},attrs:{"node-key":"id","label-key":"label",nodes:e.treeDatas,"filter-key-like":"nameLetter","filter-key-equal":"id",selected:e.treeNodeSelected,"selected-color":"purple",selectable:""},on:{"update:selected":function(t){e.treeNodeSelected=t}},scopedSlots:e._u([{key:"default-header",fn:function(t){return[n("div",{class:{"text-weight-bold":e.treeNodeSelected==t.key}},[e._v(e._s(t.node.label))])]}}])})]},proxy:!0},e.$q.screen.xs?{key:"separator",fn:function(){return[n("q-avatar",{attrs:{color:"primary","text-color":"white",size:"35px",icon:"height"}})]},proxy:!0}:null,{key:"after",fn:function(){return[n("coadmin-tree-markup-table",{staticClass:"q-ml-sm",staticStyle:{"background-color":"var(--q-color-table-bg)"},attrs:{columns:e.columns,data:e.treeDatasSelected}})]},proxy:!0}],null,!0),model:{value:e.splitter,callback:function(t){e.splitter=t},expression:"splitter"}})],1)},a=[],l=(n("4de4"),n("6374")),i=n.n(l),o=n("486f"),s=n("1b8b"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-markup-table",{class:e.classes,attrs:{separator:e.separator,dense:e.dense,dark:e.dark,flat:e.flat,bordered:e.bordered,square:e.square}},[n("thead",[n("tr",e._l(e.columns,(function(t,r){return n("th",{class:"text-"+t.align,attrs:{Key:r},on:{click:function(n){t.sortable&&e.sortBy(t)}}},[e._v("\n            "+e._s(t.label)+"\n            "),t.sorted?n("q-icon",{attrs:{name:"asc"==t.sortDirection?"arrow_upward":"arrow_downward"}}):e._e()],1)})),0)]),n("tbody",[e.hasDefaultSlot?e._l(e.arrayTreeObj,(function(t,r){return n("tr",{key:r},[e._t("body",null,{item:t,toggle:e.toggle,setPadding:e.setPadding,iconName:e.iconName})],2)})):e._e(),e.hasDefaultSlot?e._e():e._l(e.arrayTreeObj,(function(t,r){return n("tr",{key:r},e._l(e.columns,(function(r,a){return n("td",{key:a,class:"text-"+r.align,attrs:{"data-th":"Name"}},[n("div",{class:e.hasChildren(t)?"q-pl-lg":"",style:0==a?e.setPadding(t):{"padding-left":"30px"}},[e.hasChildren(t)&&0==a?n("q-btn",{attrs:{icon:e.iconName(t),flat:"",dense:""},on:{click:function(n){0!=a||e.toggle(t)}}}):e._e(),n("span",{staticClass:"q-ml-sm"},[e._v(e._s(t[r.field]))])],1)])})),0)}))],2)])},c=[],u=(n("4160"),n("4e82"),n("159b"),{name:"CoadminTreeMarkupTable",props:["data","columns","separator","dense","dark","flat","bordered","square","classes","defaultExpandAll"],data:function(){return{leftDrawerOpen:!1,isExpanded:!0,selectedRowID:{},itemId:null,temp_data:[],temp_index:1,first_call:!1}},watch:{selectedIDRow:function(e){null!=this.selectedRowID&&this.$set(this.selectedRowID,"_index",e)}},methods:{recursive:function(e,t,n,r,a,l){var i=this;e.forEach((function(e){if(!e.children||0==e.children.length)return e.level=n,e.leaf=!0,e.sortDirection="none",e.sorted=!1,e["_index"]=i.temp_index,i.temp_index=i.temp_index+1,t.push(e),!1;e.level=n,e.leaf=!1,e.sortDirection="none",e.sorted=!1,e["_index"]=i.temp_index,i.temp_index=i.temp_index+1,l&&(e.expend=!0),t.push(e),e._index==r&&(e.expend=a),1==e.expend&&i.recursive(e.children,t,e.level+1,r,a,l)}))},iconName:function(e){return 1==e.expend?"remove":e.children&&e.children.length>0?"add":"done"},hasChildren:function(e){return e.expend||e.children&&e.children.length>0},toggle:function(e){var t=this;if(t.itemId=e._index,e.leaf=!1,0==e.leaf&&void 0==e.expend&&void 0!=e.children&&0!=e.children.length&&t.recursive(e.children,[],e.level+1,e._index,e.expend,!1),1==e.expend&&void 0!=e.children){e.children.forEach((function(e){e.expend=void 0,t.setUndefined(e)})),t.$set(e,"expend",void 0),t.$set(e,"leaf",!1),t.itemId=null}},setPadding:function(e){return this.hasChildren(e)?"padding-left: ".concat(30*e.level,"px;"):"padding-left: ".concat(30*(e.level+1),"px;")},setUndefined:function(e){var t=this;e.hasOwnProperty("children")&&e.children.forEach((function(e){e.expend=void 0,t.setUndefined(e)}))},sortBy:function(e){"asc"===e.sortDirection?(this.sort_recursive(this.data,e,!0),e.sortDirection="desc",e.arrow_downward="arrow_downward"):(this.sort_recursive(this.data,e,!1),e.sortDirection="asc"),e.sorted=!0,this.resetSorting(e)},sort_recursive:function(e,t,n){e.sort(this.sort_by(t,n));for(var r=0;r<e.length;r++)e[r].hasOwnProperty("children")&&this.sort_recursive(e[r].children,t,n)},sort_by:function(e,t){var n=t?-1:1;if("custom"===e.sortingType&&"function"===typeof e.sortingFunc)return function(t,r){return e.sortingFunc(t,r)*n};var r=function(t){return t.hasOwnProperty(e.field)?null===t[e.field]?"":t[e.field].toLowerCase():""};switch(e.sortingType){case"number":r=function(t){return parseFloat(t[e.field])};break;case"date":r=function(t){return new Date(t[e.field])};break}return function(e,t){return e=r(e),t=r(t),n*((e>t)-(t>e))}},resetSorting:function(e){for(var t=this.columns.length,n=0;n<t;n++){var r=this.columns[n];r.field!=e.field&&(r.sorted=!1,r.sortDirection="none")}}},computed:{arrayTreeObj:function(){var e=this,t=[];return this.temp_data=[],e.temp_index=1,e.recursive(e.data,t,0,e.itemId,e.isExpanded,e.first_call),e.first_call=!1,t},hasDefaultSlot:function(){return this.$scopedSlots.hasOwnProperty("body")}},mounted:function(){this.defaultExpandAll&&(this.first_call=!0)}}),f=u,h=n("2877"),p=n("2bb1"),m=n("0016"),b=n("9c40"),g=n("eebe"),v=n.n(g),x=Object(h["a"])(f,d,c,!1,null,"5f15b17d",null),_=x.exports;v()(x,"components",{QMarkupTable:p["a"],QIcon:m["a"],QBtn:b["a"]});var y={name:"PageTreeMarkupTable",components:{CoadminTree:s["a"],CoadminTreeMarkupTable:_},data:function(){return{splitter:250,treeNodeSelected:null,treeDatasExpanded:!0,text:"",textSearch:"",currentPage:1,numberPerPage:10,numberPerPageOptions:[{label:"10/页",value:10},{label:"20/页",value:20},{label:"30/页",value:30},{label:"40/页",value:40},{label:"50/页",value:50},{label:"100/页",value:100}],searchToggle:!1,loading:!1,dialogData:!1,dialogFullscreen:!1,selected:[],visibleColumns:["id","name","sort","enabled"],columns:[{name:"id",label:"ID",field:"id",sortable:!0},{name:"pid",label:"PID",field:"pid",sortable:!0},{name:"name",field:"name",required:!0,label:"名称",align:"left",format:function(e){return"".concat(e)},sortable:!0},{name:"sort",field:"sort",label:"sort"},{name:"enabled",field:"enabled",label:"enabled"},{name:"treeNames",field:"treeNames",label:"treeNames",align:"left"}]}},mounted:function(){},watch:{"$q.screen.gt.xs":function(e){console.log("$q.screen.gt.xs="+this.$q.screen.gt.xs+", val="+e)}},computed:{treeDatas:function(){return o["a"].content},treeDatasSelected:function(){var e=this.getTreeDatasByPid(this.treeDatas,this.treeNodeSelected);return e||[]}},methods:{getTreeDatasByPid:function(e,t){if(!e)return null;if(null==t||void 0===t)return e;var n=e.filter((function(e){return e.pid===t}));if(n&&n.length>0)return n;var r,a=i()(e);try{for(a.s();!(r=a.n()).done;){var l=r.value;if(l.children&&l.children.length>0&&(n=this.getTreeDatasByPid(l.children,t),n&&n.length>0))return n}}catch(o){a.e(o)}finally{a.f()}return null},rowViewClick:function(e){this.dialogData=!0},rowLooooooongButtonClick:function(){}}},w=y,k=n("8562"),D=n("b498"),q=n("cb32"),S=Object(h["a"])(w,r,a,!1,null,null,null);t["default"]=S.exports;v()(S,"components",{QSplitter:k["a"],QColor:D["a"],QAvatar:q["a"]})}}]);
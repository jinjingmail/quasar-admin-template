(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{"45a8":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pa-sm"},[a("q-dialog",{attrs:{"content-class":"coadmin-dialog",maximized:e.dialogFullscreen,persistent:"","no-esc-dismiss":!1},model:{value:e.dialogData,callback:function(t){e.dialogData=t},expression:"dialogData"}},[a("q-card",{directives:[{name:"drag",rawName:"v-drag",value:{dragOutY:45},expression:"{dragOutY:45}"}],staticStyle:{"max-width":"none"},attrs:{id:"dragableDialog"}},[a("q-toolbar",[a("q-avatar",[a("q-icon",{attrs:{name:"edit"}})],1),a("q-toolbar-title",[a("div",[e._v("菜单")])]),a("q-btn",{attrs:{flat:"",round:"",dense:"",icon:e.dialogFullscreen?"fullscreen_exit":"fullscreen"},on:{click:function(t){e.dialogFullscreen=!e.dialogFullscreen}}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",round:"",dense:"",icon:"close"}})],1),a("q-card-section",{staticClass:"q-pt-none"},[a("q-form",{staticClass:"coadmin-form"},[a("div",{staticClass:"row q-col-gutter-md"},[a("div",{staticClass:"col-12 col-sm-6"},[a("label",[e._v("姓名")]),a("q-input",{attrs:{outlined:"",dense:"",placeholder:"place","no-error-icon":"",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}})],1),a("div",{staticClass:"col-12 col-sm-6"},[a("label",[e._v("性别")]),a("q-input",{attrs:{outlined:"","no-error-icon":"",dense:""},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}})],1),a("div",{staticClass:"col-12 col-sm-6"},[a("label",[e._v("手机")]),a("q-input",{attrs:{outlined:"","no-error-icon":"",rules:[function(e){return!!e||"不能空"},function(e){return 11===e.length||"请输入11个字符"}],dense:""},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}})],1)])])],1),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Decline",color:"primary"}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Accept",color:"primary"}})],1)],1)],1),a("coadmin-table",{staticClass:"q-pa-sm",attrs:{dense:"","wrap-cells":!1,data:e.data,columns:e.columns,"row-key":"id","visible-columns":e.visibleColumns,selection:"multiple",selected:e.selected,loading:e.loading},on:{"update:selected":function(t){e.selected=t}},scopedSlots:e._u([{key:"top",fn:function(t){return[a("div",{staticClass:"row q-col-gutter-x-md q-col-gutter-y-xs",staticStyle:{width:"100%"}},[a("q-input",{staticClass:"col-xs-6 col-sm-4 col-md-3 col-lg-2",attrs:{dense:"",placeholder:"姓名"},model:{value:e.textSearch,callback:function(t){e.textSearch=t},expression:"textSearch"}}),a("q-input",{staticClass:"col-xs-6 col-sm-4 col-md-3 col-lg-2",attrs:{dense:"",placeholder:"姓名"},model:{value:e.textSearch,callback:function(t){e.textSearch=t},expression:"textSearch"}}),e.searchToggle?[a("q-input",{staticClass:"col-xs-6 col-sm-4 col-md-3 col-lg-2",attrs:{dense:"",placeholder:"姓名"},model:{value:e.textSearch,callback:function(t){e.textSearch=t},expression:"textSearch"}}),a("q-input",{staticClass:"col-xs-6 col-sm-4 col-md-3 col-lg-2",attrs:{dense:"",placeholder:"姓名"},model:{value:e.textSearch,callback:function(t){e.textSearch=t},expression:"textSearch"}}),a("q-input",{staticClass:"col-xs-6 col-sm-4 col-md-3 col-lg-2",attrs:{dense:"",placeholder:"姓名"},model:{value:e.textSearch,callback:function(t){e.textSearch=t},expression:"textSearch"}})]:e._e(),a("q-btn-group",{staticClass:"col",attrs:{outline:""}},[a("q-btn",{attrs:{dense:"",outline:"",color:"primary",label:"查询"}}),a("q-separator",{attrs:{vertical:""}}),a("q-btn",{attrs:{dense:"",outline:"",color:"primary",label:"Reset"}})],1)],2),a("q-toolbar",{staticClass:"no-padding"},[a("div",{staticClass:"q-gutter-sm no-wrap"},[a("q-btn",{attrs:{dense:"",color:"primary",icon:"add"},on:{click:e.rowViewClick}}),a("q-btn",{attrs:{dense:"",color:"primary",icon:"edit"}}),a("q-btn",{attrs:{dense:"",color:"primary",icon:"delete"}})],1),a("q-space"),a("q-btn-group",{attrs:{outline:""}},[a("q-btn",{attrs:{dense:"",outline:!e.searchToggle,color:"primary",icon:"search"},on:{click:function(t){e.searchToggle=!e.searchToggle}}}),a("q-separator",{attrs:{vertical:""}}),a("q-btn",{attrs:{dense:"",outline:"",color:"primary",icon:"autorenew"},on:{click:function(t){e.loading=!e.loading}}}),a("q-separator",{attrs:{vertical:""}}),a("q-btn",{attrs:{dense:"",outline:"",color:"primary",icon:t.inFullscreen?"fullscreen_exit":"fullscreen"},on:{click:t.toggleFullscreen}}),a("q-separator",{attrs:{vertical:""}}),a("q-btn-dropdown",{staticClass:"btn-dropdown-hide-droparrow",attrs:{"auto-close":"",outline:"",dense:"","no-icon-animation":"",color:"primary",icon:"apps"}},[a("div",{staticClass:"row no-wrap q-pa-sm"},[a("div",{staticClass:"column"},e._l(e.columns,(function(t){return a("q-toggle",{key:t.name,attrs:{val:t.name,label:t.label},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})})),1)])])],1)],1)]}},{key:"body-cell-name",fn:function(e){return[a("q-td",{attrs:{props:e}},[a("div",[a("q-badge",{attrs:{color:"purple",label:e.value}})],1)])]}},{key:"body-cell-action",fn:function(t){return[a("q-td",{attrs:{props:t}},[a("q-btn-dropdown",{attrs:{label:"",dense:"",flat:""}},[a("q-list",[a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(a){return e.rowViewClick(t.row)}}},[a("q-item-section",[a("q-item-label",[e._v("查看")])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""}},[a("q-item-section",[a("q-item-label",[e._v("修改")])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""}},[a("q-item-section",[a("q-item-label",[e._v("删除")])],1)],1),a("q-separator"),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(t){return e.rowLooooooongButtonClick()}}},[a("q-item-section",[a("q-item-label",[e._v("一个长长的按钮")])],1)],1)],1)],1)],1)]}},{key:"pagination",fn:function(){return[a("q-pagination",{attrs:{max:5e4,"direction-links":!0,"boundary-links":!1,input:"","input-class":"text-orange-10"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}}),a("q-select",{attrs:{dense:"","options-dense":"",outlined:"",options:e.numberPerPageOptions,"emit-value":"","map-options":""},model:{value:e.numberPerPage,callback:function(t){e.numberPerPage=t},expression:"numberPerPage"}})]},proxy:!0}])})],1)},o=[],n={name:"PageTableNoData",data:function(){return{text:"",textSearch:"",currentPage:0,numberPerPage:10,numberPerPageOptions:[{label:"10/页",value:10},{label:"20/页",value:20},{label:"30/页",value:30},{label:"40/页",value:40},{label:"50/页",value:50},{label:"100/页",value:100}],searchToggle:!1,loading:!1,dialogData:!1,dialogFullscreen:!1,selected:[],visibleColumns:["calories","name","protein","sodium","iron","action"],columns:[{name:"id",label:"ID",field:"id"},{name:"name",field:"name",required:!0,label:"名称",align:"left",format:function(e){return"".concat(e)},sortable:!0},{name:"calories",align:"center",label:"Calories",field:"calories",sortable:!0},{name:"fat",label:"Fat (g)",field:"fat",sortable:!0},{name:"carbs",label:"Carbs (g)",field:"carbs"},{name:"protein",label:"Protein (g)",field:"protein"},{name:"sodium",label:"Sodium (mg)",field:"sodium"},{name:"calcium",label:"Calcium (%)",field:"calcium",sortable:!0,sort:function(e,t){return parseInt(e,10)-parseInt(t,10)}},{name:"iron",label:"Iron (%)",field:"iron",sortable:!0,sort:function(e,t){return parseInt(e,10)-parseInt(t,10)}},{name:"action",label:"操作",align:"center"}],data:[]}},watch:{"$q.screen.gt.xs":function(e){console.log("$q.screen.gt.xs="+this.$q.screen.gt.xs+", val="+e)}},methods:{rowViewClick:function(e){this.dialogData=!0},rowLooooooongButtonClick:function(){}}},r=n,s=a("2877"),c=a("24e8"),i=a("f09f"),u=a("65c6"),d=a("cb32"),p=a("0016"),m=a("6ac5"),b=a("9c40"),g=a("a370"),v=a("0378"),q=a("27f9"),f=a("4b7e"),x=a("e7a9"),h=a("eb85"),w=a("2c91"),k=a("f20b"),C=a("9564"),S=a("db86"),y=a("58a8"),Q=a("1c1c"),P=a("66e5"),_=a("4074"),D=a("0170"),I=a("3b16"),T=a("ddd8"),F=a("7f67"),N=a("eebe"),B=a.n(N),O=Object(s["a"])(r,l,o,!1,null,null,null);t["default"]=O.exports;B()(O,"components",{QDialog:c["a"],QCard:i["a"],QToolbar:u["a"],QAvatar:d["a"],QIcon:p["a"],QToolbarTitle:m["a"],QBtn:b["a"],QCardSection:g["a"],QForm:v["a"],QInput:q["a"],QCardActions:f["a"],QBtnGroup:x["a"],QSeparator:h["a"],QSpace:w["a"],QBtnDropdown:k["a"],QToggle:C["a"],QTd:S["a"],QBadge:y["a"],QList:Q["a"],QItem:P["a"],QItemSection:_["a"],QItemLabel:D["a"],QPagination:I["a"],QSelect:T["a"]}),B()(O,"directives",{ClosePopup:F["a"]})}}]);
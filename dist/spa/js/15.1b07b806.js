(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{"009d":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("coadmin-table",{staticClass:"q-pa-sm ",attrs:{"row-key":"id",dense:"",flat:"",separator:"cell",data:e.data,columns:e.columns,"visible-columns":e.visibleColumns,selection:"multiple",selected:e.selected,fullscreen:e.tableFullscreen,loading:e.loading},on:{"update:selected":function(t){e.selected=t},"update:fullscreen":function(t){e.tableFullscreen=t}},scopedSlots:e._u([{key:"top",fn:function(t){return[a("div",{staticClass:"row q-col-gutter-x-md q-col-gutter-y-xs full-width"},[a("div",{staticClass:"col-auto q-pl-none q-gutter-sm no-wrap"},[a("q-btn",{attrs:{dense:"",color:"primary",icon:"add"}}),1===e.selected.length?a("q-btn",{attrs:{dense:"",color:"primary",icon:"edit"}}):e._e(),0!==e.selected.length?a("q-btn",{attrs:{dense:"",color:"primary",icon:"delete"}}):e._e(),a("q-btn-dropdown",{staticClass:"btn-dropdown-hide-droparrow",attrs:{"auto-close":"",dense:"",icon:"more_vert",color:"primary"}},[a("div",{staticClass:"row no-wrap q-pa-sm"},[a("div",{staticClass:"column"},[a("q-btn",{attrs:{label:"打开Coadmin对话框"},on:{click:function(t){return e.$refs.formDialog.show()}}})],1)])])],1),a("q-space"),a("coadmin-input",{ref:"searchInput",staticClass:"col",attrs:{filled:"",clearable:"",placeholder:"查询","input-class":"text-center"},scopedSlots:e._u([{key:"after",fn:function(){return[a("q-btn",{attrs:{dense:"",color:"primary",icon:"search"},on:{click:e.doQuery}}),a("q-btn-dropdown",{staticClass:"btn-dropdown-hide-droparrow",attrs:{dense:"","auto-close":"",color:"primary",icon:"apps"}},[a("div",{staticClass:"row no-wrap q-pa-sm"},[a("div",{staticClass:"column"},[a("q-btn",{attrs:{flat:"",label:"清空搜索",icon:"replay"},on:{click:function(t){e.loading=!e.loading}}}),a("q-btn",{attrs:{flat:"",label:"全屏",icon:t.inFullscreen?"fullscreen_exit":"fullscreen"},nativeOn:{click:function(a){return e.toggleTableFullscreen(t)}}}),a("q-separator"),e._l(e.columns,(function(t){return a("q-toggle",{key:t.name,attrs:{val:t.name,label:t.label},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})}))],2)])])]},proxy:!0}],null,!0),model:{value:e.queryModel,callback:function(t){e.queryModel=t},expression:"queryModel"}},[a("q-popup-proxy",{ref:"searchPopup",attrs:{breakpoint:"500"}},[a("q-card",{staticClass:"coadmin-popup",staticStyle:{width:"550px","max-width":"95vw"}},[a("q-card-section",[a("coadmin-form",{ref:"searchform",attrs:{"label-width":"small","label-position":"right"}},[a("div",{staticClass:"row q-col-gutter-x-lg q-col-gutter-y-md"},[a("coadmin-tree-select",{ref:"treeInputMultiple",staticClass:"col-12",attrs:{"form-label":"Tree",placeholder:"Tree多选",nodes:e.treeDatas(),"node-key":"id","label-key":"name",ticked:e.query.ticked,"tick-strategy":"leaf-all-only-parent","filter-key-like":"nameLetter","filter-key-equal":"id","tree-style":"min-width:300px; max-height:70vh;","tree-class":"q-pa-sm"},on:{"update:ticked":function(t){return e.$set(e.query,"ticked",t)},"ticked-label":function(t){return e.queryTickedLabels=t}}}),a("coadmin-tree-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"TreeSingle",placeholder:"Tree单选",nodes:e.treeDatas(),"node-key":"id","label-key":"name",selectable:"",selected:e.query.selected,"filter-key-like":"nameLetter","filter-key-equal":"id","tree-style":"min-width:300px; max-height:70vh;","tree-class":"q-pa-sm"},on:{"update:selected":function(t){return e.$set(e.query,"selected",t)},"selected-label":function(t){return e.querySelectedLabel=t}}}),a("coadmin-input",{ref:"input1",staticClass:"col-12",attrs:{"form-label":"名称很长怎么办",clearable:""},on:{blur:function(t){return e.$q.notify({message:"名称 blur notify"})}},model:{value:e.query.name,callback:function(t){e.$set(e.query,"name",t)},expression:"query.name"}}),a("coadmin-input",{ref:"input2",staticClass:"col-12 col-sm-6",attrs:{outlined:"","form-label":"calories",label:"标签"},scopedSlots:e._u([{key:"append",fn:function(){return[e.query.calories?a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"clear"},on:{click:function(t){e.query.calories=""}}}):a("q-icon",{attrs:{name:"search"}})]},proxy:!0},{key:"before",fn:function(){return[a("q-icon",{attrs:{name:"expand_less"}})]},proxy:!0},{key:"after",fn:function(){return[a("q-icon",{attrs:{name:"add"}})]},proxy:!0}],null,!0),model:{value:e.query.calories,callback:function(t){e.$set(e.query,"calories",t)},expression:"query.calories"}}),a("coadmin-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"fat","lazy-rules":"",rules:[function(e){return!!e||"不能空"},function(e){return 11===e.length||"请输入11个字符"}]},model:{value:e.query.fat,callback:function(t){e.$set(e.query,"fat",t)},expression:"query.fat"}}),a("coadmin-input",{ref:"input4",staticClass:"col-12 col-sm-6",attrs:{"form-label":"protein",filled:""},model:{value:e.query.protein,callback:function(t){e.$set(e.query,"protein",t)},expression:"query.protein"}}),a("coadmin-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"sodium",outlined:!1},model:{value:e.query.sodium,callback:function(t){e.$set(e.query,"sodium",t)},expression:"query.sodium"}}),a("coadmin-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"calcium",placeholder:"calcium"},model:{value:e.query.calcium,callback:function(t){e.$set(e.query,"calcium",t)},expression:"query.calcium"}},[a("q-popup-proxy",{attrs:{breakpoint:"0"}},[a("q-card",[a("div",[e._v("ThisisPopup")])])],1)],1),a("coadmin-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"iron",placeholder:"places","label-slot":"",clearable:""},scopedSlots:e._u([{key:"label",fn:function(){return[a("div",{staticStyle:{color:"red"}},[e._v("iron in slot")])]},proxy:!0}],null,!0),model:{value:e.query.iron,callback:function(t){e.$set(e.query,"iron",t)},expression:"query.iron"}}),a("coadmin-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"protein5",label:"选择",dense:"","options-dense":"",outlined:"","no-filter":"",options:e.mapOptions,"option-value":"id","option-label":"desc","option-disable":"inactive",clearable:"","emit-value":"","map-options":""},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"add"}})]},proxy:!0},{key:"after",fn:function(){return[a("q-icon",{attrs:{name:"menu"}})]},proxy:!0}],null,!0),model:{value:e.query.selectCompany,callback:function(t){e.$set(e.query,"selectCompany",t)},expression:"query.selectCompany"}}),a("coadmin-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"protein2",clearable:"","options-dense":"",outlined:"","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0",placeholder:"选择巨头",options:e.listOptions},scopedSlots:e._u([{key:"after",fn:function(){return[a("q-icon",{attrs:{name:"menu"}})]},proxy:!0}],null,!0),model:{value:e.query.selectCompany,callback:function(t){e.$set(e.query,"selectCompany",t)},expression:"query.selectCompany"}}),a("coadmin-field",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"options"},scopedSlots:e._u([{key:"control",fn:function(){return[a("div",{staticClass:"q-gutter-sm"},[a("q-radio",{attrs:{dense:"",name:"shape",val:"facebook",label:"Facebook"},model:{value:e.query.selectCompany,callback:function(t){e.$set(e.query,"selectCompany",t)},expression:"query.selectCompany"}}),a("q-radio",{attrs:{dense:"",name:"shape",val:"腾讯",label:"腾讯控股"},model:{value:e.query.selectCompany,callback:function(t){e.$set(e.query,"selectCompany",t)},expression:"query.selectCompany"}})],1)]},proxy:!0}],null,!0)}),a("coadmin-input",{staticClass:"col-12 col-sm-6",attrs:{"label-position":"right",mask:"####-##-##",placeholder:"####-##-##","form-label":"dateinput"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}})]},proxy:!0}],null,!0),model:{value:e.query.date,callback:function(t){e.$set(e.query,"date",t)},expression:"query.date"}},[a("q-popup-proxy",{ref:"popupDateinput"},[a("coadmin-date",{on:{input:function(t){return e.$refs.popupDateinput.hide()}},model:{value:e.query.date,callback:function(t){e.$set(e.query,"date",t)},expression:"query.date"}})],1)],1),a("coadmin-date-select",{staticClass:"col-12",attrs:{"form-label":"date2",placeholder:"日期范围选","range-separator":" 至 ",clearable:"",range:""},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"event"}})]},proxy:!0}],null,!0),model:{value:e.query.dateRange,callback:function(t){e.$set(e.query,"dateRange",t)},expression:"query.dateRange"}}),a("coadmin-date-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"date3",placeholder:"日期单选"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"event"}})]},proxy:!0}],null,!0),model:{value:e.query.dateSingle,callback:function(t){e.$set(e.query,"dateSingle",t)},expression:"query.dateSingle"}})],1)])],1),a("q-card-actions",{attrs:{align:"center"}},[a("q-btn",{attrs:{label:"查询",type:"submit",color:"primary",icon:"search"},on:{click:e.doQuery}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"清空",flat:""}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"关闭",flat:""}})],1)],1)],1)],1)],1)]}},{key:"body-cell-name",fn:function(e){return[a("q-td",{attrs:{props:e}},[a("div",[a("q-badge",{attrs:{color:"purple",label:e.value}})],1)])]}},{key:"body-cell-action",fn:function(t){return[a("q-td",{attrs:{props:t}},[a("q-btn-dropdown",{attrs:{label:"",dense:"",flat:""}},[a("q-list",[a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(a){return e.rowViewClick(t.row)}}},[a("q-item-section",[a("q-item-label",[e._v("查看")])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(a){return e.rowEditClick(t.row)}}},[a("q-item-section",[a("q-item-label",[e._v("修改")])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(a){return e.rowDelClick(t.row)}}},[a("q-item-section",[a("q-item-label",[e._v("删除")])],1)],1),a("q-separator"),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(t){return e.rowLooooooongButtonClick()}}},[a("q-item-section",[a("q-item-label",[e._v("一个长长的按钮")])],1)],1)],1)],1)],1)]}},{key:"pagination",fn:function(){return[a("q-pagination",{attrs:{max:500,"direction-links":!0,"boundary-links":!1,input:"","input-class":"text-orange-10"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}}),a("q-select",{attrs:{dense:"","options-dense":"",borderless:"",flat:"",options:e.numberPerPageOptions,"emit-value":"","map-options":""},model:{value:e.numberPerPage,callback:function(t){e.numberPerPage=t},expression:"numberPerPage"}})]},proxy:!0}])})],1)},o=[],n=(a("a15b"),a("b64b"),a("486f")),s=a("5ec7"),r={name:"PageSearchPopup",data:function(){return{query:{name:"小明",selected:7,ticked:[7,49]},querySelectedLabel:"",queryTickedLabels:null,shape:"",selectModel:"",selectModels:[],selectDate:"",selectDateRange:{from:"2020-11-14",to:"2020-11-22"},listOptions:["facebook","twitter","google","阿里巴巴","腾讯"],mapOptions:[{id:"google",desc:"Google"},{id:"facebook",desc:"Facebook"},{id:"twitter",desc:"Twitter"},{id:"apple",desc:"苹果"},{id:"阿里巴巴",desc:"阿里巴巴集团"},{id:"oracle",desc:"Oracle",inactive:!0},{id:"腾讯",desc:"腾讯控股"}],currentPage:0,numberPerPage:10,numberPerPageOptions:[{label:"10/页",value:10},{label:"20/页",value:20},{label:"30/页",value:30},{label:"40/页",value:40},{label:"50/页",value:50},{label:"100/页",value:100}],loading:!1,fabPos:[48,68],draggingFab:!1,selected:[],tableFullscreen:null,visibleColumns:s["d"],columns:s["a"],data:s["b"]}},watch:{},created:function(){},mounted:function(){this.$refs.searchPopup.show(),this.$nextTick((function(){this.$refs.searchPopup.hide()}))},computed:{queryModel:{get:function(){for(var e=[],t=0,a=Object.keys(this.query);t<a.length;t++){var l=a[t];if("selected"===l)this.querySelectedLabel&&e.push(this.querySelectedLabel);else if("ticked"===l)this.queryTickedLabels&&e.push("["+this.queryTickedLabels.join(",")+"]");else if("dateRange"===l){var o=this.query[l];o&&e.push("["+o.join(",")+"]")}else{var n=this.query[l];n&&e.push(n)}}return e.join(", ")},set:function(e){if(!e){this.querySelectedLabel=null,this.queryTickedLabels=null;for(var t=0,a=Object.keys(this.query);t<a.length;t++){var l=a[t];this.query[l]=null}}}}},methods:{doQuery:function(){var e=this;this.loading=!0,setTimeout((function(){e.loading=!1}),1e3)},treeDatas:function(){return n["a"].content},rowLooooooongButtonClick:function(){this.$q.notify({type:"positive",message:"rowLooooooongButtonClick"})},moveFab:function(e){this.draggingFab=!0!==e.isFirst&&!0!==e.isFinal,this.fabPos=[this.fabPos[0]-e.delta.x,this.fabPos[1]-e.delta.y]},toggleTableFullscreen:function(e){var t=this;e.toggleFullscreen(),this.$nextTick((function(){console.log("tableFullscreen=",t.tableFullscreen)}))}}},c=r,i=a("2877"),u=a("9c40"),d=a("f20b"),p=a("2c91"),m=a("7cbe"),f=a("f09f"),b=a("a370"),y=a("0016"),q=a("3786"),k=a("4b7e"),v=a("eb85"),g=a("9564"),h=a("db86"),C=a("58a8"),x=a("1c1c"),w=a("66e5"),P=a("4074"),S=a("0170"),$=a("3b16"),_=a("ddd8"),Q=a("7f67"),T=a("eebe"),L=a.n(T),F=Object(i["a"])(c,l,o,!1,null,null,null);t["default"]=F.exports;L()(F,"components",{QBtn:u["a"],QBtnDropdown:d["a"],QSpace:p["a"],QPopupProxy:m["a"],QCard:f["a"],QCardSection:b["a"],QIcon:y["a"],QRadio:q["a"],QCardActions:k["a"],QSeparator:v["a"],QToggle:g["a"],QTd:h["a"],QBadge:C["a"],QList:x["a"],QItem:w["a"],QItemSection:P["a"],QItemLabel:S["a"],QPagination:$["a"],QSelect:_["a"]}),L()(F,"directives",{ClosePopup:Q["a"]})}}]);
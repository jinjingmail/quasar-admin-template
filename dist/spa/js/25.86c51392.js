(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[25],{"93af":function(e,l,t){"use strict";t.r(l);var a=function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("div",[t("co-dialog",{ref:"formDialog",attrs:{value:e.crud.status.cu>0,title:e.crud.status.title,"no-backdrop-dismiss":"","card-style":"width:800px; max-width:95vw;"},on:{"before-hide":e.crud.cancelCU}},[t("co-form",{ref:"form",staticClass:"q-pa-md row q-col-gutter-x-xl q-col-gutter-y-md",attrs:{"label-width":"small","label-align":"center"}},[e.form.id?t("co-form-item",{staticClass:"col-12",attrs:{dense:"","form-label":"ID"}},[t("div",{staticClass:"q-mt-xs"},[e._v(e._s(e.form.id))])]):e._e(),t("co-input",{staticClass:"col-12 col-sm-6",attrs:{dense:"",outlined:"","form-label":"name",disable:!!e.crud.status.view,rules:[function(e){return e&&e.length>=3||"请输入3个以上字符"}]},scopedSlots:e._u([{key:"append",fn:function(){return[t("q-icon",{attrs:{name:"title"}})]},proxy:!0}]),model:{value:e.form.name,callback:function(l){e.$set(e.form,"name",l)},expression:"form.name"}}),t("co-input",{staticClass:"col-12 col-sm-6",attrs:{dense:"",outlined:"","form-label":"fat",disable:!!e.crud.status.view},model:{value:e.form.fat,callback:function(l){e.$set(e.form,"fat",l)},expression:"form.fat"}})],1),t("q-card-actions",{staticClass:"q-pa-md",attrs:{align:"right"}},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"取消",flat:""}}),e.crud.status.view?e._e():t("q-btn",{attrs:{label:"保存",color:"primary",loading:e.crud.status.cu===e.crud.STATUS_PROCESSING,disable:e.crud.status.cu===e.crud.STATUS_PROCESSING},on:{click:e.crud.submitCU}})],1)],1),t("co-table",{ref:"table",staticClass:"q-pa-sm",attrs:{"row-key":"id",flat:"","sticky-last-column":"",data:e.crud.data,columns:e.crud.columns,"visible-columns":e.crud.visibleColumns,loading:e.crud.loading,selection:"multiple",selected:e.crud.selections},on:{"update:selected":function(l){return e.$set(e.crud,"selections",l)}},scopedSlots:e._u([{key:"top",fn:function(l){return[t("div",{staticClass:"q-ma-none"},[t("div",{staticClass:"row q-gutter-sm"},[t("q-checkbox",{attrs:{dense:"",label:"label-top"},model:{value:e.labelTop,callback:function(l){e.labelTop=l},expression:"labelTop"}}),t("co-input",{staticStyle:{width:"280px"},attrs:{dense:"",outlined:"",placeholder:"form-label-style"},model:{value:e.labelStyle,callback:function(l){e.labelStyle=l},expression:"labelStyle"}})],1),t("div",{staticClass:"q-gutter-sm"},[t("q-radio",{attrs:{val:"auto",label:"auto"},model:{value:e.labelAlign,callback:function(l){e.labelAlign=l},expression:"labelAlign"}}),t("q-radio",{attrs:{val:"left",label:"left"},model:{value:e.labelAlign,callback:function(l){e.labelAlign=l},expression:"labelAlign"}}),t("q-radio",{attrs:{val:"center",label:"center"},model:{value:e.labelAlign,callback:function(l){e.labelAlign=l},expression:"labelAlign"}}),t("q-radio",{attrs:{val:"right",label:"right"},model:{value:e.labelAlign,callback:function(l){e.labelAlign=l},expression:"labelAlign"}})],1),t("div",{staticClass:"q-gutter-sm"},[t("q-radio",{attrs:{val:"fit-content",label:"fit-content"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),t("q-radio",{attrs:{val:"xsmall",label:"xsmall"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),t("q-radio",{attrs:{val:"small",label:"small"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),t("q-radio",{attrs:{val:"medium",label:"medium"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),t("q-radio",{attrs:{val:"large",label:"large"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),t("q-radio",{attrs:{val:"xlarge",label:"xlarge"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),t("q-radio",{attrs:{val:"xxlarge",label:"xxlarge"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}})],1)]),t("q-separator"),t("co-form",{staticClass:"row q-gutter-sm q-px-xs q-py-sm",attrs:{"label-top":e.labelTop,"label-align":e.labelAlign,"label-width":e.labelWidth,"form-label-style":e.labelStyle}},[t("co-input",{attrs:{"form-label":"ID",placeholder:"ID","content-style":"width:200px",dense:"",outlined:"",clearable:"","no-clear-focus":""},model:{value:e.query.id,callback:function(l){e.$set(e.query,"id",l)},expression:"query.id"}}),t("co-input",{attrs:{"form-label":"名称",placeholder:"名称","content-style":"width:200px",dense:"",outlined:"",clearable:""},model:{value:e.query.name,callback:function(l){e.$set(e.query,"name",l)},expression:"query.name"}}),t("co-date-select",{attrs:{dense:"",outlined:"","content-style":"width:200px","form-label":"日期范围",placeholder:"日期范围",clearable:"",range:""},model:{value:e.query.dateRange,callback:function(l){e.$set(e.query,"dateRange",l)},expression:"query.dateRange"}}),e.crud.props.queryMore?[t("co-date-select",{attrs:{dense:"",outlined:"","content-style":"width:100px",placeholder:"日期",clearable:""},model:{value:e.query.dateSingle,callback:function(l){e.$set(e.query,"dateSingle",l)},expression:"query.dateSingle"}}),t("co-input",{attrs:{"content-style":"width:200px",placeholder:"Fat",dense:"",outlined:"",clearable:""},scopedSlots:e._u([{key:"append",fn:function(){return[t("q-icon",{attrs:{name:"add"}})]},proxy:!0}],null,!0),model:{value:e.query.fat,callback:function(l){e.$set(e.query,"fat",l)},expression:"query.fat"}}),t("co-input",{attrs:{"content-style":"width:200px",placeholder:"Calories",dense:"",outlined:""},model:{value:e.query.calories,callback:function(l){e.$set(e.query,"calories",l)},expression:"query.calories"}}),t("co-tree-select",{attrs:{placeholder:"Tree多选",nodes:e.treeData,"node-key":"id","label-key":"name",ticked:e.query.ticked,"tick-strategy":"leaf-all-only-parent","tree-class":"q-pa-sm",clearable:"",dense:"",outlined:"","content-style":"width:200px","no-input":""},on:{"update:ticked":function(l){return e.$set(e.query,"ticked",l)}},scopedSlots:e._u([{key:"append",fn:function(){return[t("q-icon",{attrs:{name:"add"}})]},proxy:!0}],null,!0)}),t("co-select",{attrs:{options:e.listOptions,clearable:"",dense:"",outlined:"","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0",placeholder:"选择巨头","content-style":"width:200px"},model:{value:e.query.selectSingle,callback:function(l){e.$set(e.query,"selectSingle",l)},expression:"query.selectSingle"}}),t("co-select",{attrs:{options:e.listOptions,clearable:"",dense:"",outlined:"",placeholder:"选择巨头","content-style":"width:200px"},model:{value:e.query.selectSingle,callback:function(l){e.$set(e.query,"selectSingle",l)},expression:"query.selectSingle"}})]:e._e(),t("q-btn",{attrs:{dense:"",label:"查询",padding:"xs sm",color:"primary"},on:{click:e.crud.toQuery}}),t("q-btn",{attrs:{dense:"",label:"重置",flat:""},on:{click:function(l){return e.crud.resetQuery()}}}),t("q-btn",{attrs:{dense:"",label:e.crud.props.queryMore?"更少..":"更多..",flat:""},on:{click:function(l){e.crud.props.queryMore=!e.crud.props.queryMore}}})],2),t("div",{staticClass:"row q-col-gutter-x-md q-col-gutter-y-xs full-width"},[t("crud-operation",{attrs:{dense:"",permission:e.permission,"no-label":""}}),t("div",{staticClass:"col-auto"},[t("q-btn-dropdown",{staticClass:"btn-dropdown-hide-droparrow",attrs:{dense:"",color:"primary",icon:"apps","auto-close":""}},[t("crud-more",{attrs:{tableSlotTopProps:l}})],1)],1),t("q-space"),e.$q.screen.gt.xs?t("crud-pagination"):e._e()],1)]}},{key:"body-cell-action",fn:function(l){return[t("q-td",{attrs:{props:l}},[t("crud-row",{attrs:{data:l.row,"no-add":"",type:e.$q.screen.gt.xs?"button":"menu",permission:e.permission}})],1)]}},{key:"pagination",fn:function(){return[t("crud-pagination")]},proxy:!0}])})],1)},o=[],n=t("9523"),s=t.n(n),r=t("ded3"),i=t.n(r),c=t("ffd2"),d=t("efb3"),u=t("cb5f"),b=t("7b05"),p=t("d3b8"),m=t("bcc3"),f=t("486f"),y=t("38cc"),q=t("5ec7"),g={name:"PageCrudCustom3",components:{CrudOperation:d["a"],CrudMore:p["a"],CrudPagination:u["a"],CrudRow:b["a"]},cruds:function(){return Object(c["b"])({columns:q["a"],visibleColumns:q["d"],idField:"id",title:"演示",url:"api/demo",crudMethod:i()({},m["a"])})},mixins:[Object(c["f"])(),Object(c["d"])(),Object(c["c"])(q["c"]),Object(c["a"])()],data:function(){return{labelTop:!1,labelAlign:"right",labelWidth:"medium",labelStyle:"",permission:{add:["admin","user:add"],edit:["admin","user:edit"],del:["admin","user:del"]},treeData:f["a"].content,listOptions:y["a"],mapOptions:y["b"]}},created:function(){this.crud.updateProp("queryMore",!1)},mounted:function(){},methods:s()({},c["b"].HOOK.beforeRefresh,(function(){console.log("pageCrud CRUD.HOOK.beforeRefresh")}))},h=g,x=t("2877"),v=t("0016"),k=t("4b7e"),w=t("9c40"),C=t("8f8e"),S=t("3786"),W=t("eb85"),A=t("f20b"),O=t("2c91"),$=t("db86"),_=t("7f67"),T=t("eebe"),Q=t.n(T),R=Object(x["a"])(h,a,o,!1,null,null,null);l["default"]=R.exports;Q()(R,"components",{QIcon:v["a"],QCardActions:k["a"],QBtn:w["a"],QCheckbox:C["a"],QRadio:S["a"],QSeparator:W["a"],QBtnDropdown:A["a"],QSpace:O["a"],QTd:$["a"]}),Q()(R,"directives",{ClosePopup:_["a"]})}}]);
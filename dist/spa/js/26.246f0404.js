(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{ebe4:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("co-dialog",{ref:"formDialog",attrs:{value:e.crud.status.cu>0,title:e.crud.status.title,"no-backdrop-dismiss":"","card-style":"width:800px; max-width:95vw;"},on:{"before-hide":e.crud.cancelCU}},[a("co-form",{ref:"form",staticClass:"q-pa-md row q-col-gutter-x-xl q-col-gutter-y-md",attrs:{"label-width":"small","label-align":"center"}},[e.form.id?a("co-form-item",{staticClass:"col-12",attrs:{dense:"","form-label":"ID"}},[a("div",{staticClass:"q-mt-xs"},[e._v(e._s(e.form.id))])]):e._e(),a("co-input",{staticClass:"col-12 col-sm-6",attrs:{dense:"",outlined:"","form-label":"name",disable:!!e.crud.status.view,rules:[function(e){return e&&e.length>=3||"请输入3个以上字符"}]},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"title"}})]},proxy:!0}]),model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}}),a("co-input",{staticClass:"col-12 col-sm-6",attrs:{dense:"",outlined:"","form-label":"fat",disable:!!e.crud.status.view},model:{value:e.form.fat,callback:function(t){e.$set(e.form,"fat",t)},expression:"form.fat"}})],1),a("q-card-actions",{staticClass:"q-pa-md",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"取消",flat:""}}),e.crud.status.view?e._e():a("q-btn",{attrs:{label:"保存",color:"primary",loading:e.crud.status.cu===e.crud.STATUS_PROCESSING,disable:e.crud.status.cu===e.crud.STATUS_PROCESSING},on:{click:e.crud.submitCU}})],1)],1),a("co-table",{ref:"table",staticClass:"q-pt-none",attrs:{"row-key":"id",flat:"","sticky-last-column":"",title:e.crud.status.title,data:e.crud.data,columns:e.crud.columns,"visible-columns":e.crud.visibleColumns,loading:e.crud.loading,selected:e.crud.selections,selection:"multiple"},on:{"update:selected":function(t){return e.$set(e.crud,"selections",t)},"row-click":function(t,a,s){return e.crud.selections=[a]}},scopedSlots:e._u([{key:"top-right",fn:function(t){return[a("div",{staticClass:"row q-col-gutter-x-sm q-col-gutter-y-xs q-px-sm q-py-sm full-width"},[a("co-input",{attrs:{placeholder:"名称","content-style":"width:200px",clearable:""},model:{value:e.query.name,callback:function(t){e.$set(e.query,"name",t)},expression:"query.name"}}),a("co-date-select",{attrs:{"content-style":"width:200px",placeholder:"日期范围",clearable:"","use-input":"",range:""},model:{value:e.query.dateRange,callback:function(t){e.$set(e.query,"dateRange",t)},expression:"query.dateRange"}}),a("div",{staticClass:"col-auto"},[a("q-btn",{attrs:{label:"查询",dense:"",size:"17px",color:"primary"},on:{click:e.crud.toQuery}})],1),a("q-space"),a("crud-operation",{attrs:{permission:e.permission,dense:"","no-label":"",size:"17px"}}),a("div",{staticClass:"col-auto"},[a("q-btn-dropdown",{staticClass:"btn-dropdown-hide-droparrow",attrs:{dense:"",size:"17px",color:"primary",icon:"apps","auto-close":""}},[a("crud-more",{attrs:{dense:"",tableSlotTopProps:t}})],1)],1)],1)]}},{key:"body-cell-action",fn:function(t){return[a("q-td",{attrs:{props:t}},[a("crud-row",{attrs:{data:t.row,"no-add":"",type:e.$q.screen.gt.xs?"button":"menu",permission:e.permission}})],1)]}},{key:"pagination",fn:function(){return[a("crud-pagination")]},proxy:!0}])})],1)},o=[],r=a("9523"),n=a.n(r),c=a("ded3"),l=a.n(c),i=a("ffd2"),d=a("efb3"),u=a("cb5f"),p=a("7b05"),m=a("d3b8"),f=a("bcc3"),b=a("486f"),w=a("38cc"),y=a("5ec7"),C={name:"PageCrudCustom3",components:{CrudOperation:d["a"],CrudMore:m["a"],CrudPagination:u["a"],CrudRow:p["a"]},cruds:function(){return Object(i["b"])({columns:y["a"],visibleColumns:y["d"],idField:"id",title:"演示",url:"api/demo",crudMethod:l()({},f["a"])})},mixins:[Object(i["f"])(),Object(i["d"])(),Object(i["c"])(y["c"]),Object(i["a"])()],data:function(){return{permission:{add:["admin","user:add"],edit:["admin","user:edit"],del:["admin","user:del"]},treeData:b["a"].content,listOptions:w["a"],mapOptions:w["b"]}},created:function(){this.crud.updateProp("queryMore",!1)},mounted:function(){},methods:n()({},i["b"].HOOK.beforeRefresh,(function(){console.log("pageCrud CRUD.HOOK.beforeRefresh")}))},q=C,g=a("2877"),v=a("0016"),x=a("4b7e"),h=a("9c40"),k=a("2c91"),O=a("f20b"),S=a("db86"),_=a("7f67"),R=a("eebe"),P=a.n(R),Q=Object(g["a"])(q,s,o,!1,null,null,null);t["default"]=Q.exports;P()(Q,"components",{QIcon:v["a"],QCardActions:x["a"],QBtn:h["a"],QSpace:k["a"],QBtnDropdown:O["a"],QTd:S["a"]}),P()(Q,"directives",{ClosePopup:_["a"]})}}]);
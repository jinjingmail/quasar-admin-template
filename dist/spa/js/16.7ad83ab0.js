(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{f218:function(e,l,o){"use strict";o.r(l);var t=function(){var e=this,l=e.$createElement,o=e._self._c||l;return o("div",[o("co-dialog",{ref:"printDialog",attrs:{title:"打印",icon:"print"}},[o("q-card-section",[o("div",{staticClass:"text-h6"},[e._v("打印的标题")]),o("div",{staticClass:"text-body2"},[e._v("这里是要打印的内容")])]),o("q-card-actions",{attrs:{align:"right"}},[o("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",label:"关闭",flat:""}}),o("q-btn",{attrs:{dense:"",label:"打印",color:"primary"},on:{click:function(l){return e.$q.notify({type:"info",message:"打印"})}}})],1)],1),o("co-dialog",{ref:"formDialog2",attrs:{title:"表单演示2","no-backdrop-dismiss":"","card-style":"width:900px; max-width:95vw;"}},[o("co-form",{ref:"dialogForm",staticClass:"q-pa-md row q-col-gutter-x-xl q-col-gutter-y-md"},[o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"label-slot":"",label:"输入框第一个"},scopedSlots:e._u([{key:"label",fn:function(){return[o("span",{staticStyle:{color:"var(--q-color-primary)"}},[e._v("输入框第一个")])]},proxy:!0}]),model:{value:e.dialogForm.calcium,callback:function(l){e.$set(e.dialogForm,"calcium",l)},expression:"dialogForm.calcium"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{label:"输入框第二个",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.dialogForm.calcium,callback:function(l){e.$set(e.dialogForm,"calcium",l)},expression:"dialogForm.calcium"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"label-slot":"",label:"选择框第一个","use-input":"","hide-selected":"","fill-input":"","no-filter":"",options:e.mapOptions,"option-value":"id","option-label":"desc","option-disable":"inactive",clearable:"","emit-value":"","map-options":""},scopedSlots:e._u([{key:"label",fn:function(){return[o("span",{staticStyle:{color:"var(--q-color-primary)"}},[e._v("输入框第一个")])]},proxy:!0}]),model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{label:"选择框第二个","no-filter":"",options:e.mapOptions,"option-value":"id","option-label":"desc","option-disable":"inactive","emit-value":"","map-options":""},model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{label:"选择框第三个","label-slot":"","no-filter":"","use-input":"","hide-selected":"","fill-input":"",options:e.mapOptions,"option-value":"id","option-label":"desc","option-disable":"inactive","use-chips":"",clearable:"","emit-value":"","map-options":""},scopedSlots:e._u([{key:"label",fn:function(){return[o("span",{staticStyle:{color:"var(--q-color-primary)"}},[e._v("Slot 标签")])]},proxy:!0}]),model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{label:"选择框第四个","no-filter":"",options:e.mapOptions,"option-value":"id","option-label":"desc","option-disable":"inactive","use-chips":"",clearable:"","emit-value":"","map-options":""},model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}})],1),o("q-card-actions",{staticClass:"q-pa-md"},[o("q-space"),o("co-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"取消",flat:""}}),o("co-btn",{attrs:{label:"保存",type:"submit",color:"primary"},on:{click:function(l){return e.$refs.dialogForm.submit()}}})],1)],1),o("co-dialog",{ref:"formDialog",attrs:{title:"表单演示","no-backdrop-dismiss":"","card-style":"width:1200px; max-width:95vw;"}},[o("div",{staticClass:"q-ma-md "},[o("div",{staticClass:"row q-gutter-sm"},[o("co-checkbox",{attrs:{label:"label-top"},model:{value:e.labelTop,callback:function(l){e.labelTop=l},expression:"labelTop"}}),o("co-input",{staticStyle:{width:"255px"},attrs:{placeholder:"form-label-style"},model:{value:e.labelStyle,callback:function(l){e.labelStyle=l},expression:"labelStyle"}}),o("co-field",{attrs:{borderless:""},scopedSlots:e._u([{key:"control",fn:function(){return[e._v("试试输入 display:none")]},proxy:!0}])})],1),o("div",{staticClass:"q-gutter-sm"},[o("co-radio",{attrs:{val:"auto",label:"auto"},model:{value:e.labelAlign,callback:function(l){e.labelAlign=l},expression:"labelAlign"}}),o("co-radio",{attrs:{val:"left",label:"left"},model:{value:e.labelAlign,callback:function(l){e.labelAlign=l},expression:"labelAlign"}}),o("co-radio",{attrs:{val:"center",label:"center"},model:{value:e.labelAlign,callback:function(l){e.labelAlign=l},expression:"labelAlign"}}),o("co-radio",{attrs:{val:"right",label:"right"},model:{value:e.labelAlign,callback:function(l){e.labelAlign=l},expression:"labelAlign"}})],1),o("div",{staticClass:"q-gutter-sm"},[o("co-radio",{attrs:{val:"fit-content",label:"fit-content"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),o("co-radio",{attrs:{val:"xsmall",label:"xsmall"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),o("co-radio",{attrs:{val:"small",label:"small"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),o("co-radio",{attrs:{val:"medium",label:"medium"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),o("co-radio",{attrs:{val:"large",label:"large"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),o("co-radio",{attrs:{val:"xlarge",label:"xlarge"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}}),o("co-radio",{attrs:{val:"xxlarge",label:"xxlarge"},model:{value:e.labelWidth,callback:function(l){e.labelWidth=l},expression:"labelWidth"}})],1)]),o("q-separator"),o("co-form",{ref:"dialogForm",staticClass:"q-pa-md row q-col-gutter-x-xl q-col-gutter-y-md",attrs:{"label-top":e.labelTop,"label-align":e.labelAlign,"label-width":e.labelWidth,"form-label-style":e.labelStyle},on:{submit:e.onDialogFormSubmit}},[o("co-input",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"ID",disable:""},model:{value:e.dialogForm.id,callback:function(l){e.$set(e.dialogForm,"id",l)},expression:"dialogForm.id"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"名称很长怎么办名称很长怎么办名称很长怎么办",placeholder:"form-label名称很长",clearable:"",disable:e.dialogFormReadonly,standout:"",rules:[function(e){return!!e||"Field is required"}]},on:{blur:function(l){return e.$q.notify({message:"名称 blur notify"})}},model:{value:e.dialogForm.name,callback:function(l){e.$set(e.dialogForm,"name",l)},expression:"dialogForm.name"}}),o("co-input",{ref:"form_calories",staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"calories",label:"标签",disable:e.dialogFormReadonly},scopedSlots:e._u([{key:"append",fn:function(){return[e.dialogForm.calories?o("q-icon",{staticClass:"cursor-pointer",attrs:{name:"clear"},on:{click:function(l){e.dialogForm.calories=""}}}):o("q-icon",{attrs:{name:"search"}})]},proxy:!0},{key:"prepend",fn:function(){return[o("q-icon",{attrs:{name:"add"}})]},proxy:!0},{key:"before",fn:function(){return[o("q-icon",{attrs:{name:"expand_less"}})]},proxy:!0},{key:"after",fn:function(){return[o("q-icon",{attrs:{name:"expand_more"}})]},proxy:!0}]),model:{value:e.dialogForm.calories,callback:function(l){e.$set(e.dialogForm,"calories",l)},expression:"dialogForm.calories"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"fat",disable:e.dialogFormReadonly,rules:[function(e){return!!e||"不能空"},function(e){return 11===e.length||"请输入11个字符"}]},model:{value:e.dialogForm.fat,callback:function(l){e.$set(e.dialogForm,"fat",l)},expression:"dialogForm.fat"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"protein","form-label-style":"color:green",outlined:!1,disable:e.dialogFormReadonly},model:{value:e.dialogForm.protein,callback:function(l){e.$set(e.dialogForm,"protein",l)},expression:"dialogForm.protein"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"sodium","form-label-style":"background-color:grey",filled:"",disable:e.dialogFormReadonly},model:{value:e.dialogForm.sodium,callback:function(l){e.$set(e.dialogForm,"sodium",l)},expression:"dialogForm.sodium"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{dense:"",outlined:"","form-label":"calcium1",label:"calcium",disable:e.dialogFormReadonly,rules:[function(e){return!!e||"Field is required"}]},model:{value:e.dialogForm.calcium,callback:function(l){e.$set(e.dialogForm,"calcium",l)},expression:"dialogForm.calcium"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"calcium2",label:"calcium","label-slot":"",disable:e.dialogFormReadonly,standout:""},scopedSlots:e._u([{key:"label",fn:function(){return[o("span",{staticStyle:{color:"green"}},[e._v("Label Slot 标签")])]},proxy:!0}]),model:{value:e.dialogForm.calcium,callback:function(l){e.$set(e.dialogForm,"calcium",l)},expression:"dialogForm.calcium"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"protein1",placeholder:"选择",outlined:"","use-input":"","hide-selected":"","fill-input":"",disable:e.dialogFormReadonly,"no-filter":"",options:e.mapOptions,"option-value":"id","option-label":"desc","option-disable":"inactive",clearable:"","emit-value":"","map-options":""},model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"protein2",filled:"",disable:e.dialogFormReadonly,"no-filter":"",options:e.mapOptions,"option-value":"id","option-label":"desc","option-disable":"inactive",clearable:"","emit-value":"","map-options":""},model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"protein3","label-slot":"",label:"选择",outlined:"",disable:e.dialogFormReadonly,"no-filter":"","use-input":"","hide-selected":"","fill-input":"",options:e.mapOptions,"option-value":"id","option-label":"desc","option-disable":"inactive",clearable:"","emit-value":"","map-options":""},scopedSlots:e._u([{key:"label",fn:function(){return[o("span",{staticStyle:{color:"var(--q-color-primary)"}},[e._v("Label Slot 标签")])]},proxy:!0}]),model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"protein4",label:"选择",filled:"",disable:e.dialogFormReadonly,"no-filter":"",options:e.mapOptions,"option-value":"id","option-label":"desc","option-disable":"inactive",clearable:"","emit-value":"","map-options":""},model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"big select1",dense:!1,disable:e.dialogFormReadonly,clearable:"",outlined:"","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0",label:"大选择框",options:e.listOptions,rules:[function(e){return!!e||"Field is required"}]},scopedSlots:e._u([{key:"append",fn:function(){return[o("q-icon",{attrs:{name:"add"}})]},proxy:!0}]),model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"big select2",disable:e.dialogFormReadonly,dense:!1,"use-input":"","hide-selected":"","fill-input":"","input-debounce":"0",placeholder:"大选择框",options:e.listOptions,rules:[function(e){return!!e||"Field is required"}]},scopedSlots:e._u([{key:"append",fn:function(){return[o("q-icon",{attrs:{name:"add"}})]},proxy:!0}]),model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"big select3",disable:e.dialogFormReadonly,dense:!1,clearable:"",outlined:"","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0",placeholder:"大选择框",options:e.listOptions,rules:[function(e){return!!e||"Field is required"}]},model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"big select4",disable:e.dialogFormReadonly,dense:!1,clearable:"","input-debounce":"0",label:"大选择框","label-slot":"",options:e.listOptions,rules:[function(e){return!!e||"Field is required"}]},scopedSlots:e._u([{key:"label",fn:function(){return[e._v("\n            Label Slot 标签\n          ")]},proxy:!0},{key:"append",fn:function(){return[o("q-icon",{attrs:{name:"add"}})]},proxy:!0}]),model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"big input",outlined:"",dense:!1,label:"大输入框",clearable:"",disable:e.dialogFormReadonly},model:{value:e.dialogForm.iron,callback:function(l){e.$set(e.dialogForm,"iron",l)},expression:"dialogForm.iron"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"big input2",placeholder:"大输入框",dense:!1,clearable:"",disable:e.dialogFormReadonly},model:{value:e.dialogForm.iron,callback:function(l){e.$set(e.dialogForm,"iron",l)},expression:"dialogForm.iron"}}),o("co-field",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"options",disable:e.dialogFormReadonly},scopedSlots:e._u([{key:"control",fn:function(){return[o("div",{staticClass:"q-gutter-sm"},[o("co-radio",{attrs:{dense:"",name:"shape",val:"facebook",label:"Facebook"},model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-radio",{attrs:{dense:"",name:"shape",val:"腾讯",label:"腾讯控股"},model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}})],1)]},proxy:!0}])}),o("co-option-group",{staticClass:"col-12 col-sm-6",attrs:{dense:"",inline:!0,"form-label":"options Group",disable:e.dialogFormReadonly,options:e.mapOptions,"option-value":"id","option-label":"desc",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.selectModel,callback:function(l){e.selectModel=l},expression:"selectModel"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"multiselect1",disable:e.dialogFormReadonly,dense:"","option-value":"id","option-label":"desc","option-disable":"inactive",clearable:"","use-chips":"",placeholder:"选择巨头",options:e.mapOptions,"map-options":"","emit-value":"",multiple:""},model:{value:e.selectModels,callback:function(l){e.selectModels=l},expression:"selectModels"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"multiselect2",disable:e.dialogFormReadonly,dense:"","option-value":"id","option-label":"desc","option-disable":"inactive","use-input":"","fill-input":"","use-chips":"","input-debounce":"0",options:e.mapOptions,"map-options":"","emit-value":"",multiple:""},model:{value:e.selectModels,callback:function(l){e.selectModels=l},expression:"selectModels"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"multiselect3",disable:e.dialogFormReadonly,"option-value":"id","option-label":"desc","option-disable":"inactive",dense:!1,clearable:"","use-input":"","fill-input":"","use-chips":"",options:e.mapOptions,"map-options":"","emit-value":"",multiple:""},model:{value:e.selectModels,callback:function(l){e.selectModels=l},expression:"selectModels"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"multiselect4",disable:e.dialogFormReadonly,"option-value":"id","option-label":"desc","option-disable":"inactive",dense:!1,"use-chips":"",placeholder:"选择巨头",options:e.mapOptions,"map-options":"","emit-value":"",multiple:""},model:{value:e.selectModels,callback:function(l){e.selectModels=l},expression:"selectModels"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"multiselect11",disable:e.dialogFormReadonly,dense:"","option-value":"id","option-label":"desc","option-disable":"inactive",clearable:"",placeholder:"选择巨头",options:e.mapOptions,"map-options":"","emit-value":"",multiple:""},model:{value:e.selectModels,callback:function(l){e.selectModels=l},expression:"selectModels"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"multiselect22",disable:e.dialogFormReadonly,dense:"","option-value":"id","option-label":"desc","option-disable":"inactive","use-input":"","fill-input":"",options:e.mapOptions,"map-options":"","emit-value":"",multiple:""},model:{value:e.selectModels,callback:function(l){e.selectModels=l},expression:"selectModels"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"multiselect33",disable:e.dialogFormReadonly,"option-value":"id","option-label":"desc","option-disable":"inactive",dense:!1,clearable:"","use-input":"","fill-input":"",options:e.mapOptions,"map-options":"","emit-value":"",multiple:""},model:{value:e.selectModels,callback:function(l){e.selectModels=l},expression:"selectModels"}}),o("co-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"multiselect44",disable:e.dialogFormReadonly,"option-value":"id","option-label":"desc","option-disable":"inactive",dense:!1,placeholder:"选择巨头",options:e.mapOptions,"map-options":"","emit-value":"",multiple:""},model:{value:e.selectModels,callback:function(l){e.selectModels=l},expression:"selectModels"}}),o("co-option-group",{staticClass:"col-12 col-sm-6",attrs:{dense:"",inline:!0,"form-label":"optionsGroup1",disable:e.dialogFormReadonly,options:e.mapOptions,"option-value":"id","option-label":"desc",type:"checkbox",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.selectModels,callback:function(l){e.selectModels=l},expression:"selectModels"}}),o("co-option-group",{staticClass:"col-12 col-sm-6",attrs:{dense:"",inline:!0,"form-label":"optionsGroup2",disable:e.dialogFormReadonly,options:e.mapOptions,"option-value":"id","option-label":"desc",type:"checkbox",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.selectModels,callback:function(l){e.selectModels=l},expression:"selectModels"}}),o("co-date",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"date1 TOP",dense:!1,"label-top":"","today-btn":"",minimal:"",disable:e.dialogFormReadonly,rules:[function(e){return!!e||"Field is required"}]},model:{value:e.selectDate,callback:function(l){e.selectDate=l},expression:"selectDate"}}),o("co-date",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"date2",dense:!1,"today-btn":"",minimal:"",disable:e.dialogFormReadonly,rules:[function(e){return!!e||"Field is required"}]},model:{value:e.selectDate,callback:function(l){e.selectDate=l},expression:"selectDate"}}),o("co-date-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"selectDate1 LEFT",dense:!1,clearable:"","label-align":"left","label-width":"large","no-ellipsis":"",mask:"####-##-##",placeholder:"####-##-##",disable:e.dialogFormReadonly},model:{value:e.selectDate,callback:function(l){e.selectDate=l},expression:"selectDate"}}),o("co-date-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"selectDate2","hide-dropdown-icon":"",dense:!1,clearable:"","no-ellipsis":"",mask:"####-##-##",placeholder:"####-##-##",disable:e.dialogFormReadonly},model:{value:e.selectDate,callback:function(l){e.selectDate=l},expression:"selectDate"}}),o("co-form-item",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"formField"}},[o("co-field",{attrs:{borderless:""},scopedSlots:e._u([{key:"control",fn:function(){return[o("div",{staticClass:"self-center full-width no-outline",attrs:{tabindex:"0"}},[e._v("语句用于基于不同条件执行不同动作")])]},proxy:!0}])})],1),o("co-form-item",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"formField"}},[o("q-field",{attrs:{borderless:""},scopedSlots:e._u([{key:"control",fn:function(){return[o("div",{staticClass:"self-center full-width no-outline",attrs:{tabindex:"0"}},[e._v("作语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作")])]},proxy:!0}])})],1),o("co-form-item",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"formtext"}},[o("div",{staticClass:"q-pt-xs"},[e._v("语句用于基于不同条件执行不同动作")])]),o("co-form-item",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"formtext"}},[o("div",{staticClass:"q-pt-xs"},[e._v("\n          语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作\n          ")])]),o("co-field",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"text field1",readonly:""},scopedSlots:e._u([{key:"control",fn:function(){return[e._v("readonly语句用于基于不同条件执行不同动作")]},proxy:!0}])}),o("co-field",{staticClass:"col-12 col-sm-6",attrs:{dense:"","form-label":"text field2",disable:""},scopedSlots:e._u([{key:"control",fn:function(){return[e._v("disable语句用于基于不同条件执行不同动作")]},proxy:!0}])}),o("co-field",{staticClass:"col-12 col-sm-6",attrs:{dense:"",borderless:"","form-label":"RIGHT","label-align":"right",disable:""},scopedSlots:e._u([{key:"control",fn:function(){return[o("co-radio",{staticClass:"col-6 col-md-4",attrs:{dense:"",val:"line",label:"Line"},model:{value:e.shape,callback:function(l){e.shape=l},expression:"shape"}}),o("co-radio",{staticClass:"col-6 col-md-4",attrs:{dense:"",val:"rectangle",label:"Rectangle"},model:{value:e.shape,callback:function(l){e.shape=l},expression:"shape"}}),o("co-radio",{staticClass:"col-6 col-md-4",attrs:{dense:"",val:"ellipse",label:"Ellipse"},model:{value:e.shape,callback:function(l){e.shape=l},expression:"shape"}})]},proxy:!0}])}),o("co-date-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"no-ellipsis no-ellipsis no-ellipsis no-ellipsis","no-ellipsis":"",clearable:"",disable:e.dialogFormReadonly,rules:[function(e){return!!e||"Field is required"}]},scopedSlots:e._u([{key:"append",fn:function(){return[o("q-icon",{attrs:{name:"event"}})]},proxy:!0}]),model:{value:e.dialogForm.date3,callback:function(l){e.$set(e.dialogForm,"date3",l)},expression:"dialogForm.date3"}}),o("co-date-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"DateRange1",dense:"","form-label-style":"color:grey",clearable:"",range:"",disable:e.dialogFormReadonly,rules:[function(e){return!!e||"Field is required"}]},model:{value:e.dialogForm.date2,callback:function(l){e.$set(e.dialogForm,"date2",l)},expression:"dialogForm.date2"}}),o("co-date-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"DateRange2",dense:"",range:"",disable:e.dialogFormReadonly,rules:[function(e){return!!e||"Field is required"}]},model:{value:e.dialogForm.date2,callback:function(l){e.$set(e.dialogForm,"date2",l)},expression:"dialogForm.date2"}}),o("co-tree-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"TreeTicked1",dense:"",nodes:e.treeDatas(),"node-key":"id","label-key":"name",ticked:e.dialogForm.ticked,"tick-strategy":"leaf-all-only-parent","filter-key-like":"nameLetter","filter-key-equal":"id","tree-style":"min-width:300px; max-height:70vh;","tree-class":"q-pa-sm",disable:e.dialogFormReadonly,clearable:"",rules:[function(e){return!!e||"Field is required"}]},on:{"update:ticked":function(l){return e.$set(e.dialogForm,"ticked",l)}}}),o("co-tree-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"TreeTicked2",dense:"",nodes:e.treeDatas(),"node-key":"id","label-key":"name",ticked:e.dialogForm.ticked,"tick-strategy":"leaf-all-only-parent","filter-key-like":"nameLetter","filter-key-equal":"id",disable:e.dialogFormReadonly,rules:[function(e){return!!e||"Field is required"}]},on:{"update:ticked":function(l){return e.$set(e.dialogForm,"ticked",l)}}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"autogrow1",dense:"",placeholder:"自动扩张尺寸",autogrow:"",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.text,callback:function(l){e.text=l},expression:"text"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"autogrow2",label:"文本域",dense:"",autogrow:""},model:{value:e.text,callback:function(l){e.text=l},expression:"text"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"textarea1",dense:"",type:"textarea",rows:"2",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.text,callback:function(l){e.text=l},expression:"text"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"textarea2",label:"文本域",dense:"",type:"textarea",rows:"2"},model:{value:e.text,callback:function(l){e.text=l},expression:"text"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"autogrow big1",dense:!1,autogrow:""},model:{value:e.text,callback:function(l){e.text=l},expression:"text"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"autogrow big2",label:"文本域",dense:!1,autogrow:"",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.text,callback:function(l){e.text=l},expression:"text"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"textarea big1",dense:!1,type:"textarea",rows:"2"},model:{value:e.text,callback:function(l){e.text=l},expression:"text"}}),o("co-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"textarea big2",label:"文本域","label-slot":"",dense:!1,type:"textarea",rows:"2",rules:[function(e){return!!e||"Field is required"}]},scopedSlots:e._u([{key:"label",fn:function(){return[e._v("\n            Label Slot 标签\n          ")]},proxy:!0}]),model:{value:e.text,callback:function(l){e.text=l},expression:"text"}})],1),o("q-card-actions",{staticClass:"q-pa-md"},[o("co-btn",{attrs:{label:"打印",color:"primary"},on:{click:function(l){return e.$refs.printDialog.show()}}}),o("q-space"),o("co-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"取消",flat:""}}),e.dialogFormReadonly?e._e():o("co-btn",{attrs:{label:"保存",type:"submit",color:"primary"},on:{click:function(l){return e.$refs.dialogForm.submit()}}})],1)],1),o("co-table",{attrs:{"row-key":"id",dense:"",stickyHeader:"",data:e.data,columns:e.columns,"visible-columns":e.visibleColumns,selection:"multiple",selected:e.selected,fullscreen:e.tableFullscreen,loading:e.loading},on:{"update:selected":function(l){e.selected=l},"update:fullscreen":function(l){e.tableFullscreen=l}},scopedSlots:e._u([{key:"top",fn:function(l){return[o("div",{staticClass:"row q-col-gutter-x-md q-col-gutter-y-xs full-width"},[o("div",{staticClass:"col-auto q-pl-none q-gutter-sm no-wrap"},[o("q-btn",{attrs:{dense:"",color:"primary",icon:"add"},on:{click:e.rowAddClick}}),o("q-btn",{attrs:{dense:"",color:"primary",icon:"edit",disable:1!==e.selected.length},on:{click:e.rowEditClick_selected}}),o("q-btn",{attrs:{dense:"",color:"primary",icon:"delete",disable:0===e.selected.length},on:{click:e.rowDelClick_selected}}),o("q-btn-dropdown",{staticClass:"btn-dropdown-hide-droparrow",attrs:{"auto-close":"",dense:"",icon:"more_vert",color:"primary"}},[o("div",{staticClass:"row no-wrap q-pa-sm"},[o("div",{staticClass:"column"},[o("q-btn",{attrs:{flat:"",label:"对话框样式1"},on:{click:function(l){return e.$refs.formDialog.show()}}}),o("q-btn",{attrs:{flat:"",label:"对话框样式2"},on:{click:function(l){return e.$refs.formDialog2.show()}}})],1)])])],1),o("q-space"),o("q-input",{staticClass:"col-6 col-sm-4 col-md-3 col-lg-2",attrs:{dense:"",placeholder:"姓名"},model:{value:e.textSearch,callback:function(l){e.textSearch=l},expression:"textSearch"}}),o("q-input",{staticClass:"col-6 col-sm-4 col-md-3 col-lg-2",attrs:{dense:"",placeholder:"姓名"},model:{value:e.textSearch,callback:function(l){e.textSearch=l},expression:"textSearch"}}),e.searchToggle?[o("q-input",{staticClass:"col-6 col-sm-4 col-md-3 col-lg-2",attrs:{dense:"",placeholder:"姓名"},model:{value:e.textSearch,callback:function(l){e.textSearch=l},expression:"textSearch"}}),o("q-input",{staticClass:"col-6 col-sm-4 col-md-3 col-lg-2",attrs:{dense:"",placeholder:"姓名"},model:{value:e.textSearch,callback:function(l){e.textSearch=l},expression:"textSearch"}}),o("q-input",{staticClass:"col-6 col-sm-4 col-md-3 col-lg-2",attrs:{dense:"",placeholder:"姓名"},model:{value:e.textSearch,callback:function(l){e.textSearch=l},expression:"textSearch"}})]:e._e(),o("q-space"),o("q-btn-group",{staticClass:"col-auto",attrs:{flat:"",rounded:""}},[o("q-btn",{attrs:{color:"grey-3","text-color":"dark",icon:"search"}}),o("q-btn",{attrs:{color:"grey-3","text-color":"dark",icon:e.searchToggle?"zoom_out":"zoom_in"},on:{click:function(l){e.searchToggle=!e.searchToggle}}}),o("q-btn-dropdown",{staticClass:"btn-dropdown-hide-droparrow",attrs:{"auto-close":"",color:"grey-3","text-color":"dark",icon:"apps"}},[o("div",{staticClass:"row no-wrap q-pa-sm"},[o("div",{staticClass:"column"},[o("q-btn",{attrs:{flat:"",label:"清空搜索",icon:"replay"},on:{click:function(l){e.loading=!e.loading}}}),o("q-btn",{attrs:{flat:"",label:"全屏",icon:l.inFullscreen?"fullscreen_exit":"fullscreen"},nativeOn:{click:function(o){return e.toggleTableFullscreen(l)}}}),o("q-separator"),e._l(e.columns,(function(l){return o("q-toggle",{key:l.name,attrs:{val:l.name,label:l.label},model:{value:e.visibleColumns,callback:function(l){e.visibleColumns=l},expression:"visibleColumns"}})}))],2)])])],1)],2)]}},{key:"body-cell-name",fn:function(e){return[o("q-td",{attrs:{props:e}},[o("div",[o("q-badge",{attrs:{color:"purple",label:e.value}})],1)])]}},{key:"body-cell-action",fn:function(l){return[o("q-td",{attrs:{props:l}},[o("q-btn-dropdown",{attrs:{label:"",dense:"",flat:""}},[o("q-list",[o("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(o){return e.rowViewClick(l.row)}}},[o("q-item-section",[o("q-item-label",[e._v("查看")])],1)],1),o("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(o){return e.rowEditClick(l.row)}}},[o("q-item-section",[o("q-item-label",[e._v("修改")])],1)],1),o("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(o){return e.rowDelClick(l.row)}}},[o("q-item-section",[o("q-item-label",[e._v("删除")])],1)],1),o("q-separator"),o("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(l){return e.rowLooooooongButtonClick()}}},[o("q-item-section",[o("q-item-label",[e._v("一个长长的按钮")])],1)],1)],1)],1)],1)]}},{key:"pagination",fn:function(){return[o("q-pagination",{attrs:{max:500,"direction-links":!0,"boundary-links":!1,input:"","input-class":"text-orange-10"},model:{value:e.currentPage,callback:function(l){e.currentPage=l},expression:"currentPage"}}),o("q-select",{attrs:{dense:"","options-dense":"",borderless:"",flat:"",options:e.numberPerPageOptions,"emit-value":"","map-options":""},model:{value:e.numberPerPage,callback:function(l){e.numberPerPage=l},expression:"numberPerPage"}})]},proxy:!0}])})],1)},a=[],s=o("ded3"),i=o.n(s),c=o("486f"),n=o("5ec7"),r={id:null,name:null,calories:null,fat:null,protein:null,sodium:null,calcium:null,iron:null},d={name:"PageTable",data:function(){return{labelTop:!1,labelAlign:"right",labelWidth:"medium",labelStyle:"",text:"",textSearch:"",shape:"",selectModel:void 0,selectModels:[],selectDate:"",selectDateRange:{from:"2020-11-14",to:"2020-11-22"},listOptions:["facebook","twitter","google","阿里巴巴","腾讯"],mapOptions:[{id:"google",desc:"Google"},{id:"facebook",desc:"Facebook"},{id:"twitter",desc:"Twitter"},{id:"apple",desc:"苹果"},{id:"阿里巴巴",desc:"阿里巴巴集团"},{id:"oracle",desc:"Oracle",inactive:!0},{id:"腾讯",desc:"腾讯控股"}],currentPage:0,numberPerPage:10,numberPerPageOptions:[{label:"10/页",value:10},{label:"20/页",value:20},{label:"30/页",value:30},{label:"40/页",value:40},{label:"50/页",value:50},{label:"100/页",value:100}],searchToggle:!1,loading:!1,dialogForm:{},dialogFormReadonly:!0,fabPos:[48,68],draggingFab:!1,selected:[],tableFullscreen:null,visibleColumns:n["d"],columns:n["a"],data:n["b"]}},watch:{"$q.screen.gt.xs":function(e){console.log("$q.screen.gt.xs="+e)}},created:function(){console.log("pageTable created")},mounted:function(){console.log("pageTable mounted")},activated:function(){console.log("pageTable activated")},deactivated:function(){console.log("pageTable deactivated")},destroyed:function(){console.log("pageTable destroyed")},methods:{treeDatas:function(){return c["a"].content},onDialogFormSubmit:function(){var e=this;console.log("this.dialogForm:",this.dialogForm),this.dialogFormReadonly||this.$refs.dialogForm.validate().then((function(l){l?e.$q.notify({type:"positive",message:"提交ID:".concat(e.dialogForm.id)}):e.$q.notify({type:"negative",message:"提交失败"})}))},rowViewClick:function(e){this.dialogForm=i()({},e),this.dialogFormReadonly=!0,this.$refs.formDialog.show()},rowAddClick:function(){this.dialogForm=i()({},r),this.dialogFormReadonly=!1,this.$refs.formDialog.show()},rowEditClick:function(e){this.dialogForm=i()({},e),this.dialogFormReadonly=!1,this.$refs.formDialog.show()},rowEditClick_selected:function(){var e=this.selected[0];this.rowEditClick(e)},rowDelClick:function(e){this.$q.notify({type:"warning",message:"删除ID:".concat(e.id)})},rowDelClick_selected:function(){var e=0;this.selected&&(e=this.selected.length),this.$q.notify({type:"negative",message:"删除".concat(e,"条")})},rowLooooooongButtonClick:function(){this.$q.notify({type:"positive",message:"rowLooooooongButtonClick"})},moveFab:function(e){this.draggingFab=!0!==e.isFirst&&!0!==e.isFinal,this.fabPos=[this.fabPos[0]-e.delta.x,this.fabPos[1]-e.delta.y]},toggleTableFullscreen:function(e){var l=this;e.toggleFullscreen(),this.$nextTick((function(){console.log("tableFullscreen=",l.tableFullscreen)}))}}},u=d,p=o("2877"),m=o("a370"),b=o("4b7e"),f=o("9c40"),g=o("b498"),v=o("2c91"),x=o("eb85"),k=o("0016"),y=o("8572"),h=o("f20b"),F=o("27f9"),q=o("e7a9"),C=o("9564"),w=o("db86"),M=o("58a8"),S=o("1c1c"),_=o("66e5"),R=o("4074"),D=o("0170"),$=o("3b16"),O=o("ddd8"),T=o("7f67"),P=o("eebe"),W=o.n(P),Q=Object(p["a"])(u,t,a,!1,null,null,null);l["default"]=Q.exports;W()(Q,"components",{QCardSection:m["a"],QCardActions:b["a"],QBtn:f["a"],QColor:g["a"],QSpace:v["a"],QSeparator:x["a"],QIcon:k["a"],QField:y["a"],QBtnDropdown:h["a"],QInput:F["a"],QBtnGroup:q["a"],QToggle:C["a"],QTd:w["a"],QBadge:M["a"],QList:S["a"],QItem:_["a"],QItemSection:R["a"],QItemLabel:D["a"],QPagination:$["a"],QSelect:O["a"]}),W()(Q,"directives",{ClosePopup:T["a"]})}}]);
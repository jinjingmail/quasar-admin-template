(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{"009d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("coadmin-table",{staticClass:"q-pa-sm ",attrs:{"row-key":"id",dense:"",flat:"",separator:"cell",data:e.data,columns:e.columns,"visible-columns":e.visibleColumns,selection:"multiple",selected:e.selected,fullscreen:e.tableFullscreen,loading:e.loading},on:{"update:selected":function(t){e.selected=t},"update:fullscreen":function(t){e.tableFullscreen=t}},scopedSlots:e._u([{key:"top",fn:function(t){return[a("div",{staticClass:"row q-col-gutter-x-md q-col-gutter-y-xs full-width"},[a("div",{staticClass:"col-auto q-pl-none q-gutter-sm no-wrap"},[a("q-btn",{attrs:{dense:"",color:"primary",icon:"add"}}),a("q-btn",{attrs:{dense:"",color:"primary",icon:"edit",disable:1!==e.selected.length}}),a("q-btn",{attrs:{dense:"",color:"primary",icon:"delete",disable:0===e.selected.length}}),a("q-btn-dropdown",{staticClass:"btn-dropdown-hide-droparrow",attrs:{"auto-close":"",dense:"",icon:"more_vert",color:"primary"}},[a("div",{staticClass:"row no-wrap q-pa-sm"},[a("div",{staticClass:"column"},[a("q-btn",{attrs:{label:"打开Coadmin对话框"},on:{click:function(t){return e.$refs.formDialog.show()}}})],1)])])],1),a("q-space"),a("coadmin-input",{ref:"searchInput",staticClass:"col-sm-12 col-md",attrs:{filled:"",clearable:"",placeholder:"查询","input-class":"text-center"},scopedSlots:e._u([{key:"after",fn:function(){return[a("q-btn",{attrs:{dense:"",color:"primary",icon:"search"},on:{click:e.doQuery}}),a("q-btn-dropdown",{staticClass:"btn-dropdown-hide-droparrow",attrs:{dense:"","auto-close":"",color:"primary",icon:"apps"}},[a("div",{staticClass:"row no-wrap q-pa-sm"},[a("div",{staticClass:"column"},[a("q-btn",{attrs:{flat:"",label:"清空搜索",icon:"replay"},on:{click:function(t){e.loading=!e.loading}}}),a("q-btn",{attrs:{flat:"",label:"全屏",icon:t.inFullscreen?"fullscreen_exit":"fullscreen"},nativeOn:{click:function(a){return e.toggleTableFullscreen(t)}}}),a("q-separator"),e._l(e.columns,(function(t){return a("q-toggle",{key:t.name,attrs:{val:t.name,label:t.label},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})}))],2)])])]},proxy:!0}],null,!0),model:{value:e.queryModel,callback:function(t){e.queryModel=t},expression:"queryModel"}},[a("q-popup-proxy",{ref:"searchPopup",attrs:{breakpoint:"500"}},[a("q-card",{staticClass:"coadmin-popup",staticStyle:{width:"550px","max-width":"95vw"}},[a("q-card-section",[a("coadmin-form",{ref:"searchform",attrs:{"label-width":"small","label-position":"right"}},[a("div",{staticClass:"row q-col-gutter-x-lg q-col-gutter-y-md"},[a("coadmin-tree-input",{ref:"treeInputMultiple",staticClass:"col-12",attrs:{"form-label":"Tree",placeholder:"Tree多选",nodes:e.treeDatas(),"node-key":"id","label-key":"name",ticked:e.query.ticked,"tick-strategy":"leaf-all-only-parent","filter-key-like":"nameLetter","filter-key-equal":"id","tree-style":"min-width:300px; max-height:70vh;","tree-class":"q-pa-sm"},on:{"update:ticked":function(t){return e.$set(e.query,"ticked",t)},"ticked-label":function(t){return e.queryTickedLabels=t}}}),a("coadmin-tree-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"TreeSingle",placeholder:"Tree单选",nodes:e.treeDatas(),"node-key":"id","label-key":"name",selectable:"",selected:e.query.selected,"filter-key-like":"nameLetter","filter-key-equal":"id","tree-style":"min-width:300px; max-height:70vh;","tree-class":"q-pa-sm"},on:{"update:selected":function(t){return e.$set(e.query,"selected",t)},"selected-label":function(t){return e.querySelectedLabel=t}}}),a("coadmin-input",{ref:"input1",staticClass:"col-12",attrs:{"form-label":"名称很长怎么办",clearable:""},on:{blur:function(t){return e.$q.notify({message:"名称 blur notify"})}},model:{value:e.query.name,callback:function(t){e.$set(e.query,"name",t)},expression:"query.name"}}),a("coadmin-input",{ref:"input2",staticClass:"col-12 col-sm-6",attrs:{outlined:"","form-label":"calories",label:"标签"},scopedSlots:e._u([{key:"append",fn:function(){return[e.query.calories?a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"clear"},on:{click:function(t){e.query.calories=""}}}):a("q-icon",{attrs:{name:"search"}})]},proxy:!0},{key:"before",fn:function(){return[a("q-icon",{attrs:{name:"expand_less"}})]},proxy:!0},{key:"after",fn:function(){return[a("q-icon",{attrs:{name:"add"}})]},proxy:!0}],null,!0),model:{value:e.query.calories,callback:function(t){e.$set(e.query,"calories",t)},expression:"query.calories"}}),a("coadmin-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"fat","lazy-rules":"",rules:[function(e){return!!e||"不能空"},function(e){return 11===e.length||"请输入11个字符"}]},model:{value:e.query.fat,callback:function(t){e.$set(e.query,"fat",t)},expression:"query.fat"}}),a("coadmin-input",{ref:"input4",staticClass:"col-12 col-sm-6",attrs:{"form-label":"protein",filled:""},model:{value:e.query.protein,callback:function(t){e.$set(e.query,"protein",t)},expression:"query.protein"}}),a("coadmin-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"sodium",outlined:!1},model:{value:e.query.sodium,callback:function(t){e.$set(e.query,"sodium",t)},expression:"query.sodium"}}),a("coadmin-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"calcium",placeholder:"calcium"},model:{value:e.query.calcium,callback:function(t){e.$set(e.query,"calcium",t)},expression:"query.calcium"}},[a("q-popup-proxy",{attrs:{breakpoint:"0"}},[a("q-card",[a("div",[e._v("ThisisPopup")])])],1)],1),a("coadmin-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"iron",placeholder:"places","label-slot":"",clearable:""},scopedSlots:e._u([{key:"label",fn:function(){return[a("div",{staticStyle:{color:"red"}},[e._v("iron in slot")])]},proxy:!0}],null,!0),model:{value:e.query.iron,callback:function(t){e.$set(e.query,"iron",t)},expression:"query.iron"}}),a("coadmin-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"protein5",label:"选择",dense:"","options-dense":"",outlined:"","no-filter":"",options:e.mapOptions,"option-value":"id","option-label":"desc","option-disable":"inactive",clearable:"","emit-value":"","map-options":""},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"add"}})]},proxy:!0},{key:"after",fn:function(){return[a("q-icon",{attrs:{name:"menu"}})]},proxy:!0}],null,!0),model:{value:e.query.selectCompany,callback:function(t){e.$set(e.query,"selectCompany",t)},expression:"query.selectCompany"}}),a("coadmin-select",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"protein2",clearable:"","options-dense":"",outlined:"","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0",placeholder:"选择巨头",options:e.listOptions},scopedSlots:e._u([{key:"after",fn:function(){return[a("q-icon",{attrs:{name:"menu"}})]},proxy:!0}],null,!0),model:{value:e.query.selectCompany,callback:function(t){e.$set(e.query,"selectCompany",t)},expression:"query.selectCompany"}}),a("coadmin-field",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"options"},scopedSlots:e._u([{key:"control",fn:function(){return[a("div",{staticClass:"q-gutter-sm"},[a("q-radio",{attrs:{dense:"",name:"shape",val:"facebook",label:"Facebook"},model:{value:e.query.selectCompany,callback:function(t){e.$set(e.query,"selectCompany",t)},expression:"query.selectCompany"}}),a("q-radio",{attrs:{dense:"",name:"shape",val:"腾讯",label:"腾讯控股"},model:{value:e.query.selectCompany,callback:function(t){e.$set(e.query,"selectCompany",t)},expression:"query.selectCompany"}})],1)]},proxy:!0}],null,!0)}),a("coadmin-input",{staticClass:"col-12 col-sm-6",attrs:{"label-position":"right",mask:"####-##-##",placeholder:"####-##-##","form-label":"dateinput"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}})]},proxy:!0}],null,!0),model:{value:e.query.date,callback:function(t){e.$set(e.query,"date",t)},expression:"query.date"}},[a("q-popup-proxy",{ref:"popupDateinput"},[a("coadmin-date",{on:{input:function(t){return e.$refs.popupDateinput.hide()}},model:{value:e.query.date,callback:function(t){e.$set(e.query,"date",t)},expression:"query.date"}})],1)],1),a("coadmin-date-input",{staticClass:"col-12",attrs:{"form-label":"date2",placeholder:"日期范围选","range-separator":" 至 ",clearable:"",range:""},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"event"}})]},proxy:!0}],null,!0),model:{value:e.query.dateRange,callback:function(t){e.$set(e.query,"dateRange",t)},expression:"query.dateRange"}}),a("coadmin-date-input",{staticClass:"col-12 col-sm-6",attrs:{"form-label":"date3",placeholder:"日期单选"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"event"}})]},proxy:!0}],null,!0),model:{value:e.query.dateSingle,callback:function(t){e.$set(e.query,"dateSingle",t)},expression:"query.dateSingle"}})],1)])],1),a("q-card-actions",{attrs:{align:"center"}},[a("q-btn",{attrs:{label:"查询",type:"submit",color:"primary",icon:"search"},on:{click:e.doQuery}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"清空",flat:""}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"关闭",flat:""}})],1)],1)],1)],1)],1)]}},{key:"body-cell-name",fn:function(e){return[a("q-td",{attrs:{props:e}},[a("div",[a("q-badge",{attrs:{color:"purple",label:e.value}})],1)])]}},{key:"body-cell-action",fn:function(t){return[a("q-td",{attrs:{props:t}},[a("q-btn-dropdown",{attrs:{label:"",dense:"",flat:""}},[a("q-list",[a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(a){return e.rowViewClick(t.row)}}},[a("q-item-section",[a("q-item-label",[e._v("查看")])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(a){return e.rowEditClick(t.row)}}},[a("q-item-section",[a("q-item-label",[e._v("修改")])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(a){return e.rowDelClick(t.row)}}},[a("q-item-section",[a("q-item-label",[e._v("删除")])],1)],1),a("q-separator"),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",dense:""},on:{click:function(t){return e.rowLooooooongButtonClick()}}},[a("q-item-section",[a("q-item-label",[e._v("一个长长的按钮")])],1)],1)],1)],1)],1)]}},{key:"pagination",fn:function(){return[a("q-pagination",{attrs:{max:500,"direction-links":!0,"boundary-links":!1,input:"","input-class":"text-orange-10"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}}),a("q-select",{attrs:{dense:"","options-dense":"",borderless:"",flat:"",options:e.numberPerPageOptions,"emit-value":"","map-options":""},model:{value:e.numberPerPage,callback:function(t){e.numberPerPage=t},expression:"numberPerPage"}})]},proxy:!0}])})],1)},r=[],l=(a("a15b"),a("b64b"),a("486f")),i=a("5ec7"),o={name:"PageSearchPopup",data:function(){return{query:{name:"小明",selected:7,ticked:[7,49]},querySelectedLabel:"",queryTickedLabels:null,shape:"",selectModel:"",selectModels:[],selectDate:"",selectDateRange:{from:"2020-11-14",to:"2020-11-22"},listOptions:["facebook","twitter","google","阿里巴巴","腾讯"],mapOptions:[{id:"google",desc:"Google"},{id:"facebook",desc:"Facebook"},{id:"twitter",desc:"Twitter"},{id:"apple",desc:"苹果"},{id:"阿里巴巴",desc:"阿里巴巴集团"},{id:"oracle",desc:"Oracle",inactive:!0},{id:"腾讯",desc:"腾讯控股"}],currentPage:0,numberPerPage:10,numberPerPageOptions:[{label:"10/页",value:10},{label:"20/页",value:20},{label:"30/页",value:30},{label:"40/页",value:40},{label:"50/页",value:50},{label:"100/页",value:100}],loading:!1,fabPos:[48,68],draggingFab:!1,selected:[],tableFullscreen:null,visibleColumns:i["c"],columns:i["a"],data:i["b"]}},watch:{},created:function(){},mounted:function(){this.$refs.searchPopup.show(),this.$nextTick((function(){this.$refs.searchPopup.hide()}))},computed:{queryModel:{get:function(){for(var e=[],t=0,a=Object.keys(this.query);t<a.length;t++){var n=a[t];if("selected"===n)this.querySelectedLabel&&e.push(this.querySelectedLabel);else if("ticked"===n)this.queryTickedLabels&&e.push("["+this.queryTickedLabels.join(",")+"]");else if("dateRange"===n){var r=this.query[n];r&&e.push("["+r.join(",")+"]")}else{var l=this.query[n];l&&e.push(l)}}return e.join(", ")},set:function(e){if(!e){this.querySelectedLabel=null,this.queryTickedLabels=null;for(var t=0,a=Object.keys(this.query);t<a.length;t++){var n=a[t];this.query[n]=null}}}}},methods:{doQuery:function(){var e=this;this.loading=!0,setTimeout((function(){e.loading=!1}),1e3)},treeDatas:function(){return l["a"].content},rowLooooooongButtonClick:function(){this.$q.notify({type:"positive",message:"rowLooooooongButtonClick"})},moveFab:function(e){this.draggingFab=!0!==e.isFirst&&!0!==e.isFinal,this.fabPos=[this.fabPos[0]-e.delta.x,this.fabPos[1]-e.delta.y]},toggleTableFullscreen:function(e){var t=this;e.toggleFullscreen(),this.$nextTick((function(){console.log("tableFullscreen=",t.tableFullscreen)}))}}},s=o,c=a("2877"),d=a("9c40"),u=a("f20b"),m=a("2c91"),p=a("7cbe"),b=a("f09f"),f=a("a370"),h=a("0016"),y=a("3786"),q=a("4b7e"),C=a("eb85"),k=a("9564"),g=a("db86"),v=a("58a8"),L=a("1c1c"),w=a("66e5"),x=a("4074"),N=a("0170"),T=a("3b16"),j=a("ddd8"),D=a("7f67"),P=a("eebe"),S=a.n(P),$=Object(c["a"])(s,n,r,!1,null,null,null);t["default"]=$.exports;S()($,"components",{QBtn:d["a"],QBtnDropdown:u["a"],QSpace:m["a"],QPopupProxy:p["a"],QCard:b["a"],QCardSection:f["a"],QIcon:h["a"],QRadio:y["a"],QCardActions:q["a"],QSeparator:C["a"],QToggle:k["a"],QTd:g["a"],QBadge:v["a"],QList:L["a"],QItem:w["a"],QItemSection:x["a"],QItemLabel:N["a"],QPagination:T["a"],QSelect:j["a"]}),S()($,"directives",{ClosePopup:D["a"]})},"486f":function(e,t,a){"use strict";var n={content:[{header:"root",id:8,pid:0,name:"华北分部",nameLetter:"hbfb",deptCode:null,sort:1,enabled:!0,treeLeaf:!1,treeNames:"/华北分部",treeNamesLetter:"/hbfb",children:[{id:48,pid:8,name:"研发部",nameLetter:"yfb",deptCode:null,sort:3,enabled:!0,treeLeaf:!0,treeNames:"/华北分部/研发部",treeNamesLetter:"/hbfb/yfb",createTime:1604739557e3,label:"研发部",hasChildren:!1},{id:6,pid:8,name:"测试部",nameLetter:"csb",deptCode:null,sort:6,enabled:!0,treeLeaf:!0,treeNames:"/华北分部/测试部",treeNamesLetter:"/hbfb/csb",createTime:1553478738e3,label:"测试部",hasChildren:!1}],createTime:1553483093e3,label:"华北分部",hasChildren:!0},{header:"test",id:5,pid:0,name:"运维部",nameLetter:"ywb",deptCode:null,sort:3,enabled:!0,treeLeaf:!1,treeNames:"/运维部",treeNamesLetter:"/ywb",children:[{body:"new",id:19,pid:5,name:"运维一组",nameLetter:"ywyz",deptCode:null,sort:999,enabled:!0,treeLeaf:!0,treeNames:"/运维部/运维一组",treeNamesLetter:"/ywb/ywyz",createTime:1601979901e3,label:"运维一组",hasChildren:!1},{header:"test",body:"new",id:46,pid:5,name:"运维二组",nameLetter:"ywez",deptCode:null,sort:999,enabled:!0,treeLeaf:!0,treeNames:"/运维部/运维二组",treeNamesLetter:"/ywb/ywez",createTime:1604738778e3,label:"运维二组",hasChildren:!1}],createTime:1553476844e3,label:"运维部",hasChildren:!0},{id:7,pid:0,name:"华南分部",nameLetter:"hnfb",deptCode:null,sort:5,enabled:!0,treeLeaf:!1,treeNames:"/华南分部",treeNamesLetter:"/hnfb",children:[{id:21,pid:7,name:"华南之家",nameLetter:"hnzj",deptCode:null,sort:1,enabled:!0,treeLeaf:!1,treeNames:"/华南分部/华南之家",treeNamesLetter:"hnfbhnzj",children:[{id:34,pid:21,name:"华南之家1",nameLetter:"hnzj1",deptCode:null,sort:2,enabled:!0,treeLeaf:!0,treeNames:"/华南分部/华南之家/华南之家1",treeNamesLetter:"/hnfb/hnzj/hnzj1",createTime:1602243844e3,label:"华南之家1",hasChildren:!1},{id:42,pid:21,name:"华南之家2",nameLetter:"hnzj2",deptCode:null,sort:3,enabled:!0,treeLeaf:!0,treeNames:"/华南分部/华南之家/华南之家2",treeNamesLetter:"/hnfb/hnzj/hnzj2",createTime:1604737459e3,label:"华南之家2",hasChildren:!1},{id:43,pid:21,name:"华南之家3",nameLetter:"hnzj3",deptCode:null,sort:4,enabled:!0,treeLeaf:!0,treeNames:"/华南分部/华南之家/华南之家3",treeNamesLetter:"/hnfb/hnzj/hnzj3",createTime:1604737471e3,label:"华南之家3",hasChildren:!1}],createTime:1602118877e3,label:"华南之家",hasChildren:!0},{id:33,pid:7,name:"华南2",nameLetter:"hn2",deptCode:null,sort:999,enabled:!0,treeLeaf:!0,treeNames:"/华南分部/华南2",treeNamesLetter:"hnfbhn2",createTime:1602243765e3,label:"华南2",hasChildren:!1},{id:39,pid:7,name:"华南之家5",nameLetter:"hnzj5",deptCode:null,sort:999,enabled:!0,treeLeaf:!1,treeNames:"/华南分部/华南之家5",treeNamesLetter:"/hnfb/hnzj5",children:[{id:45,pid:39,name:"华南之家5.2",nameLetter:"hnzj52",deptCode:null,sort:3,enabled:!0,treeLeaf:!0,treeNames:"/华南分部/华南之家5/华南之家5.2",treeNamesLetter:"/hnfb/hnzj5/hnzj52",createTime:1604737518e3,label:"华南之家5.2",hasChildren:!1},{id:44,pid:39,name:"华南之家5.1",nameLetter:"hnzj51",deptCode:null,sort:999,enabled:!0,treeLeaf:!0,treeNames:"/华南分部/华南之家5/华南之家5.1",treeNamesLetter:"/hnfb/hnzj5/hnzj51",createTime:1604737509e3,label:"华南之家5.1",hasChildren:!1}],createTime:1604736969e3,label:"华南之家5",hasChildren:!0}],createTime:155348309e4,label:"华南分部",hasChildren:!0},{id:41,pid:0,name:"西南",nameLetter:"xn",deptCode:null,sort:333,enabled:!0,treeLeaf:!1,treeNames:"/西南",treeNamesLetter:"/xn",children:[{id:50,pid:41,name:"财务部",nameLetter:"cwb",deptCode:null,sort:999,enabled:!0,treeLeaf:!0,treeNames:"/西南/财务部",treeNamesLetter:"/xn/cwb",createTime:1604742957e3,label:"财务部",hasChildren:!1},{id:51,pid:41,name:"商务部",nameLetter:"swb",deptCode:null,sort:999,enabled:!0,treeLeaf:!0,treeNames:"/西南/商务部",treeNamesLetter:"/xn/swb",createTime:1604742972e3,label:"商务部",hasChildren:!1}],createTime:1604737063e3,label:"西南",hasChildren:!0},{id:49,pid:0,name:"西北",nameLetter:"xb",deptCode:null,sort:444,enabled:!0,treeLeaf:!0,treeNames:"/西北",treeNamesLetter:"/xb",createTime:1604742657e3,label:"西北",hasChildren:!1},{id:40,pid:0,name:"华东",nameLetter:"hd",deptCode:null,sort:555,enabled:!0,treeLeaf:!0,treeNames:"/华东",treeNamesLetter:"/hd",createTime:1604737027e3,label:"华东",hasChildren:!1},{id:35,pid:0,name:"东北公司",nameLetter:"dbgs",deptCode:null,sort:999,enabled:!0,treeLeaf:!1,treeNames:"/东北公司",treeNamesLetter:"dbgs",children:[{id:36,pid:35,name:"吉林",nameLetter:"jl",deptCode:null,sort:5,enabled:!0,treeLeaf:!1,treeNames:"/东北公司/吉林",treeNamesLetter:"/dbgs/jl",children:[{id:37,pid:36,name:"运维部吉林",nameLetter:"ywbjl",deptCode:null,sort:333,enabled:!0,treeLeaf:!0,treeNames:"/东北公司/吉林/运维部吉林",treeNamesLetter:"/dbgs/jl/ywbjl",createTime:1602244738e3,label:"运维部吉林",hasChildren:!1},{id:38,pid:36,name:"财务部吉林",nameLetter:"cwbjl",deptCode:null,sort:999,enabled:!0,treeLeaf:!0,treeNames:"/东北公司/吉林/财务部吉林",treeNamesLetter:"/dbgs/jl/cwbjl",createTime:1602246696e3,label:"财务部吉林",hasChildren:!1}],createTime:1602244518e3,label:"吉林",hasChildren:!0}],createTime:1602244365e3,label:"东北公司",hasChildren:!0}],totalElements:7};t["a"]=n},"5ec7":function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return l}));var n=["id","name","calories","fat","protein","sodium","calcium","iron","action"],r=[{name:"id",label:"ID",field:"id"},{name:"name",field:"name",required:!0,label:"名称",align:"left",format:function(e){return"".concat(e)},sortable:!0},{name:"calories",align:"center",label:"Calories",field:"calories",sortable:!0},{name:"fat",label:"Fat (g)",field:function(e){return e.fat},sortable:!0},{name:"carbs",label:"Carbs (g)",field:"carbs"},{name:"protein",label:"Protein (g)",field:"protein"},{name:"sodium",label:"Sodium (mg)",field:"sodium"},{name:"calcium",label:"Calcium (%)",field:"calcium",sortable:!0,sort:function(e,t){return parseInt(e,10)-parseInt(t,10)}},{name:"iron",label:"Iron (%)",field:"iron",sortable:!0,sort:function(e,t){return parseInt(e,10)-parseInt(t,10)}},{name:"iron1",label:"Iron1 (%)",field:"iron1"},{name:"iron2",label:"Iron2 (%)",field:"iron2"},{name:"iron3",label:"Iron3 (%)",field:"iron3"},{name:"iron4",label:"Iron4 (%)",field:"iron4"},{name:"iron5",label:"Iron5 (%)",field:"iron5"},{name:"iron6",label:"Iron6 (%)",field:"iron6"},{name:"iron7",label:"Iron7 (%)",field:"iron7"},{name:"iron8",label:"Iron8 (%)",field:"iron8"},{name:"iron9",label:"Iron9 (%)",field:"iron9"},{name:"action",label:"操作",align:"center"}],l=[{id:1,name:"冰棍",calories:159,fat:6,carbs:24,protein:4,sodium:87,calcium:"14%",iron:"1%"},{id:2,name:"冰淇淋",calories:237,fat:9,carbs:37,protein:4.3,sodium:129,calcium:"8%",iron:"1%长长的一个数据"},{id:3,name:"Eclair",calories:262,fat:16,carbs:23,protein:6,sodium:337,calcium:"6%",iron:"7%"},{id:4,name:"Cupcake",calories:305,fat:3.7,carbs:67,protein:4.3,sodium:413,calcium:"3%",iron:"8%"},{id:5,name:"Gingerbread",calories:356,fat:16,carbs:49,protein:3.9,sodium:327,calcium:"7%",iron:"16%"},{id:6,name:"Jelly bean",calories:375,fat:0,carbs:94,protein:0,sodium:50,calcium:"0%",iron:"0%"},{id:10,name:"Lollipop",calories:392,fat:.2,carbs:98,protein:0,sodium:38,calcium:"0%",iron:"2%"},{id:20,name:"Honeycomb",calories:408,fat:3.2,carbs:87,protein:6.5,sodium:562,calcium:"0%",iron:"45%"},{id:30,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:40,name:"KitKat",calories:518,fat:26,carbs:65,protein:7,sodium:54,calcium:"12%",iron:"6%"},{id:1e3,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1001,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1002,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1003,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1004,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1005,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1006,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1007,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1008,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1009,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1010,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1011,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1012,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1013,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1014,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1015,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1016,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1017,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1018,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1019,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{id:1020,name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"}]}}]);
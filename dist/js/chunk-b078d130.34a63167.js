(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b078d130"],{"0e39":function(t,e,i){"use strict";var a=i("833c"),l=i.n(a);l.a},"21dc":function(t,e,i){},2301:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"filter-checkbox clearfix"},[i("ul",t._l(t.lists,function(e){return i("li",{key:e.id,class:{active:e.id==t.value},style:{marginBottom:t.bottom,marginRight:t.right},on:{click:function(i){t.select(e.id)}}},[t._v(t._s(e.name))])}),0)])},l=[],s={name:"filter-checkbox",props:{lists:{default:[]},bottom:{default:"10px"},right:{default:"10px"},value:{default:""}},data:function(){return{result:""}},mounted:function(){this.result=this.value},methods:{select:function(t){this.$emit("input",t),this.$emit("change",t)}}},n=s,o=(i("b444"),i("c46c")),c=Object(o["a"])(n,a,l,!1,null,"bbabf2da",null);c.options.__file="FilterCheckbox.vue";e["a"]=c.exports},3343:function(t,e,i){},"35a2":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"selected"},[a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"menu-title"},[t._v(t._s(this.$route.meta.title))])]),a("el-col",{attrs:{span:12}},[a("el-button",{staticClass:"button-mini pull-right",staticStyle:{"min-width":"98px","line-height":"30px"},attrs:{type:"primary"},on:{click:function(e){t.addVisiable=!t.addVisiable}}},[t._v("创建人群")])],1)],1),a("div",{staticClass:"innerbox"},[a("el-row",{staticClass:"clearfix",staticStyle:{"margin-bottom":"20px"}},[a("el-input",{staticClass:"pull-left",staticStyle:{width:"322px","margin-right":"30px"},attrs:{placeholder:"请输入搜索内容"}}),a("el-button",{staticClass:"button-max pull-left",staticStyle:{"line-height":"38px"}},[t._v("确认")]),a("el-button",{staticClass:"button-max pull-left",staticStyle:{"line-height":"38px"}},[t._v("取消")])],1),a("el-row",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"header-row-class-name":"table-header"}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{prop:"name",label:"人群名称"}}),a("el-table-column",{attrs:{prop:"describe",label:"人群描述"}}),a("el-table-column",{attrs:{prop:"mode",label:"创建方式"}}),a("el-table-column",{attrs:{prop:"type",label:"类型"}}),a("el-table-column",{attrs:{prop:"number",label:"包含人数"}}),a("el-table-column",{attrs:{prop:"time",label:"创建时间"}}),a("el-table-column",{attrs:{width:"250",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{color:"#4ebd9f",margin:"0 30px 0 0"},attrs:{type:"text",size:"small"},on:{click:function(i){t.edit(e.row)}}},[t._v("\n                          编辑\n                          ")]),a("el-button",{staticStyle:{color:"#de9f1f",margin:"0 30px 0 0"},attrs:{type:"text",size:"small"},on:{click:function(i){t.insight(e.row)}}},[t._v("\n                          洞察\n                          ")]),a("el-button",{staticStyle:{color:"#1f93ff",margin:"0 30px 0 0"},attrs:{type:"text",size:"small"},on:{click:function(i){t.exportPackage(e.row)}}},[t._v("\n                          导出\n                          ")]),a("el-button",{staticStyle:{color:"#f78484",margin:"0 30px 0 0"},attrs:{type:"text",size:"small"},on:{click:function(i){t.deletePackage(e.row)}}},[t._v("\n                          删除\n                          ")])]}}])}),a("div",{attrs:{slot:"empty"},slot:"empty"},[a("img",{staticStyle:{"margin-top":"90px"},attrs:{src:i("ff5b"),alt:""}}),a("div",{staticStyle:{margin:"25px 0 90px","font-size":"14px",color:"#575759"}},[t._v("还未创建人群列表")])])],1),a("div",[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[10,50,100,200],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1),a("check-dialog",{attrs:{visiable:t.checkVisiable},on:{checkConfirm:t.checkConfirm,"update:visiable":function(e){t.checkVisiable=e}}}),a("add-dialog",{attrs:{visiable:t.addVisiable},on:{addConfirm:t.addConfirm,"update:visiable":function(e){t.addVisiable=e}}}),a("edit-dialog",{attrs:{currentRow:t.currentRow,visiable:t.editVisiable},on:{updateTable:t.updateTable,"update:visiable":function(e){t.editVisiable=e}}}),a("insight-dialog",{attrs:{visiable:t.insightVisiable},on:{"update:visiable":function(e){t.insightVisiable=e}}}),a("export-package",{attrs:{visiable:t.packageDialogVisiable},on:{"update:visiable":function(e){t.packageDialogVisiable=e}}}),a("delete-dialog",{attrs:{currentRow:t.currentRow,visiable:t.deleteVisiable},on:{updateTable:t.updateTable,"update:visiable":function(e){t.deleteVisiable=e}}})],1)},l=[],s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"check-dialog"},[i("el-dialog",{attrs:{title:"创建人群",top:"30vh",visible:t.visiable,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.visiable=e}}},[i("div",{staticClass:"text"},[t._v("\n            所上传人群包中包含的人数： "),i("span",{staticClass:"em"},[t._v("60000人")])]),i("div",{staticClass:"text"},[t._v("\n            可创建人群包人数： "),i("span",{staticClass:"em"},[t._v("40000人")])]),i("el-button",{staticClass:"button-mini",staticStyle:{"margin-top":"30px","min-width":"98px"},attrs:{type:"primary"},on:{click:t.confirm}},[t._v("\n            创建\n        ")])],1)],1)},n=[],o={name:"check-dialog",components:{},props:{visiable:{default:!1}},data:function(){return{}},mounted:function(){console.log(this.visiable)},methods:{handleClose:function(){this.$emit("update:visiable",!1)},confirm:function(){this.$emit("checkConfirm")}}},c=o,r=(i("54ca"),i("c46c")),d=Object(r["a"])(c,s,n,!1,null,"f262b840",null);d.options.__file="CheckDialog.vue";var u=d.exports,p=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"add-dialog"},[i("el-dialog",{attrs:{title:"创建人群",top:"30vh",visible:t.visiable,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.visiable=e}}},[i("el-input",{staticStyle:{"margin-top":"15px"},attrs:{maxlength:"10",placeholder:"请输入人群标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}},[i("span",{staticStyle:{"line-height":"34px"},attrs:{slot:"suffix"},slot:"suffix"},[t._v(t._s(t.title.length)+"/10")])]),i("div",{staticStyle:{position:"relative"}},[i("el-input",{staticStyle:{"margin-top":"20px"},attrs:{type:"textarea",placeholder:"请输入人群描述",resize:"none",maxlength:"50",rows:3},model:{value:t.detail,callback:function(e){t.detail=e},expression:"detail"}}),i("span",{staticClass:"text-length"},[t._v(t._s(t.detail.length)+"/50")])],1),i("div",{staticClass:"title-tips"},[t._v("选择人群包类型")]),i("filter-checkbox",{attrs:{lists:t.typeLists,right:"20px"}}),i("div",{staticClass:"title-tips"},[t._v("\n            EXCEL表格形式，大小不超过***\n            "),i("span",{staticStyle:{color:"#1790ff","margin-left":"10px"}},[t._v("下载模版示例")])]),i("div",{staticClass:"upload"},[i("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"packageUpload"},on:{change:t.uploadFile}}),i("label",{attrs:{for:"packageUpload"}},[i("span",{staticStyle:{"margin-right":"10px","font-size":"14px"}},[t._v("+")]),t._v(" 点击上传人群包")])]),i("div",{staticClass:"flex-b",staticStyle:{"align-items":"center"}},[i("div",{staticClass:"process-bar"},[i("div",{staticClass:"inner-bar",style:{width:t.process+"%"}})]),i("div",{staticClass:"process-text"},[t._v("\n                "+t._s(t.process)+"%\n            ")])]),i("el-button",{staticClass:"button-mini",staticStyle:{"margin-top":"30px","min-width":"98px"},attrs:{type:"primary"},on:{click:t.confirm}},[t._v("\n            确定\n        ")])],1)],1)},h=[],f=(i("ff66"),i("ea23"),i("dbff"),i("2301")),b={name:"add-dialog",components:{FilterCheckbox:f["a"]},props:{visiable:{default:!1}},data:function(){return{title:"",detail:"",typeLists:[{name:"用户ID",id:"1"},{name:"手机号码",id:"2"}],is_uploading:!1,process:"0"}},mounted:function(){console.log(this.visiable),setInterval(function(){},100)},methods:{handleClose:function(){this.$emit("update:visiable",!1)},uploadFile:function(t){var e=t.target.files[0],i=new FormData;i.append("myFile",e)},confirm:function(){this.$emit("addConfirm","haha")}}},v=b,m=(i("9533"),Object(r["a"])(v,p,h,!1,null,"aa73b4bc",null));m.options.__file="AddDialog.vue";var g=m.exports,x=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"edit-dialog"},[i("el-dialog",{attrs:{title:"创建人群",top:"30vh",visible:t.visiable,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.visiable=e}}},[i("el-input",{staticStyle:{"margin-top":"15px"},attrs:{maxlength:"10",placeholder:"请输入人群标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}},[i("span",{staticStyle:{"line-height":"34px"},attrs:{slot:"suffix"},slot:"suffix"},[t._v(t._s(t.title.length)+"/10")])]),i("div",{staticStyle:{position:"relative"}},[i("el-input",{staticStyle:{"margin-top":"20px"},attrs:{type:"textarea",placeholder:"请输入人群描述",resize:"none",maxlength:"50",rows:3},model:{value:t.detail,callback:function(e){t.detail=e},expression:"detail"}}),i("span",{staticClass:"text-length"},[t._v(t._s(t.detail.length)+"/50")])],1),i("el-button",{staticClass:"button-mini",staticStyle:{"margin-top":"30px","min-width":"98px"},attrs:{type:"primary"},on:{click:t.confirm}},[t._v("\n            确定\n        ")])],1)],1)},C=[],_=(i("c839"),{name:"edit-dialog",components:{},props:{visiable:{default:!1},currentRow:{type:Object,default:function(){return{}}}},data:function(){return{title:"",detail:"",loading:!1}},watch:{currentRow:function(){this.currentRow.name||(this.currentRow.name=""),this.currentRow.describe||(this.currentRow.describe=""),this.title=this.currentRow.name,this.detail=this.currentRow.describe}},mounted:function(){},methods:{handleClose:function(){this.$emit("update:visiable",!1)},confirm:function(){var t=this;this.title&&this.detail?this.$http.post("/api/Crowdchoose/edit",{name:this.title,describe:this.detail,id:this.currentRow.id},{loading:this}).then(function(){t.$message.success("修改成功"),t.$emit("update:visiable",!1),t.$emit("updateTable")}):this.$message.warning("请完善填写内容")}}}),y=_,k=(i("cc720"),Object(r["a"])(y,x,C,!1,null,"2c4b76e3",null));k.options.__file="EditDialog.vue";var w=k.exports,S=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"edit-dialog"},[i("el-dialog",{attrs:{title:"创建人群",top:"15vh",visible:t.visiable,width:"86%","before-close":t.handleClose},on:{"update:visible":function(e){t.visiable=e}}},[i("active-user")],1)],1)},$=[],V=i("8fb9"),D={name:"edit-dialog",components:{ActiveUser:V["a"]},props:{visiable:{default:!1}},data:function(){return{}},mounted:function(){},methods:{handleClose:function(){this.$emit("update:visiable",!1)},confirm:function(){}}},z=D,R=(i("e1ee"),Object(r["a"])(z,S,$,!1,null,"f501cf62",null));R.options.__file="InsightDialog.vue";var I=R.exports,F=i("e723"),P=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"edit-dialog"},[i("el-dialog",{attrs:{title:"创建人群",top:"30vh",visible:t.visiable,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.visiable=e}}},[i("div",{staticStyle:{"line-height":"60px"}},[t._v("你确定要删除吗")]),i("div",[i("el-button",{staticClass:"button-mini",attrs:{type:"primary"},on:{click:t.confirm}},[t._v("\n                确定\n            ")]),i("el-button",{staticClass:"button-mini",on:{click:t.handleClose}},[t._v("\n                取消\n            ")])],1)])],1)},E=[],A={name:"edit-dialog",components:{},props:{visiable:{default:!1},currentRow:{type:Object,default:function(){return{}}}},data:function(){return{}},mounted:function(){},methods:{handleClose:function(){this.$emit("update:visiable",!1)},confirm:function(){var t=this;this.$http.post("/api/Crowdchoose/del",{id:this.currentRow.id},{loading:this}).then(function(){t.$message.success("删除成功"),t.$emit("update:visiable",!1),t.$emit("updateTable")})}}},j=A,O=(i("404a"),Object(r["a"])(j,P,E,!1,null,"0a44eb67",null));O.options.__file="DeleteDialog.vue";var L=O.exports,T={name:"selected",components:{CheckDialog:u,AddDialog:g,EditDialog:w,InsightDialog:I,ExportPackage:F["a"],DeleteDialog:L},data:function(){return{loading:!0,tableData:[],page:1,pageSize:10,total:0,checkVisiable:!1,addVisiable:!1,editVisiable:!1,insightVisiable:!1,packageDialogVisiable:!1,deleteVisiable:!1,currentRow:{}}},mounted:function(){this.getList()},methods:{handleSizeChange:function(t){this.pageSize=t,this.getList()},handleCurrentChange:function(t){this.page=t,this.getList()},add:function(){},insight:function(){this.insightVisiable=!0},edit:function(t){this.editVisiable=!0,this.currentRow=t},exportPackage:function(){this.packageDialogVisiable=!0},deletePackage:function(t){this.deleteVisiable=!0,this.currentRow=t},addConfirm:function(t){this.checkVisiable=!0,this.addVisiable=!1},checkConfirm:function(){this.checkVisiable=!1},updateTable:function(){this.getList()},getList:function(){var t=this;this.$http.post("/api/Crowdchoose/getCrowdChooselist",{page:this.page,pageSize:this.pageSize},{loading:this}).then(function(e){t.tableData=e.data.list,t.total=e.data.searchTotal})}}},U=T,J=(i("7d26"),Object(r["a"])(U,a,l,!1,null,"62da109e",null));J.options.__file="Selected.vue";e["default"]=J.exports},"404a":function(t,e,i){"use strict";var a=i("3343"),l=i.n(a);l.a},4713:function(t,e,i){},"54ca":function(t,e,i){"use strict";var a=i("937c"),l=i.n(a);l.a},"7d26":function(t,e,i){"use strict";var a=i("a13d"),l=i.n(a);l.a},"7fb2":function(t,e,i){},"833c":function(t,e,i){},"937c":function(t,e,i){},9533:function(t,e,i){"use strict";var a=i("7fb2"),l=i.n(a);l.a},a13d:function(t,e,i){},b444:function(t,e,i){"use strict";var a=i("4713"),l=i.n(a);l.a},cc720:function(t,e,i){"use strict";var a=i("21dc"),l=i.n(a);l.a},e1ee:function(t,e,i){"use strict";var a=i("f763"),l=i.n(a);l.a},e723:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"export-package"},[i("el-dialog",{attrs:{title:"导出人群包",top:"30vh",visible:t.visiable,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.visiable=e}}},[i("div",[t._v("请选择导出形式")]),i("div",{staticClass:"mode-style"},[i("el-checkbox",{on:{change:t.handleIsAPIChange},model:{value:t.isAPI,callback:function(e){t.isAPI=e},expression:"isAPI"}}),i("span",{staticStyle:{"margin-left":"5px"}},[t._v("API形式")])],1),t.isAPI?i("div",[i("div",{staticClass:"tips"},[t._v("选择要导入的人群包类型")]),i("filterCheckbox",{attrs:{lists:t.list}})],1):t._e(),i("div",{staticClass:"mode-style"},[i("el-checkbox",{on:{change:t.handleIsFileChange},model:{value:t.isFile,callback:function(e){t.isFile=e},expression:"isFile"}}),i("span",{staticStyle:{"margin-left":"5px"}},[t._v("文件形式")])],1),t.isFile?i("div",[i("div",{staticClass:"tips"},[t._v("选择要导入的人群包类型")]),i("filterCheckbox",{attrs:{lists:t.list}})],1):t._e(),i("div",{staticStyle:{"margin-top":"30px"}},[i("el-button",{staticClass:"button-mini",staticStyle:{"min-width":"98px"},attrs:{type:"primary"}},[t._v("导出")]),i("span",{staticStyle:{"margin-left":"20px",color:"#9fa1a7","font-size":"12px","line-height":"12px","vertical-align":"bottom"}},[t._v("人群数量： 10000人")])],1)])],1)},l=[],s=i("2301"),n={name:"export-package",components:{FilterCheckbox:s["a"]},props:{visiable:{default:!1}},data:function(){return{isAPI:!0,isFile:!1,list:[{name:"用户ID",id:"1"},{name:"手机号码",id:"2"}]}},mounted:function(){},methods:{handleClose:function(){this.$emit("update:visiable",!1)},handleIsAPIChange:function(t){this.isFile=!t},handleIsFileChange:function(t){this.isAPI=!t}}},o=n,c=(i("0e39"),i("c46c")),r=Object(c["a"])(o,a,l,!1,null,"5985021a",null);r.options.__file="ExportPackage.vue";e["a"]=r.exports},f763:function(t,e,i){},ff5b:function(t,e,i){t.exports=i.p+"img/no-vip.20578adb.png"}}]);
//# sourceMappingURL=chunk-b078d130.34a63167.js.map
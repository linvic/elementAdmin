webpackJsonp([9],{Mo4A:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("3SZ7"),s=a.n(o),i={data:function(){return{form:{parent_id:"",module_name:"",module_code:"",module_type:0,sort_order:"",img_path:"el-icon",location:"/",status:"1",authen_type:"1",is_show:"1"},form_rules:{module_name:[{required:!0,message:"请输入模块名称",trigger:"blur"}],module_code:[{required:!0,message:"请输入模块编号",trigger:"blur"}],sort_order:[{required:!0,message:"模块排序不能为空",trigger:"blur"}],img_path:[{required:!0,message:"模块图标不能为空",trigger:"blur"}],location:[{required:!0,message:"模块路径不能为空",trigger:"blur"}]},optionsValue:[],options:[],optionsProps:{value:"id",label:"text",children:"children"}}},props:{id:{type:Number}},created:function(){this.getDataTree()},methods:{remoteMethod:function(e){var t=this;""!==e&&this.$https.get("/api/Account/page_users_seach_user_account_name?currentPage=1&pageSize=10&keyword="+e).then(function(e){0==e.data.code?t.userlists=e.data.data.Items:t.$message({type:"error",showClose:!0,message:e.data.message})})},getDataTree:function(){var e=this;this.$https.get("/api/company_role/list_module?status=1&parent_id=0").then(function(t){0==t.data.code?(e.options=t.data.data,e.id&&e.getOldData()):e.$message({type:"error",showClose:!0,message:t.data.message})})},getOldData:function(){var e=this;this.$https.get("/api/company_role/get_moduledetails?module_id="+this.id).then(function(t){if(0==t.data.code){var a=t.data.data;e.form.parent_id=0==a.parent_id?"":a.parent_id,e.optionsValue=e.getTreeDeepArr(e.form.parent_id,e.options),e.form.module_name=a.module_name,e.form.module_code=a.module_code,e.form.sort_order=a.sort_order,e.form.img_path=a.img_path,e.form.location=a.location,e.form.status=a.status.toString(),e.form.is_show=a.is_show?"1":"0",e.form.authen_type=a.authen_type.toString()}else e.$message({type:"error",showClose:!0,message:t.data.message})})},submit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return console.error("验证失败"),!1;var a=JSON.parse(s()(e.form));a.parent_id=e.form.parent_id&&""!=e.form.parent_id?e.form.parent_id:0,a.is_show=Number(a.is_show),a.authen_type=Number(a.authen_type),a.status=Number(a.status),e.id?(a.module_id=parseInt(e.id),e.$https.post("/api/company_role/update_module",a).then(function(t){0==t.data.code?e.$message({type:"success",showClose:!0,message:"编辑成功",duration:1500,onClose:function(){e.closeDialog("dialogPowerEdit"),e.$emit("parentGetDataList")}}):e.$message({type:"error",showClose:!0,message:t.data.message})})):e.$https.post("/api/company_role/create_module",a).then(function(t){0==t.data.code?e.$message({type:"success",showClose:!0,message:"添加成功",duration:1500,onClose:function(){e.closeDialog("dialogPowerAdd"),e.$emit("parentGetDataList")}}):e.$message({type:"error",showClose:!0,message:t.data.message})})})},closeDialog:function(e){e?this.$emit("closeDialog",e):(this.$emit("closeDialog","dialogPowerAdd"),this.$emit("closeDialog","dialogPowerEdit"))},cascaderChange:function(e){this.form.parent_id=e[e.length-1]},getTreeDeepArr:function(e,t){var a=[],o=[],s=0;return function t(i,r){for(var l=0;l<i.length;l++){if(s=r,a[r]=i[l].id,i[l].id==e){o=a.slice(0,r+1);break}i[l].children&&(s++,t(i[l].children,s))}return o}(t,s)}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{ref:"form",attrs:{"status-icon":"",rules:e.form_rules,model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"父级："}},[a("el-cascader",{attrs:{options:e.options,props:e.optionsProps,"show-all-levels":!1,"change-on-select":"",clearable:""},on:{change:e.cascaderChange},model:{value:e.optionsValue,callback:function(t){e.optionsValue=t},expression:"optionsValue"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"功能名称：",prop:"module_name"}},[a("el-input",{model:{value:e.form.module_name,callback:function(t){e.$set(e.form,"module_name",t)},expression:"form.module_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"功能编号：",prop:"module_code"}},[a("el-input",{model:{value:e.form.module_code,callback:function(t){e.$set(e.form,"module_code",t)},expression:"form.module_code"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"排序：",prop:"sort_order"}},[a("el-input",{attrs:{type:"number"},model:{value:e.form.sort_order,callback:function(t){e.$set(e.form,"sort_order",t)},expression:"form.sort_order"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"模块图标：",prop:"img_path"}},[a("el-input",{model:{value:e.form.img_path,callback:function(t){e.$set(e.form,"img_path",t)},expression:"form.img_path"}},[a("template",{slot:"append"},[a("a",{staticStyle:{color:"#409EFF"},attrs:{href:"/static/font/ElWebIcon/demo_fontclass.html",target:"_blank"}},[e._v("图标库")])])],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"模块路径：",prop:"location"}},[a("el-input",{model:{value:e.form.location,callback:function(t){e.$set(e.form,"location",t)},expression:"form.location"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否显示："}},[a("el-switch",{attrs:{"active-value":"1","inactive-value":"0"},model:{value:e.form.is_show,callback:function(t){e.$set(e.form,"is_show",t)},expression:"form.is_show"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否认证："}},[a("el-switch",{attrs:{"active-value":"1","inactive-value":"0"},model:{value:e.form.authen_type,callback:function(t){e.$set(e.form,"authen_type",t)},expression:"form.authen_type"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否启用："}},[a("el-switch",{attrs:{"active-value":"1","inactive-value":"0"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注："}},[a("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.form.unit_desc,callback:function(t){e.$set(e.form,"unit_desc",t)},expression:"form.unit_desc"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submit()}}},[e._v("保存")]),e._v(" "),a("el-button",{on:{click:function(t){e.closeDialog()}}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]};var l={components:{StructureAdd:a("Aizv")(i,r,!1,function(e){a("tv5P")},"data-v-05b494de",null).exports},data:function(){return{editId:null,treeData:[],defaultProps:{children:"children",label:"label",code:"code"},dialogPowerAdd:!1,dialogPowerEdit:!1}},created:function(){this.getDataList()},methods:{getDataList:function(){var e=this;this.$https.get("/api/company_role/list_module?status=999&parent_id=0").then(function(t){0==t.data.code?e.treeData=t.data.data:e.$message({type:"error",showClose:!0,message:t.data.message})})},itemEdit:function(e){this.editId=Number(e),this.dialogPowerEdit=!0},closeDialog:function(e){this[e]=!1},changeState:function(e,t){var a=this;this.$https.post("/api/company_role/update_module_status",{module_id:e,status:t?1:0}).then(function(e){if(0==e.data.code){var o=t?"启用成功":"禁用成功";a.$message({type:"success",showClose:!0,message:o,duration:1500,onClose:function(){a.getDataList()}})}else a.$message({type:"error",showClose:!0,message:e.data.message})})}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dictype"},[a("el-card",{staticStyle:{"min-width":"800px"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("功能配置")]),e._v(" "),a("el-button-group",{staticStyle:{float:"right"}},[a("el-button",{attrs:{icon:"el-icon-refresh",size:"mini",plain:"",onclick:"window.location.reload()"}},[e._v("刷新")]),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-circle-plus-outline",size:"mini"},on:{click:function(t){e.dialogPowerAdd=!0}}},[e._v("新增")])],1)],1),e._v(" "),a("table",{staticClass:"el-table el-table__header",attrs:{cellspacing:"0",cellpadding:"0",border:"0",width:"100%"}},[a("thead",{staticClass:"has-gutter"},[a("tr",[a("th",{staticClass:"cell"},[e._v("功能名称")]),e._v(" "),a("th",{attrs:{width:"120px"}},[e._v("功能代码")]),e._v(" "),a("th",{attrs:{width:"250px"}},[e._v("路径")]),e._v(" "),a("th",{attrs:{width:"200px"}},[e._v("操作")])])])]),e._v(" "),a("el-tree",{ref:"tree",staticClass:"filter-tree",attrs:{data:e.treeData,props:e.defaultProps,"default-expand-all":"","expand-on-click-node":!1},scopedSlots:e._u([{key:"default",fn:function(t){t.node;var o=t.data;return a("div",{staticClass:"custom-tree-node"},[a("div",[e._v(e._s(o.text))]),e._v(" "),a("div",[a("div",{staticClass:"custom-tree-node-item",staticStyle:{width:"120px"}},[e._v(e._s(o.value||" "))]),e._v(" "),a("div",{staticClass:"custom-tree-node-item",staticStyle:{width:"250px"}},[e._v(e._s(o.attrValue||" "))]),e._v(" "),a("div",{staticClass:"custom-tree-node-item",staticStyle:{width:"200px"}},["1"===o.title?a("el-button",{attrs:{size:"mini",plain:""},on:{click:function(t){e.changeState(o.id,!1)}}},[e._v("禁用")]):a("el-button",{attrs:{size:"mini",plain:""},on:{click:function(t){e.changeState(o.id,!0)}}},[e._v("启用")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){e.itemEdit(o.id)}}},[e._v("编辑")])],1)])])}}])})],1),e._v(" "),e.dialogPowerAdd?a("el-dialog",{attrs:{title:"新增功能",visible:e.dialogPowerAdd,"append-to-body":"",width:"800px"},on:{"update:visible":function(t){e.dialogPowerAdd=t}}},[a("StructureAdd",{on:{closeDialog:e.closeDialog,parentGetDataList:e.getDataList}})],1):e._e(),e._v(" "),e.dialogPowerEdit?a("el-dialog",{attrs:{title:"编辑功能",visible:e.dialogPowerEdit,"append-to-body":"",width:"800px"},on:{"update:visible":function(t){e.dialogPowerEdit=t}}},[a("StructureAdd",{attrs:{id:e.editId},on:{closeDialog:e.closeDialog,parentGetDataList:e.getDataList}})],1):e._e()],1)},staticRenderFns:[]};var d=a("Aizv")(l,n,!1,function(e){a("k4eA")},"data-v-61d01995",null);t.default=d.exports},k4eA:function(e,t){},tv5P:function(e,t){}});
//# sourceMappingURL=9.84e8f767b615d7f1cc8a.js.map
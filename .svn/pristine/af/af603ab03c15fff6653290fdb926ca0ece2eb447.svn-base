<template>
	<div class="sidebar">
		<el-menu class="site-menu" text-color="#a3afb7" active-text-color="#ffffff" background-color="#263238" :default-active="$route.path" router unique-opened>
			
			<el-menu-item index="/Index"><i class="el-icon-web-home"></i><span>主页</span></el-menu-item>
			<el-submenu index="2">
				<template slot="title"><i class="el-icon-web-clipboard"></i><span>楼盘管理</span></template>
				<el-menu-item index="/Estate/Guide">
					<span>批量向导</span>
				</el-menu-item>
				<el-menu-item index="/Estate/Dossier">
					<span>房产档案</span>
				</el-menu-item>
				<el-menu-item index="/Estate/Selling">
					<span>放盘</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title"><i class="el-icon-web-clipboard"></i><span>CRM</span></template>
				<el-menu-item index="/CRM/Clues/Lists">
					<span>线索客户</span>
				</el-menu-item>
				<el-menu-item index="/CRM/Old/Lists">
					<span>老客户</span>
				</el-menu-item>
				<el-menu-item index="">
					<span>机会客户</span>
				</el-menu-item>
				<el-menu-item index="">
					<span>客户查询</span>
				</el-menu-item>
				<el-menu-item index="">
					<span>公海客户</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title"><i class="el-icon-web-book"></i><span>销售管理</span></template>
				<el-menu-item index="">
					<span>销售表</span>
				</el-menu-item>
				<el-menu-item index="">
					<span>销控图</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="6">
				<template slot="title"><i class="el-icon-web-copy"></i><span>文件合同</span></template>
				<el-menu-item index="">
					<span>文件模板</span>
				</el-menu-item>
				<el-menu-item index="">
					<span>历史文档</span>
				</el-menu-item>
				<el-menu-item index="">
					<span>创建文档</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title"><i class="el-icon-setting"></i><span>系统配置</span></template>
				<el-menu-item index="/System/DataDic/DicList">
					<span>数据字典</span>
				</el-menu-item>
				<el-menu-item index="/System/Config/FollowUpSet">
					<span>跟进配置</span>
				</el-menu-item>
				<el-menu-item index="/System/Structure/List">
					<span>组织架构</span>
				</el-menu-item>
				<el-menu-item index="/System/Position/List">
					<span>职位管理</span>
				</el-menu-item>
				<el-menu-item index="/System/User/List">
					<span>用户管理</span>
				</el-menu-item>
				<el-menu-item index="/System/Role/List">
					<span>角色管理</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="7">
				<template slot="title"><i class="el-icon-web-pluse"></i><span>房屋租赁</span></template>
				<el-menu-item index="">
					<span>所有盘源</span>
				</el-menu-item>
				<el-menu-item index="">
					<span>我的所有盘</span>
				</el-menu-item>
				<el-menu-item index="">
					<span>总监办</span>
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default {
        data() {
        	return {
            	uniqueOpened: true
        	}
        },
        created() {
			console.log(this.$route.path);
        }
    }

</script>
<style scoped>
	.sidebar {
		position: absolute;
		top: 60px;
		bottom: 0;
		left: 0;
		width: 220px;
		background: #263238;
	}
	.site-menu {
		padding-bottom: 20px;
		background: none;
		border: none;
	}
</style>
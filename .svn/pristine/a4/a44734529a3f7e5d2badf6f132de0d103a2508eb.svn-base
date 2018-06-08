<template>
	<div class="sidebar">
		<el-menu class="site-menu" text-color="#a3afb7" active-text-color="#ffffff" background-color="#263238" :default-active="$route.path" router unique-opened>

			<template v-for="(item,index) in treeData">

				<el-menu-item :index="item.attrValue" v-if="!item.hasChildren"><i :class="item.icon"></i><span>{{item.text}}</span></el-menu-item>

				<el-submenu :index="'' + index" v-else>
					<template slot="title"><i :class="item.icon"></i><span>{{item.text}}</span></template>
					
					<template v-for="itemTwo in item.children">
						
						<el-menu-item :index="itemTwo.attrValue">
							<span>{{itemTwo.text}}</span>
						</el-menu-item>

					</template>

				</el-submenu>
			</template>
		</el-menu>
	</div>
</template>

<script>
	export default {
        data() {
        	return {
            	treeData: []
        	}
        },
        created() {
			this.getTreeData();
        },
        methods: {
        	getTreeData() {
        		this.$https.get('/api/company_role/list_my_module?status=1&parent_id=0').then((result) => {
	                if (result.data.code == 0) {
	                    this.treeData = result.data.data;
	                } else {
	                    this.$message({
	                        type: 'error',
	                        showClose: true,
	                        message: result.data.message
	                    })
	                }
	            })
        	}
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
        overflow-y: auto;
	}
	.site-menu {
		padding-bottom: 20px;
		background: none;
		border: none;
	}
</style>
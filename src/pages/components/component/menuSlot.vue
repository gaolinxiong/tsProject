<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-header style="text-align: right; font-size: 12px">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <span>管理员</span>
        </el-header>

        <el-container>
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1']" :router="routerVal">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>壁纸管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="managePage">管理壁纸图片</el-menu-item>
                            <el-menu-item index="showPicChartPage">壁纸chart图</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-message"></i>账号管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="manageAccount">管理账号</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-main>
                <slot></slot>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data(){
            return {
                routerVal: true
            }
        },
        computed: {
            ...mapState('$_main', ['tableList'])
        },
        methods: {
            ...mapActions('$_main', ['getData']),
            handleSearch() {
                this.getData();
            }
        }
    }
</script>

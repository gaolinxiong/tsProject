<template>
    <menu-slot>
        <div class="btnRight">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addManager">新增管理员</el-button>
        </div>
        <el-table
                :data="manageData"
                style="width: 100%">
            <el-table-column
                    prop="username"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码">
            </el-table-column>

        </el-table>
        <el-dialog title="增加管理员" :visible.sync="dialogVisible">
            <el-form label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addManageClick">增加</el-button>
            </span>
        </el-dialog>
    </menu-slot>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import menuSlot from "@/pages/components/component/menuSlot";
    export default {
        data(){
            return {
                dialogVisible: false,
                username: '',
                password: ''
            }
        },
        components: {
            menuSlot
        },
        computed: {
            ...mapState('$_main', ['manageData']),
        },
        methods: {
            ...mapActions('$_main', ['getManageInfo', 'addManagerInfo']),
            init() {
                this.getManageInfo()
            },
            async addManageFun(payload) {
                this.addManagerInfo(payload);
            },
            addManager() {
                this.dialogVisible = true
            },
            addManageClick() {
                this.dialogVisible = false;
                this.addManageFun({
                    username: this.username,
                    password: this.password
                });
                setTimeout(() => {
                    this.init()
                },500)
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style>
    @import 'index.less';
</style>

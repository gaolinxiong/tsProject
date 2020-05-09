<template>
    <div class="loginPage">
        <span class="title">图书借阅系统</span>
        <em class="img"></em>
        <div class="card">
            <h1>图书借阅系统{{ loginType ? '管理员登录' : '用户登录'}}</h1>
            <el-form ref="form" label-width="110px">
                <el-form-item label="用户名:">
                    <el-input placeholder="请输入用户名" v-model="username"></el-input>
                </el-form-item>

                <el-form-item label="密码:">
                    <el-input placeholder="请输入密码" v-model="password"></el-input>
                </el-form-item>

                <el-button class="loginButton" @click="handleClickLogin" type="primary">登录</el-button>
                <el-button class="changeType" @click="changeLoginType" type="text">{{ loginType ? '用户登录' : '管理员登录'}}</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    export default {
        data(){
            return {
                username: '',
                password: '',
                loginType: 0
            }
        },
        computed: {
            ...mapState('$_main', ['tableLogin'])
        },
        methods: {
            ...mapActions('$_main', ['loginVerify']),
            ...mapMutations('$_main', ['updateTableLogin']),
            init() {
                this.updateTableLogin(false)
            },
            async handleClickLogin() {
                await this.loginVerify({
                    username: this.username,
                    password: this.password
                });
                if(this.tableLogin) {
                    this.$message.success('登录成功！');
                    this.$router.push({ path: `/managePage` });
                } else {
                    this.$message.error('登录错误，请重试！');
                }
            },
            changeLoginType() {
                this.loginType = this.loginType ? 0 : 1
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="less" scoped>
    @import 'index.less';
</style>

<template>
    <div class="manage_container">
        123
        <el-button type="primary" @click="handleSearch">高林雄</el-button>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        data(){
            return {
                text:'hello webpack111!！！'
            }
        },
        methods: {
            ...mapActions('$_main', ['testServer']),
            handleSearch() {
                this.testServer();
            }
        }
    }
</script>

<style>
    @import 'index.css';
</style>

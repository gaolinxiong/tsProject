<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                text:'hello webpack111!！！'
            }
        },
        computed: {
            ...mapState('$_main', ['name'])
        },
        methods: {

        },
        mounted() {
            console.log(this.name)
        }
    }
</script>

<style>
    @import 'index.less';
</style>

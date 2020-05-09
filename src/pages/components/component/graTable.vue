<template>
    <div>

    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data(){
            return {
                text:'hello webpack111!！！'
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

<style>
    @import 'index.css';
</style>

<template>
    <div class="container">
        <p @click="handleName">高林雄</p>
      {{todoList}}
      {{onShowList}}
    </div>
</template>
<script lang="ts">
import { reactive, computed, toRefs, defineComponent } from '@vue/composition-api'
export default defineComponent({
    name: 'app',
    setup () {
        const data = reactive({
            todoList: [1],
            showingStatus: 'all',
            onShowList: computed(() => {
                return data.todoList
            })
        })
        function handleName () {
            console.log(123);
        }
        return {
            ...toRefs(data),
            handleName
        }
    }
})
</script>

<style>
    @import 'assets/index.less';
</style>

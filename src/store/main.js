import apiRequest from "@/common/apiRequest";
const quRequest = new apiRequest();
export default {
    namespaced: true,
    state: {
        name: '高林雄很帅'
    },
    getters: {

    },
    mutations: {

    },
    actions: {
        async testServer() {
            await quRequest.send('/testServer', {
                page: 4,
                pageSize: 10
            })
        },
        async getData() {
            await quRequest.send('/getPicInfo', {
                page: 1,
                pageSize: 10
            })
        }
    }
};

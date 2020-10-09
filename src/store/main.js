import apiRequest from "@/common/apiRequest";
import da from "element-ui/src/locale/lang/da";
const quRequest = new apiRequest();
export default {
    namespaced: true,
    state: {
        tableList: [],
        showTableList: [],
        tableTotal: 0,
        tableLoading: true,
        tableLogin: false,
        chartData: [],
        manageData: []
    },
    mutations: {
        updateImageInfo(state, data) {
           state.showTableList[data.index][data.field]++;
        },
        updateTableList(state, data) {
            state.tableList = data.list;
            state.tableTotal = data.total;
        },
        updateShowTableList(state, data) {
            state.showTableList = state.showTableList.concat(data.list);
        },
        updateTableLoading(state, data) {
            state.tableLoading = data
        },
        updateTableLogin(state, data) {
            state.tableLogin = data
        },
        updateChartSource(state, data) {
            data.forEach((item) => {
                let year = item.item.substring(0,4);
                let month = item.item.substring(5, 7);
                let day = item.item.substring(8, 10);
                item['item'] = `${year}年${month}月${day}日`
            });
            state.chartData = data;
        },
        updateManageInfo(state, data) {
            state.manageData = data
        }
    },
    actions: {
        async getData({commit, state, dispatch}, payload = {}) {
            commit('updateTableLoading', true);
            let { code, data, message } = await quRequest.send('/getPicInfo', payload);
            if (code !== 200) {
                message && alert(message);
                return;
            }
            commit('updateTableLoading', false);
            commit('updateTableList', data);
            commit('updateShowTableList', data);
        },
        async changeStatus({commit, state, dispatch}, payload = {}) {
            commit('updateTableLoading', true);
            let { code, message } = await quRequest.send('/ChangePicStatus', payload);
            if (code !== 200) {
                message && alert(message);
                return;
            }
        },
        async loginVerify({commit, state, dispatch}, payload = {}) {
            let { code } = await quRequest.send('/loginVerify', payload);
            if (code == 200) {
                commit('updateTableLogin', true);
            } else {
                commit('updateTableLogin', false);
            }
        },
        async updateFieldNum({commit, state, dispatch}, payload = {}) {
            return  await quRequest.send('/updateFieldNum', payload);
        },
        async addPicAction({commit, state, dispatch}, payload = {}) {
            let {result, startPage} =  await quRequest.send('/addPic', payload);
            return {
                result,
                page: startPage
            }
        },
        async getChartSource({commit, state, dispatch}, payload = {}) {
            let {code, data } =  await quRequest.send('/getChartSource', payload);
            if (code !== 200) {
                return;
            }
            console.log(data);
            commit('updateChartSource', data);
        },
        async getManageInfo({commit, state, dispatch}, payload = {}) {
            let {code, data, total} =  await quRequest.send('/getManageInfo', payload);
            if (code !== 200) {
                return;
            }
            commit('updateManageInfo', data)
        },
        async addManagerInfo({commit, state, dispatch}, payload = {}) {
            let {code, data} =  await quRequest.send('/insertLoginInfo', payload);
            if (code !== 200) {
                return;
            }
            console.log(code, data)
        },
    }
};
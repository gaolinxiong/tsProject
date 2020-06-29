<template>
    <menu-slot>
        <div class="btnRight">
            <el-input-number v-model="startPage"></el-input-number>
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="getNetPic">爬取网页图片</el-button>
        </div>
        <el-tabs type="border-card" @tab-click="tabClick" style="margin-top: 50px">
            <el-tab-pane label="非违规图片"></el-tab-pane>
            <el-tab-pane label="违规图片"></el-tab-pane>
            <el-table
                    v-loading="tableLoading"
                    :data="tableList"
                    style="width: 100%">
                <el-table-column
                        prop="pic_url"
                        label="图片地址">
                    <template slot-scope="scope">
                        <img class="picStyle" :src="scope.row.pic_url" />
                    </template>
                </el-table-column>
                <el-table-column
                        prop="pic_width"
                        label="图片宽度">
                </el-table-column>
                <el-table-column
                        prop="pic_height"
                        label="图片高度">
                </el-table-column>
                <el-table-column
                        prop="greypic_url"
                        label="灰图图片地址">
                    <template slot-scope="scope">
                        <img class="picStyle" :src="scope.row.greypic_url" />
                    </template>
                </el-table-column>
                <el-table-column
                        prop="judge_message"
                        label="判定结果提示">
                </el-table-column>
                <el-table-column
                        prop="upload_time"
                        label="更新时间">
                    <template slot-scope="scope">
                        {{scope.row.upload_time | filterUploadTime}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="favorites"
                        label="收藏个数">
                    <template slot-scope="scope">
                        {{scope.row.favorites }}个收藏
                    </template>
                </el-table-column>

                <el-table-column
                        prop="likes"
                        label="喜欢个数">
                    <template slot-scope="scope">
                        {{scope.row.likes }}个喜欢
                    </template>
                </el-table-column>

                <el-table-column
                        label="操作"
                        width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" class="btnActive" v-if="!kind" @click="changePicKind(scope.row.id)">设为违规图片</el-button>
                        <el-button type="primary" class="btnActive"  v-else @click="changePicKind(scope.row.id)">设为非违规图片</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    style="text-align: right"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="tableTotal">
            </el-pagination>
        </el-tabs>
    </menu-slot>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import menuSlot from "@/pages/components/component/menuSlot";
    export default {
        data(){
            return {
                page: 1,
                pageSize: 5,
                kind: 0,
                startPage: 23
            }
        },
        components: {
            menuSlot
        },
        filters: {
            filterUploadTime(uploadTime) {
                return new Date(parseInt(uploadTime) * 1000).toLocaleDateString()
            }
        },
        computed: {
            ...mapState('$_main', ['tableList', 'tableTotal', 'tableLoading'])
        },
        methods: {
            ...mapActions('$_main', ['getData', 'changeStatus', 'addPicAction']),
            getNetPic() {
                this.addPic()
            },
            async addPic() {
                this.$message.success('正在爬取网络图片中...  爬取完成将会通知您结果', 5000);
                let data = await this.addPicAction({
                    startPage: this.startPage
                });
                this.startPage++;
                this.$message.success(`爬取图片成功，一共爬取${data['result'].length}图片,爬取了第${data['page']}页的图片`, 10000);
            },
            changePicKind(id) {
                this.changeStatus({
                    picId: id,
                    kind: this.kind ? 0 : 1
                });
                setTimeout(() => {
                    this.init()
                }, 500);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.init()
            },
            tabClick(tab) {
                this.page = 1;
                if (tab.label === '违规图片') {
                    this.kind = 1;
                } else {
                    this.kind = 0;
                }
                this.init()
            },
            init() {
                this.getData({
                    kind: this.kind,
                    page: this.page,
                    pageSize: this.pageSize
                });
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

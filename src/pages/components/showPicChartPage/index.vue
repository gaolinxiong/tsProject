<template>
    <menu-slot>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>以日期为维度的饼图</span>
            </div>
            <div id="chart"></div>
        </el-card>

    </menu-slot>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import { Chart } from '@antv/g2';
    import menuSlot from "@/pages/components/component/menuSlot";
    export default {
        data(){
            return {
                page: 1,
                pageSize: 5,
                kind: 0
            }
        },
        components: {
            menuSlot
        },
        computed: {
            ...mapState('$_main', ['chartData'])
        },
        methods: {
            ...mapActions('$_main', ['getChartSource']),
            init() {
                const data = this.chartData;
                const chart = new Chart({
                    container: 'chart',
                    autoFit: true,
                    height: 500,
                });

                chart.coordinate('theta', {
                    radius: 0.75,
                });

                chart.data(data);

                chart.scale('value', {
                    formatter: (val) => {
                        val = val + '%';
                        return val;
                    },
                });

                chart.tooltip({
                    showTitle: false,
                    showMarkers: false,
                });

                chart
                    .interval()
                    .position('value')
                    .color('type')
                    .label('value', {
                        content: (data) => {
                            return `${data.type}: ${data.value * 100}%`;
                        },
                    })
                    .adjust('stack');

                chart.interaction('element-active');

                chart.render();

            },
            async getChartSourceData() {
                await this.getChartSource();
                this.init();
            }
        },
        mounted() {
            this.getChartSourceData();
        }
    }
</script>

<style>
    @import 'index.less';
</style>

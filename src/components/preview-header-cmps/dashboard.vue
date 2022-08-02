<template >
    <section class="dashboard-container">
        <div class="charts-container">
            <div class="chart-container">
                <BarChart :options="options" :chartData="labelCount" />
            </div>
            <div class="chart-container">
                <BarChart :options="options" :chartData="labelCount" />
            </div>
            <div class="chart-container">
                <BarChart :options="options" :chartData="labelCount" />
            </div>
            <div class="chart-container">
                <BarChart :options="options" :chartData="labelCount" />
            </div>
        </div>
    </section>
</template>
<script>
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
// const reg = JSON.parse(JSON.stringify(registerables))
// reg[2].subTitle = null


Chart.register(...registerables);
export default {
    name: 'dashboard',
    data() {
        return {
            labelCount: {
                labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre', 'blaba'],
                datasets: [
                    {
                        data: [30, 40, 60, 70, 5, 12],
                        backgroundColor: ['#00c2e0', '#c377e0', '#ff9f1a', '#f2d600', '#eb5a46', '#51e898'],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            },
        }
    },
    computed: {
        board() {
            return this.$store.getters.currBoard
        },
        tasks() {
            const tasks = this.board.groups.map(group => (group.tasks))
            return [].concat(...tasks)
        },
        labels() {
            const labels = this.tasks.map(task => (task.labels))
            return [].concat(...labels)
        },
        labelTitles() {
            const titles = this.labels.map(label => label.title)
            const titleSet = new Set(titles)
            // console.log('titles', titles)
            console.log('titleSet', titleSet)
            return Array.from(titleSet)
        },
        labelAmount() {
            return this.labels.map((label) => (this.labels.filter(l => l.id === label.id).length))
        },
    },
    created() {
        this.labelCount.labels = this.labelTitles
        this.labelCount.datasets[0].data = this.labelAmount
        // this.labelCount.datasets[0].backgroundColor = this.labelColors
    },
    components: { BarChart },

}


</script>

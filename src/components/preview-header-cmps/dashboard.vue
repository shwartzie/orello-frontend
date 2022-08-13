<template >
    <section class="dashboard-container">
        <div class="charts-container">
            <div class="chart-container">
                <div class="chart-header flex">
                    <h1>All labels</h1>
                    <img src="../../assets/svg/dots.svg" alt="">
                    <select v-model="currChart1">
                        <option value="BarChart">Bar chart</option>
                        <option value="PieChart">Pie chart</option>
                        <option value="DoughnutChart">Doughnut chart</option>
                        <option value="PolarAreaChart">Polar area chart</option>
                    </select>
                </div>
                <component :is="currChart1" :options="options" :chartData="labelCount" />
            </div>
            <div class="chart-container">
                <div class="chart-header flex">
                    <h1>Tasks per members</h1>
                    <img src="../../assets/svg/dots.svg" alt="">
                    <select v-model="currChart2">
                        <option value="BarChart">Bar chart</option>
                        <option value="PieChart">Pie chart</option>
                        <option value="DoughnutChart">Doughnut chart</option>
                        <option value="PolarAreaChart">Polar area chart</option>
                    </select>
                </div>
                <component :is="currChart2" :options="options" :chartData="memberPerTask" />
            </div>
            <div class="chart-container">
                <div class="chart-header flex">
                    <h1> Tasks per group</h1>
                    <img src="../../assets/svg/dots.svg" alt="">
                    <select v-model="currChart3">
                        <option value="BarChart">Bar chart</option>
                        <option value="PieChart">Pie chart</option>
                        <option value="DoughnutChart">Doughnut chart</option>
                        <option value="PolarAreaChart">Polar area chart</option>
                    </select>
                </div>
                <component :is="currChart3" :options="options" :chartData="taskPerGroup" />
            </div>
            <div class="chart-container">
                <div class="chart-header flex">
                    <h1> Cards per label</h1>
                    <img src="../../assets/svg/dots.svg" alt="">
                    <select v-model="currChart4">
                        <option value="BarChart">Bar chart</option>
                        <option value="PieChart">Pie chart</option>
                        <option value="DoughnutChart">Doughnut chart</option>
                        <option value="PolarAreaChart">Polar area chart</option>
                    </select>
                </div>
                <component :is="currChart4" :options="options" :chartData="labelCount" />
            </div>
        </div>
    </section>
</template>
<script>
import { BarChart, PieChart, DoughnutChart, PolarAreaChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
// const reg = JSON.parse(JSON.stringify(registerables))
// reg[2].subTitle = null


Chart.register(...registerables);
export default {
    name: 'dashboard',
    data() {
        return {
            currChart1: 'BarChart',
            currChart2: 'BarChart',
            currChart3: 'PieChart',
            currChart4: 'BarChart',
            labelCount: {
                labels: null,
                datasets: [
                    {
                        data: null,
                        backgroundColor: ['#00c2e0', '#c377e0', '#ff9f1a', '#f2d600', '#eb5a46', '#51e898'],
                    },
                ],
            },
            memberPerTask: {
                labels: null,
                datasets: [
                    {
                        data: null,
                        backgroundColor: ['#00c2e0', '#c377e0', '#ff9f1a', '#f2d600', '#eb5a46', '#51e898'],
                    },
                ],
            },
            taskPerGroup: {
                labels: null,
                datasets: [
                    {
                        data: null,
                        backgroundColor: ['#00c2e0', '#c377e0', '#ff9f1a', '#f2d600', '#eb5a46', '#51e898'],
                    },
                ],
            },
            options: {
                // responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            },
        }
    },
    methods: {
        changeChart(val) {
            console.log(this.currChart2)
        }
    },
    computed: {
        board() {
            return this.$store.getters.currBoard
        },
        tasks() {
            const tasks = this.board.groups.map(group => (group.tasks))
            console.log([].concat(...tasks))
            return [].concat(...tasks)
        },
        labels() {
            let labels = this.tasks.filter(task => task.labels).map(task => task.labels)
            labels = [].concat(...labels)
            return labels.filter(label => label.isMarked)

        },
        labelMap() {
            return this.labels.reduce((acc, { title }) => {
                return acc[title] ? ++acc[title] : acc[title] = 1, acc
            }, {});
        },
        labelTitles() {
            const labelMap = this.labelMap
            return Object.keys(labelMap).map((key) => key)

        },
        labelAmount() {
            const labelMap = this.labelMap
            return Object.keys(labelMap).map((key) => labelMap[key])
        },
        taskMemberMap() {
            return this.tasks.reduce((acc, { title, members }) => {
                if (members.length) {
                    members = members.map(member => member.fullname)
                    acc[title] = members
                }
                return acc
            }, {})

        },
        taskTitles() {
            const taskMemberMap = this.taskMemberMap
            return Object.keys(taskMemberMap).map((key) => key)

        },
        taskMembers() {
            const taskMemberMap = this.taskMemberMap
            return Object.keys(taskMemberMap).map((key) => taskMemberMap[key].length)
        },
        groupTasksMap() {
            const groups = [...this.board.groups]
            return groups.reduce((acc, { tasks, title }) => {
                acc[title] = tasks.length
                return acc
            }, {})
        },
        groupTitles() {
            const groupTasksMap = this.groupTasksMap
            return Object.keys(groupTasksMap).map((key) => key)

        },
        tasksPerGroup() {
            const groupTasksMap = this.groupTasksMap
            return Object.keys(groupTasksMap).map((key) => groupTasksMap[key])
        },
        // labelColors() {
        //     const colors = this.labels.map(label => {
        //         return label.class.split("card-label-").pop()
        //     })
        //     const colorSet = Array.from(new Set(colors))
        //     const extraColors = ['#00c2e0', '#c377e0', '#ff9f1a', '#f2d600', '#eb5a46', '#51e898']
        //     let i = 0
        //     while (colorSet.length !== this.labelTitles.length) {
        //         i++
        //         colorSet.push(extraColors[i])
        //     }
        //     return colorSet
        // },
    },
    created() {
        this.labelCount.labels = this.labelTitles
        this.labelCount.datasets[0].data = this.labelAmount

        this.memberPerTask.labels = this.taskTitles
        this.memberPerTask.datasets[0].data = this.taskMembers
        console.log(this.tasks.filter(task => task.status).map(task => task.status))
        this.taskPerGroup.labels = this.groupTitles
        this.taskPerGroup.datasets[0].data = this.tasksPerGroup

    },
    components: { BarChart, PieChart, DoughnutChart, PolarAreaChart },

}


</script>

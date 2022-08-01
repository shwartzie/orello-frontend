<template >
    <section class="dashboard-container">
        <div class="charts-container">
            <div class="chart-container">
                <BarChart :chartData="testData" />
            </div>
            <div class="chart-container">
                <BarChart :chartData="testData" />
            </div>
            <div class="chart-container">
                <BarChart :chartData="testData" />
            </div>
            <div class="chart-container">
                <BarChart :chartData="testData" />
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
            testData: {
                stuf: console.log(registerables),
                labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
                datasets: [
                    {
                        data: [30, 40, 60, 70, 5],
                        backgroundColor: ['red', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    },
                ],
            }
        }
    },

    components: { BarChart },

}


</script>

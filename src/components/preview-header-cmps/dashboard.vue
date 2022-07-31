<template >
    <section class="dashboard-container">
        <h1>
            Hello!!
            <BarChart :chartData="testData" />
        </h1>
    </section>
</template>
<script>
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";


Chart.register(...registerables);
export default {
    name: 'dashboard',
    data() {
        return {
            testData: {
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

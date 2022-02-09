<script>
import { PolarArea } from 'vue-chartjs'
export default {
  extends: PolarArea,
  data: () => ({
    chartdata: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'],
        datasets: [{
            label: 'My First Dataset',
            data: [11, 16, 7, 3, 14,12,8],
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            ]
        }]
    },
    options: {
    }
  }),
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
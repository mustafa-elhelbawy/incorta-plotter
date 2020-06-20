import React from 'react';
import Chart from 'chart.js';

export default class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.chartRef = React.createRef();
    }
  
    componentDidUpdate() {
      this.myChart.data.labels = this.props.data.xAxis.values;
      this.myChart.data.datasets[0].data = this.props.data.yAxis.values;
      this.myChart.update();
    }
  
    componentDidMount() {
      this.myChart = new Chart(this.chartRef.current, {
        type: 'line',
        options: {
          scales: {
            // xAxes: [
            //   {
            //     type: 'time',
            //     time: {
            //       unit: 'week'
            //     }
            //   }
            // ],
            yAxes: [
              {
                ticks: {
                  min: 0
                }
              }
            ]
          }
        },
        data: {
          labels: this.props.data.xAxis.values,
          datasets: [{
            label: this.props.title,
            data: this.props.data.yAxis.values,
            fill: 'none',
            backgroundColor: this.props.color,
            pointRadius: 2,
            borderColor: this.props.color,
            borderWidth: 1,
            lineTension: 0
          }]
        }
      });
    }
  
    render() {
      return <canvas ref={this.chartRef} />;
    }
}

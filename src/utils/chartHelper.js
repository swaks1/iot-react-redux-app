export class LineChartHelper {
  constructor(data, labels, name) {
    this.data = data;
    this.labels = labels;
    this.name = name;
  }

  getMaxValue = () => {
    if (this.data.length > 0) {
      return Math.max(...this.data) + 1;
    } else {
      return 10;
    }
  };

  getMinValue = () => {
    if (this.data.length > 0) {
      return Math.min(...this.data) - 1;
    } else {
      return 0;
    }
  };

  getOptions = () => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: this.getMinValue(),
              suggestedMax: this.getMaxValue(),
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ],
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              autoSkip: true, //show labels as much as there is space... hide others
              maxTicksLimit: 12,
              fontColor: "#9a9a9a"
            }
          }
        ]
      }
    };
  };

  getData = canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: this.labels,
      datasets: [
        {
          label: this.name,
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1.5, // how big the points on the chart are... The smaller the more it looks like line
          data: this.data
        }
      ]
    };
  };
}

export class BarChartHelper {
  constructor(data, labels, name) {
    this.data = data;
    this.labels = labels;
    this.name = name;
  }

  getMaxValue = () => {
    if (this.data.length > 0) {
      return Math.max(...this.data) + 1;
    } else {
      return 10;
    }
  };

  getMinValue = () => {
    if (this.data.length > 0) {
      return Math.min(...this.data);
    } else {
      return 0;
    }
  };

  getOptions = () => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: this.getMinValue(),
              suggestedMax: this.getMaxValue(),
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };
  };

  getData = canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    return {
      labels: this.labels,
      datasets: [
        {
          label: this.name,
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#d048b6",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: this.data
        }
      ]
    };
  };
}

// https://codesandbox.io/s/rkzro8yy4
// https://codepen.io/davelebbing/pen/wGEQwx
// https://www.npmjs.com/package/highcharts-react-official
export const GaugeChartHelper = {
  getOptions: (minValue, maxValue, currentValue, title) => {
    return {
      chart: {
        type: "solidgauge",
        height: "200",
        width: "200"
      },
      series: [
        {
          data: [currentValue],
          dataLabels: {
            format: `<div style="text-align:center">
              <span style="font-size:30px;color:#525f7f">{y}</span><br/>              
              </div>`
          }
        }
      ],
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -40, // place of the dataLabels from series:[]
            borderWidth: 0,
            useHTML: true
          }
        }
      },
      pane: {
        center: ["50%", "75%"],
        size: "100%",
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: "white",
          innerRadius: "60%",
          outerRadius: "100%",
          shape: "arc"
        }
      },
      tooltip: {
        enabled: false
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      // the value axis
      yAxis: {
        min: minValue,
        max: maxValue,
        title: {
          text: title,
          style: {
            color: "#525f7f",
            fontSize: "1.3em"
          },
          y: -60 // offset where the label will show on the gauge
        },
        stops: [
          [0.1, "#55BF3B"], // green
          [0.5, "#DDDF0D"], // yellow
          [0.9, "#DF5353"] // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickPositions: [minValue, maxValue], //the labels on the gauge (numbers on the cahrt)
        tickAmount: 2, // max nubers of labels on the gauge
        labels: {
          y: 15, // offset from the charts for the labels(numbers on the chart)
          x: 0
        }
      }
    };
  }
};

import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexLegend,
  ApexFill,
  ApexMarkers,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
  xaxis: ApexXAxis | any ;
  stroke: ApexStroke | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  tooltip: ApexTooltip | any;
  colors: string[] | any;
  title: ApexTitleSubtitle | any ;
  subtitle: ApexTitleSubtitle | any;
  legend: ApexLegend | any;
  fill: ApexFill | any;
  markers: ApexMarkers | any;
  grid: ApexGrid | any;

};
@Component({
  selector: 'app-store-manager',
  templateUrl: './store-manager.component.html',
  styleUrls: ['./store-manager.component.css']
})
export class StoreManagerComponent {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chart2") chart2: ChartComponent| any;
  public chartOptions2: Partial<ChartOptions>;

  @ViewChild("chart3") chart3: ChartComponent | any;
  public chartOptions3: Partial<ChartOptions>;

  @ViewChild("chart4") chart4: ChartComponent | any;
  public chartOptions4: Partial<ChartOptions>;

//-------------------------------------------
  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["Cafe", "Bánh", "Trà sữa", "Soda", "Thức uống khác"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.chartOptions2 = {
      series: [
        {
          data: [20, 18, 45,]
        }
      ],
      chart: {
        type: "bar",
        height: 380
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom"
          }
        }
      },
      colors: [
        "#33b2df",
        "#546E7A",
        "#d4526e",
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        formatter: function(val:any, opt:any) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: [
          "Hà Nội",
          "Đà Nẵng",
          "Hồ Chí Minh",
        ]
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        text: "Quý 1 năm 2023",
        align: "center",
        floating: true
      },
      subtitle: {
        text: "1 = 1 tỷ đồng",
        align: "center"
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function() {
              return "";
            }
          }
        }
      }
    };
    //-------------------------------------------
    this.chartOptions3 = {
      series: [
        {
          name: "Hồ Chí Minh",
          data: [44, 45]
        },
        {
          name: "Đà nẵng",
          data: [13, 18]
        },
        {
          name: "Hà Nội",
          data: [11, 20 ] 
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "01/2023",
          "02/2023",
        ]
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };
      //-------------------------------------------
      this.chartOptions4 = {
        series: [
          {
            name: "Thời gian truy cập trung bình",
            data: [45, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "Lượt xem",
            data: [35, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "Tổng lượt truy cập",
            data: [87, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        chart: {
          height: 350,
          type: "line"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 5,
          curve: "straight",
          dashArray: [0, 8, 5]
        },
        title: {
          text: "Page Statistics",
          align: "left"
        },
        legend: {
          tooltipHoverFormatter: function(val:any, opts:any) {
            return (
              val +
              " - <strong>" +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              "</strong>"
            );
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          labels: {
            trim: false
          },
          categories: [
            "01/2023",
            "02/2023",
            "03/2023",
            "04/2023",
            "05/2023",
            "06/2023",
            "07/2023",
            "08/2023",
            "09/2023",
            "10/2023",
            "11/2023",
            "12/2023"
          ]
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function(val:any) {
                  return val + " (mins)";
                }
              }
            },
            {
              title: {
                formatter: function(val:any) {
                  return val + " per session";
                }
              }
            },
            {
              title: {
                formatter: function(val:any) {
                  return val;
                }
              }
            }
          ]
        },
        grid: {
          borderColor: "#f1f1f1"
        }
      };
  }
}
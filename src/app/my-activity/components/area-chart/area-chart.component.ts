import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  NgApexchartsModule
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};


@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [NgApexchartsModule, FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.css'
})
export class AreaChartComponent implements OnChanges {
  @Input() statistics: any;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Body weight",
          data: []
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      labels: [],
      xaxis: {
        type: "category",
        labels: {



          style: {
            fontWeight: "bold",
          },
        },
      },
      yaxis: {
        opposite: false,
        // min: 0,
        labels: {
          style: {
            fontWeight: "bold",
          },
        },

      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['statistics'] && this.statistics) {
      console.log(this.statistics)
      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            name: "Body weight",
            data: this.statistics.yvalues
          }
        ],
        labels: this.statistics.xvalues
      }
    }
  }

}

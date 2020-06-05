import {Component, OnInit} from '@angular/core';
import {StatService} from '../services/stat.service';
import {ChartOptions} from 'chart.js';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  // Chart type
  public lineChartType = 'line';
  // Chart option
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [{id: 'y-axis-0', position: 'left' }]
    },
    title: {
      display: true,
      text: 'Evolution curve'
    },
    plugins: {
      datalabels: {
        formatter: () => {
          return null;
        },
      },
    }
  };
  public lineChartColors: Color[] = [
    { // Grey
      backgroundColor: 'rgba(223,227,238,0.2)',
      borderColor: 'rgb(255,0,0)',
      pointBackgroundColor: 'rgb(0,0,0)',
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // Yellow
      backgroundColor: 'rgba(223,227,238,0.2)',
      borderColor: 'rgb(252,189,3)',
      pointBackgroundColor: 'rgb(0,0,0)',
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // Green
      backgroundColor: 'rgba(223,227,238,0.2)',
      borderColor: 'rgb(26,90,2)',
      pointBackgroundColor: 'rgb(0,0,0)',
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  // cases
  Cases: any;
  // Deaths
  Deaths: any;
  // Recovered
  Recovered: any;
  // labels
  CasesLabels: any;

  constructor(private statService: StatService) {
  }
  ngOnInit() {
    this.statService.getHistoricalStat().subscribe(data => {
      // show results on console
      this.Cases = Object.values(data.timeline.cases); // get number of cases
      this.Deaths = Object.values(data.timeline.deaths); // get number of deaths
      this.Recovered = Object.values(data.timeline.recovered); // get number of recovered
      this.CasesLabels = Object.keys(data.timeline.cases); // get labels (dates)
      // show results on console
      console.log(data);
      console.log('cases : ' + this.Cases);
      console.log('cases : ' + this.Deaths);
      console.log('cases : ' + this.Recovered);
    });
  }
}

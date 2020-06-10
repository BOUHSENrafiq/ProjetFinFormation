import { Component, OnInit } from '@angular/core';
import {StatService} from '../services/stat.service';
import {CalculService} from '../services/calcul.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
// PIE CHART:
  public pieChartLabels = ['Deaths cases', 'Active cases', 'Recovered cases']; // chart labels
  public pieChartData = []; // chart data
  public pieChartType = 'pie'; // chart type
  public pieChartLegend = true; // chart legend
  public pieChartColors = [
    {
      backgroundColor: ['rgb(255,72,72)', 'rgb(245,242,100)', 'rgb(176,246,158)'],
    },
  ]; // chart colors
  public pieChartPlugins = [pluginDataLabels];
  Confirmed: number;
  Recovered: number;
  Deaths: number;
  Active: number;

  /**
   * @description constructor with private injected services
   * @param statService instance of StatService
   * @param calculService instance of CalculService
   */
  constructor(private statService: StatService, private calculService: CalculService) { }

  ngOnInit() {
    this.statService.getToDayStat().subscribe(data => {
      this.Confirmed = data.cases;
      this.Recovered = this.calculService.getRound(this.calculService.getPercentage(data.recovered, this.Confirmed));
      this.Deaths = this.calculService.getRound(this.calculService.getPercentage(data.deaths, this.Confirmed));
      this.Active = this.calculService.getRound(this.calculService.getPercentage(data.active, this.Confirmed));
      this.pieChartData = [this.Deaths, this.Active, this.Recovered];
      // show results on console:
      // console.log(data);
      // console.log(this.Recovered);
      // console.log(this.Deaths);
      // console.log(this.Active);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {StatService} from '../services/stat.service';
import {CalculService} from '../services/calcul.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-piecharttestsdetails',
  templateUrl: './piecharttestsdetails.component.html',
  styleUrls: ['./piecharttestsdetails.component.css']
})

export class PiecharttestsdetailsComponent implements OnInit {
  // PIE CHART:
  public pieChartLabels = ['Positive tests', 'Negative tests']; // chart labels
  public pieChartData = []; // chart data
  public pieChartType = 'pie'; // chart type
  public pieChartLegend = true; // chart legend
  public pieChartColors = [{backgroundColor: ['rgb(255,72,72)', 'rgb(176,246,158)'], }, ]; // chart colors
  public pieChartPlugins = [pluginDataLabels]; // chart labels

  Tested: number; // number of tested people
  Confirmed: number; // percentage of confirmed cases
  Healthy: number; // number of healthy people = Tested - Confirmed
  NonAffected: number; // percentage of healthy people

  constructor(private statService: StatService, private calculService: CalculService) { }

  ngOnInit() {
    this.statService.getToDayStat().subscribe(data => {
      this.Tested = data.tests;
      this.Confirmed = this.calculService.getRound(this.calculService.getPercentage(data.cases, this.Tested));
      this.Healthy = Math.abs(data.tests - data.cases);
      this.NonAffected = this.calculService.getRound(this.calculService.getPercentage(this.Healthy, this.Tested));
      this.pieChartData = [this.Confirmed, this.NonAffected];
      // show results on console
      console.log(data);
      console.log(this.Tested);
      console.log(this.Healthy);
      console.log(this.Confirmed);
      console.log(this.NonAffected);
    });
  }
}

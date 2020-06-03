import { Component, OnInit } from '@angular/core';
import {StatService} from '../services/stat.service';

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
      backgroundColor: ['rgba(255,0,0)', 'rgb(241,236,6)', 'rgb(35,147,7)'],
    },
  ]; // chart colors
  Confirmed: number;
  Recovered: number;
  Deaths: number;
  Active: number;
  constructor(private statService: StatService) { }

  ngOnInit() {
    this.statService.getToDayStat().subscribe(data => {
      this.Confirmed = data.cases;
      this.Recovered = this.getRound(this.getPercentage(data.recovered, this.Confirmed));
      this.Deaths = this.getRound(this.getPercentage(data.deaths, this.Confirmed));
      this.Active = this.getRound(this.getPercentage(data.active, this.Confirmed));
      this.pieChartData = [this.Deaths, this.Active, this.Recovered];
      // show results on console
      console.log(data);
      console.log(this.Recovered);
      console.log(this.Deaths);
      console.log(this.Active);
    });
  }

  /**
   * calcul of the percentage
   * @param {number} a
   * @param {number} b
   */
  getPercentage(a, b) {
    const result = a * 100 / b;
    return result;
  }

  /**
   * Precision 2 digits
   * @param a
   */
  getRound(a){
   return Math.round(a * 100) / 100;
  }
}

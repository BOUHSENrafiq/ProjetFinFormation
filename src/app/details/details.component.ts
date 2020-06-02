import { Component, OnInit } from '@angular/core';
import {StatService} from '../services/stat.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public pieChartLabels = ['Deaths cases', 'Active cases', 'Recovered cases'];
  public pieChartData = [];
  public pieChartType = 'pie';
  Confirmed: number;
  Recovered: number;
  Deaths: number;
  Active: number;
  constructor(private statService: StatService) { }

  ngOnInit() {
    this.statService.getToDayStat().subscribe(data => {
      this.Confirmed = data.cases;
      this.Recovered = this.getPercentage(data.recovered, this.Confirmed );
      this.Deaths = this.getPercentage(data.deaths, this.Confirmed );
      this.Active = this.getPercentage(data.active, this.Confirmed );
      this.pieChartData = [this.Deaths, this.Active, this.Recovered];
      console.log(data);
      console.log(this.Recovered);
      console.log(this.Deaths);
      console.log(this.Active);
    });
  }

  /**
   * calcul of the percentage
   * @param a
   * @param b
   */
  getPercentage(a, b) {
    const result = a * 100 / b;
    return result;
  }
}

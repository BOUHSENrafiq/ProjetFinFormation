import { Component, OnInit } from '@angular/core';
import {StatService} from '../services/stat.service';

@Component({
  selector: 'app-tests-table',
  templateUrl: './tests-table.component.html',
  styleUrls: ['./tests-table.component.css']
})
export class TestsTableComponent implements OnInit {
  Affected: number;
  Tested: number;
  Healthy: number;
  constructor(private statService: StatService) { }
  ngOnInit(): void {
    // get today statistics.
    this.statService.getToDayStat().subscribe(data => {
      this.Affected = data.cases;
      this.Tested = data.tests;
      this.Healthy = Math.abs(this.Tested - this.Affected);
      //  show data on the console
      console.log(data);
      console.log(this.Affected);
      console.log(this.Tested);
      console.log(this.Healthy);
    });
  }
}

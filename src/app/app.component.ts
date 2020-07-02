import { Component, OnInit } from '@angular/core';
// import './rx-operators/mergeMap';
import './rx-operators/transformation/concatMap'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-playground';
  constructor() {}
  ngOnInit() {}
}

import { Component, OnInit, AfterViewInit } from '@angular/core';

// import './rx-operators/transformation/concatMap'
// import './rx-operators/transformation/bufferTime'
// import './rx-operators/utility/delay'
// import './rx-operators/filtering/takeUntil'
// import './rx-operators/filtering/throttleTime'
// import './rx-operators/filtering/distinctUntilChange'
// import dbs from './rx-operators/filtering/debounceTime'
// import { combineLatestWrapper } from './rx-operators/Combination/combineLatest';
// import './Subjects/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-playground';
  constructor() {}
  ngOnInit() {}
  ngAfterViewInit() {
    // combineLatestWrapper();
  }
}

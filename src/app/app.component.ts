import { Component, OnInit } from '@angular/core';
import * as CObs from './customObservable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-playground';
  constructor() {}
  ngOnInit() {
    const timerSub = CObs.timer([1, 2, 3]).subscribe({
      next: console.log,
      complete: () => console.log('Done'),
      error: () => {},
    });

    const progressSub = CObs.progressBar$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Progress Done'),
    });

    setTimeout(() => {
      timerSub.unsubscribe();
      progressSub.unsubscribe();
      console.log('Observable Unsubscribed');
    }, 10000);
  }
}

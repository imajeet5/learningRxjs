import { Component, OnInit } from '@angular/core';
import * as CObs from './customObservable';

@Component({
  selector: 'app-custom-observables',
  templateUrl: './custom-observables.component.html',
  styleUrls: ['./custom-observables.component.css'],
})
export class CustomObservablesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const timerSub = CObs.timer([1, 2, 3]).subscribe({
      next: console.log,
      complete: () => console.log('Done'),
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

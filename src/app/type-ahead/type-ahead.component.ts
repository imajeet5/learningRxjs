import { Component, OnInit, AfterViewInit } from '@angular/core';
import { fromEvent, of, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
  delay,
} from 'rxjs/operators';

@Component({
  selector: 'app-type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.css'],
})
export class TypeAheadComponent implements OnInit, AfterViewInit {
  autoFill$: Observable<any>;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    fromEvent(document.getElementById('type-ahead'), 'keyup')
      .pipe(
        debounceTime(200),
        map((e: any) => e.target.value),
        distinctUntilChanged(),
        switchMap(this.fakeContinentsRequest),
        tap((c) => (document.getElementById('output').innerText = c.join('\n')))
      )
      .subscribe();
  }

  fakeContinentsRequest = (keys) =>
    of(this.getContinents(keys)).pipe(
      delay(100),
      tap((_) => console.log(`API CALL at ${new Date()}`))
    );

  getContinents = (keys) =>
    [
      'africa',
      'antarctica',
      'asia',
      'australia',
      'europe',
      'north america',
      'south america',
    ].filter((e) => e.indexOf(keys.toLowerCase()) > -1);
}

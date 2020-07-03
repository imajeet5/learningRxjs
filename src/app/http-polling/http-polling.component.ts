import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  Observable,
  Subscription,
  of,
  fromEvent,
  from,
  empty,
  merge,
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  mapTo,
  switchMap,
  tap,
  mergeMap,
  takeUntil,
  filter,
  finalize,
  mergeMapTo,
  switchMapTo,
  take,
  debounceTime,
} from 'rxjs/operators';

declare type RequestCategory = 'cats' | 'meats';
// Constants for Cat Requests
// const CATS_URL = 'https://placekitten.com/g/{w}/{h}';
// const MEATS_URL = 'https://baconipsum.com/api/?type=meat-and-filler';

@Component({
  selector: 'app-http-polling',
  templateUrl: './http-polling.component.html',
  styleUrls: ['./http-polling.component.css'],
})
export class HttpPollingComponent implements OnInit, AfterViewInit {
  requestCategory: RequestCategory = 'cats';
  startButton: HTMLElement;
  stopButton: HTMLElement;
  text: HTMLElement;
  pollingStatus: HTMLElement;
  catsRadio: HTMLElement;
  meatsRadio: HTMLElement;
  catImage: HTMLImageElement;
  Obs: {
    catsRadioButton$: Observable<string>;
    meatsRadioButton$: Observable<string>;
    startPolling$: Observable<Event>;
    stopPolling$: Observable<Event>;
  };
  readonly requestUrls = {
    cats: 'https://placekitten.com/g/{w}/{h}',
    meats: 'https://baconipsum.com/api/?type=meat-and-filler',
  };
  readonly responseMapper = {
    cats(response): Observable<string> {
      return from(
        new Promise<string>((resolve, reject) => {
          var blob = new Blob([response], { type: 'image/png' });
          let reader = new FileReader();
          reader.onload = (data: any) => {
            resolve(data.target.result);
          };
          reader.readAsDataURL(blob);
        })
      );
    },

    meats(response): Observable<string> {
      const parsedData = JSON.parse(response);
      return of(parsedData ? parsedData[0] : '');
    },
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initializeHtmlElements();
    // Handle Form Updates
    this.Obs.catsRadioButton$.subscribe((category: RequestCategory) => {
      this.requestCategory = category;
      this.catImage.style.display = 'block';
      this.text.style.display = 'none';
    });

    this.Obs.meatsRadioButton$.subscribe((category: RequestCategory) => {
      this.requestCategory = category;
      this.catImage.style.display = 'none';
      this.text.style.display = 'block';
    });

    this.Obs.startPolling$
      .pipe(
        // debounceTime(400),
        tap((_) => (this.pollingStatus.innerHTML = 'Started')),
        switchMap(() => this.startPolling())
      )
      .subscribe((data) => {
        // console.log(data);
      });
  }

  startPolling() {
    const stopPolling = this.Obs.stopPolling$;
    const crb = this.Obs.catsRadioButton$;
    const mrb = this.Obs.meatsRadioButton$;
    const reqCatg = this.requestCategory;
    return timer(0, 2000).pipe(
      switchMap(() => this.requestData()),
      tap((result) => this.updateDom(result)),
      takeUntil(
        // stop polling on either button click or change of categories
        merge(stopPolling, merge(crb, mrb).pipe(filter((c) => c !== reqCatg)))
      ),
      // for demo purposes only
      finalize(() => (this.pollingStatus.innerHTML = 'Stopped'))
    );
  }

  requestData(): Observable<string> {
    const url = this.requestUrls[this.requestCategory];
    const mapFunc = this.responseMapper[this.requestCategory];
    const reqCatg = this.requestCategory;

    const xhr = new XMLHttpRequest();
    const xhr$ = from(
      new Promise<string>((resolve, reject) => {
        // This is generating a random size for a placekitten image
        //   so that we get new cats each request.
        const w = Math.round(Math.random() * 400);
        const h = Math.round(Math.random() * 400);
        const targetUrl = url
          .replace('{w}', w.toString())
          .replace('{h}', h.toString());

        console.log(targetUrl);

        xhr.addEventListener('load', () => {
          resolve(xhr.response);
        });
        xhr.open('GET', targetUrl);
        if (reqCatg === 'cats') {
          // Our cats urls return binary payloads
          //  so we need to respond as such.
          xhr.responseType = 'arraybuffer';
        }
        xhr.send();
      })
    ).pipe(switchMap((data) => mapFunc(data)));

    return xhr$;
  }
  updateDom(result) {
    // debugger;
    if (this.requestCategory === 'cats') {
      this.catImage.src = result;
    } else {
      this.text.innerHTML = result;
    }
  }

  initializeHtmlElements() {
    this.startButton = document.getElementById('start');
    this.stopButton = document.getElementById('stop');
    this.text = document.getElementById('text');
    this.pollingStatus = document.getElementById('polling-status');
    this.catsRadio = document.getElementById('catsCheckbox');
    this.meatsRadio = document.getElementById('meatsCheckbox');
    this.catImage = <HTMLImageElement>document.getElementById('cat');

    this.Obs = {
      catsRadioButton$: fromEvent(this.catsRadio, 'click').pipe(mapTo('cats')),
      meatsRadioButton$: fromEvent(this.meatsRadio, 'click').pipe(
        mapTo('meats')
      ),
      startPolling$: fromEvent(this.startButton, 'click'),
      stopPolling$: fromEvent(this.stopButton, 'click'),
    };
  }
}

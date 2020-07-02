import { fromEvent, of, interval } from 'rxjs';
import { mergeMap, delay, map, switchMapTo, mergeMapTo } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// faking network request for save
const saveLocation = (location) => {
  return of(location).pipe(delay(500));
};
// streams
const click$ = fromEvent(document, 'click');

// click$
//   .pipe(
//     mergeMap((e: MouseEvent) => {
//       return saveLocation({
//         x: e.clientX,
//         y: e.clientY,
//         timestamp: Date.now(),
//       });
//     })
//   )
//   .subscribe((r) => console.log('Saved!', r));

// const letters = of('a', 'b', 'c');
// const result = letters.pipe(
//   mergeMap((letter) => interval(1000).pipe(map((i) => letter + i)))
// );
// result.subscribe((x) => console.log(x));

// free api url
const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

click$
  .pipe(
    /*
     * Using mergeMap for example, but generally for GET requests
     * you will prefer switchMap.
     * Also, if you do not need the parameter like
     * below you could use mergeMapTo instead.
     * ex. mergeMapTo(ajax.getJSON(API_URL))
     */
    mergeMapTo(ajax.getJSON(API_URL))
  )
  // { userId: 1, id: 1, ...}
  .subscribe(console.log);

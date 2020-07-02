import { fromEvent, interval, merge } from 'rxjs';
import { map, mergeAll, take, mergeMap, mapTo } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const higherOrder = clicks.pipe(map((ev) => interval(1000)));
const firstOrder = higherOrder.pipe(mergeAll());
firstOrder.subscribe((x) => console.log(x));

const higherOrder2 = clicks.pipe(map((ev) => interval(1000).pipe(take(10))));
const firstOrder2 = higherOrder2.pipe(mergeAll(2));
firstOrder2.subscribe((x) => console.log(x));

// merge is a function that take in different observable and emit value as a single observable
const intA$ = interval(750).pipe(take(3));
const intB$ = interval(1000).pipe(take(3));
merge(intA$, intB$).subscribe(
  console.log
);

//MergeAll is an operator that will flatten the value coming from all the observable into a single stream
const int$ = interval(1000).pipe(
  take(2),
  map((int) => interval(500).pipe(take(3)), mergeAll())
);

//This operator allows for reducing the number of used operators. In fact, this one is a combination of map() (returning an observable) and mergeAll() operators.
const int2$ = interval(1000).pipe(
  take(2),
  mergeMap((int) => interval(500).pipe(take(3)))
);

//The same rules apply for concat(), concatAll() and concatMap(), except here one observable must complete before another starts emitting values.

import { fromEvent, interval } from 'rxjs';
import { map, mergeAll, take } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const higherOrder = clicks.pipe(map((ev) => interval(1000)));
const firstOrder = higherOrder.pipe(mergeAll());
firstOrder.subscribe((x) => console.log(x));

const higherOrder2 = clicks.pipe(map((ev) => interval(1000).pipe(take(10))));
const firstOrder2 = higherOrder2.pipe(mergeAll(2));
firstOrder2.subscribe((x) => console.log(x));

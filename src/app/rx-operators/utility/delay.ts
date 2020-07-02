import { fromEvent, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');


// so takeUntil will let the value of from the observable pass until the observable passed in the takeUntil
//of(event).pipe(delay(700), takeUntil(mouseup$)) this will return a new observable, which will only emit value if there has not
// been a mouse up event fired within that period of time
mousedown$
  .pipe(mergeMap((event) => of(event).pipe(delay(700), takeUntil(mouseup$))))
  .subscribe((event) => console.log('Long Press!', event));

// const clicks = fromEvent(document, 'mousedown');
// const delayedClicks = clicks.pipe(delay(1000));
// delayedClicks.subscribe((x) => console.log('After Delay ', x));

import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//emit value every 1s
const source = interval(1000);
//after 5 seconds, emit value
const timer$ = timer(5000);

//when timer emits after 5s, complete source
const example = source.pipe(takeUntil(timer$));
//output: 0,1,2,3
const subscribe = example.subscribe(val => console.log(val));

/**
 * As takeUntil mark the observable as complete, so we don't need to unsubscribe from the observable where we have used take, takeUntil
 */

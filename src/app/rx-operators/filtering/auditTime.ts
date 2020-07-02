/**
 * When you are interested in ignoring a source observable for a given amount of time, you can use auditTime. A possible use case is to only emit certain events (i.e. mouse clicks) at a maximum rate per second. After the specified duration has passed, the timer is disabled and the most recent source value is emitted on the output Observable, and this process repeats for the next source value.
 * This is mostly use for Rate Limiting
 *  If you want the timer to reset whenever a new event occurs on the source observable, you can use debounceTime
 *
 */

import { fromEvent, of, interval } from 'rxjs';
import { auditTime } from 'rxjs/operators';

// Create observable that emits click events
const source = fromEvent(document, 'click');
// const source = interval(5000)
// Emit clicks at a rate of at most one click per second
const example = source.pipe(auditTime(1000))
// Output (example): '(1s) --- Clicked --- (1s) --- Clicked'
const subscribe = example.subscribe(val => console.log('Clicked'));

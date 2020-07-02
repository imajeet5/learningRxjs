//Emit first value then ignore for specified duration
// this is similar to audit time, the difference is that this emit the first value then silence. This emit the first value
// while audit time emit the last value that has been emitted in the silenced period.
import { interval } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

// emit value every 1 second
const source = interval(1000);
/*
  emit the first value, then ignore for 5 seconds. repeat...
*/
const example = source.pipe(throttleTime(5000));
// output: 0...6...12
const subscribe = example.subscribe(val => console.log(val));

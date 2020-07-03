//Only emit when the current value is different than the last.
import { from, fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  pluck,
} from 'rxjs/operators';

// only output distinct values, based on the last emitted value
const source$ = from([1, 1, 2, 2, 3, 3]);

source$
  .pipe(distinctUntilChanged())
  // output: 1,2,3
  .subscribe(console.log);

/*************************distinctUntilKeyChanged**************************** */

//Only emit when the specified key value has changed

// only output distinct values, based on the last emitted value
const source2$ = from([
  { name: 'Brian' },
  { name: 'Joe' },
  { name: 'Joe' },
  { name: 'Sue' },
  { name: 'Brian' },
]);

source2$
  // custom compare based on name property
  .pipe(distinctUntilKeyChanged('name'))
  // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
  .subscribe(console.log);

const keys$ = fromEvent(document, 'keyup').pipe(
  distinctUntilKeyChanged<KeyboardEvent>('code'),
  pluck('key')
);

keys$.subscribe(console.log);

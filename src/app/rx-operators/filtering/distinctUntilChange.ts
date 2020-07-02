//Only emit when the current value is different than the last.
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// only output distinct values, based on the last emitted value
const source$ = from([1, 1, 2, 2, 3, 3]);

source$
  .pipe(distinctUntilChanged())
  // output: 1,2,3
  .subscribe(console.log);

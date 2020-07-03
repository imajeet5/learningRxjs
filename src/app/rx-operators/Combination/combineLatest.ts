import { fromEvent, combineLatest } from 'rxjs';
import { mapTo, startWith, scan, tap, map } from 'rxjs/operators';

//combineLatest combines the values from all the Observables passed as arguments. This is done by subscribing to each Observable in order and, whenever any Observable emits, collecting an array of the most recent values from each Observable. So if you pass n Observables to operator, returned Observable will always emit an array of n values, in order corresponding to order of passed Observables (value from the first Observable on the first place and so on).

export const combineLatestWrapper = () => {
  document.querySelector('.container').innerHTML = html;
  const redTotal = document.getElementById('red-total');
  const blackTotal = document.getElementById('black-total');
  const total = document.getElementById('total');

  const addOneClick$ = (id) =>
    fromEvent(document.getElementById(id), 'click').pipe(
      // map every click to 1
      mapTo(1),
      // keep a running total
      scan((acc, curr) => acc + curr, 0),
      startWith(0)
    );

  combineLatest(addOneClick$('red'), addOneClick$('black')).subscribe(
    ([red, black]: any) => {
      console.log(`Red: ${red}; Black: ${black}`);
      redTotal.innerHTML = red;
      blackTotal.innerHTML = black;
      total.innerHTML = red + black;
    }
  );
};

export const html = `
<div>
  <button id="red">Red</button>
  <button id="black">Black</button>
</div>
<div>Red: <span id="red-total"></span></div>
<div>Black: <span id="black-total"></span></div>
<div>Total: <span id="total"></span></div>`;

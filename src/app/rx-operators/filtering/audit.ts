import { fromEvent, interval, of } from 'rxjs';
import { audit } from 'rxjs/operators'

// It's like auditTime, but the silencing duration is determined by a second Observable.

const clicks = fromEvent(document, 'click');
// const stream = of(1, 2, 3, 4, 5);
// clicks.subscribe(e=> console.log('Clicked At ', Date.now()))
const result = clicks.pipe(audit(ev => interval(1000)));
result.subscribe(x => console.log(x));

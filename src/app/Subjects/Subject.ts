//A special type of Observable which shares a single execution path among observers
// Subject is Hot and MultiCast by default but
// calling pipe on Subject return a new observable that is cold and UniCast, which all observables are by default

//Cold means: only emits value when the observable is subscribed. Source is inside the observable
//Hot means: emit value even if no one is subscribed to the observable. Source is outside the observable
//UniCast: operators in pipe runs once for each observable
//MultiCast: operator in pipe runs once, does not depend on the number of subscribers

import { Subject } from 'rxjs';
import { tap, share } from 'rxjs/operators';

const subject = new Subject();

const observable = subject.asObservable().pipe(
tap((value) => console.log('in pipe', value)), share()
);

observable.subscribe((value) => console.log('in subscription 1', value));
observable.subscribe((value) => console.log('in subscription 2', value));

subject.next(10);
subject.next(20);
subject.next(30);

// subject.subscribe((value) => console.log(value));

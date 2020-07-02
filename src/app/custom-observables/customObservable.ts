import * as Rx from 'rxjs';

export const timer = (events) => {
  const INTERVAL = 1 * 1000;
  let schedulerId;
  return {
    subscribe: (observer: ObserverType) => {
      // this will emit the value of array every second, until array is exhausted
      schedulerId = setInterval(() => {
        if (events.length === 0) {
          observer.complete();
          clearInterval(schedulerId);
          schedulerId = undefined;
        } else {
          observer.next(events.shift());
        }
      }, INTERVAL);
      return {
        unsubscribe: () => {
          if (schedulerId) {
            clearInterval(schedulerId);
          }
        },
      };
    },
  };
};

export interface ObserverType {
  next: Function;
  complete: Function;
}

export const progressBar$: Rx.Observable<number> = Rx.Observable.create(
  (observer: Rx.Observer<number>) => {
    const OFFSET = 3000;
    const SPEED = 50;
    let val = 0;
    let timeoutId = 0;
    // this function will be called when initially by the setTimeout function below
    function progress() {
      if (++val <= 100) {
        observer.next(val);
        timeoutId = setTimeout(progress, SPEED);
      } else {
        observer.complete();
      }
    }
    // this starts the observable, then this function is called recursively
    timeoutId = setTimeout(progress, OFFSET);
    return () => {
      clearTimeout(timeoutId);
    };
  }
);

// export const mapString =

export function exclude(predicate): Rx.Observable<any> {
  return Rx.Observable.create((subscriber: Rx.Observer<any>) => {
    let source = this as Rx.Observable<any>;
    return source.subscribe(
      (value) => {
        try {
          if (!predicate(value)) {
            subscriber.next(value);
          }
        } catch (err) {
          subscriber.error(err);
        }
      },
      (err) => subscriber.error(err),
      () => subscriber.complete()
    );
  });
}
// Rx.Observable.prototype.exclude = exclude;

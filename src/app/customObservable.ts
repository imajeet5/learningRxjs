import * as Rx from 'rxjs';

export const timer = (events) => {
  const INTERVAL = 1 * 1000;
  let schedulerId;
  return {
    subscribe: (observer: Rx.Observer<number>) => {
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
    function progress() {
      if (++val <= 100) {
        observer.next(val);
        timeoutId = setTimeout(progress, SPEED);
      } else {
        observer.complete();
      }
    }
    timeoutId = setTimeout(progress, OFFSET);
    return () => {
      clearTimeout(timeoutId);
    };
  }
);

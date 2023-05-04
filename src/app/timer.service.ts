import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerSub: Subscription | null = null;
  private count = new BehaviorSubject<number>(0);
  private intervalTime: number = 1000;

  constructor() {}

  startTimer(intervalTime: number): void {
    this.stopTimer();
    this.intervalTime = intervalTime;
    const source = timer(this.intervalTime, this.intervalTime);
    this.timerSub = source.subscribe(() => {
      this.count.next(this.count.value + 1);
    });
  }

  stopTimer(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

  getCount(): BehaviorSubject<number> {
    return this.count;
  }
}

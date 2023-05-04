import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  intervalTime: number = 1000;
  count$: Observable<number>;
  countSub: Subscription;

  constructor(private timerService: TimerService) {
    this.count$ = timerService.getCount().asObservable();
  }

  ngOnInit(): void {
    this.countSub = this.timerService.getCount().subscribe();
  }

  ngOnDestroy(): void {
    if (this.countSub) {
      this.countSub.unsubscribe();
    }
  }

  startTimer(): void {
    this.timerService.startTimer(this.intervalTime);
  }

  stopTimer(): void {
    this.timerService.stopTimer();
  }
}

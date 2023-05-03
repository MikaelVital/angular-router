import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  seconds: number = 0;
  remainingTime$: Observable<number>;
  countdownSub: Subscription;

  constructor(private timerService: TimerService) {
    this.remainingTime$ = timerService.getCountdown().asObservable();
  }

  ngOnInit(): void {
    this.countdownSub = this.timerService.getCountdown().subscribe();
  }

  ngOnDestroy(): void {
    if (this.countdownSub) {
      this.countdownSub.unsubscribe();
    }
  }

  startTimer(): void {
    this.timerService.startTimer(this.seconds);
  }

  stopTimer(): void {
    this.timerService.stopTimer();
  }
}

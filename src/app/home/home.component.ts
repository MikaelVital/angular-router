import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimerService, BitcoinPrice, BitcoinRate } from '../timer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bitcoinRates$: Observable<BitcoinRate[]>;
  ratesSub: Subscription;

  constructor(private timerService: TimerService) {
    this.bitcoinRates$ = timerService.getBitcoinRates().asObservable();
  }

  ngOnInit(): void {
    this.timerService.startTimer();
    this.ratesSub = this.timerService.getBitcoinRates().subscribe();
  }

  ngOnDestroy(): void {
    this.timerService.stopTimer();
    if (this.ratesSub) {
      this.ratesSub.unsubscribe();
    }
  }
}

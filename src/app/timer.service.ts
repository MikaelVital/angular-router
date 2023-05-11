import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';

export interface BitcoinRate {
  time: string;
  rateUSD: number;
  rateBRL: number;
}

export interface BitcoinPrice {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  chartName: string;
  bpi: {
    USD: {
      code: string;
      symbol: string;
      rate: string;
      description: string;
      rate_float: number;
    };
    BRL: {
      code: string;
      symbol: string;
      rate: string;
      description: string;
      rate_float: number;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerSub: Subscription;
  private bitcoinRates = new BehaviorSubject<BitcoinRate[]>([]);
  private lastRate: BitcoinRate = { time: '', rateUSD: 0, rateBRL: 0 };

  constructor(private http: HttpClient) {}

  startTimer(): void {
    this.stopTimer();
    const source = timer(0, 3000); // Atualiza a cada 3 segundos
    this.timerSub = source.subscribe(() => this.fetchBitcoinPrice());
  }

  stopTimer(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

  fetchBitcoinPrice(): void {
    this.http
      .get<BitcoinPrice>(
        'https://api.coindesk.com/v1/bpi/currentprice/BRL.json'
      )
      .pipe(
        map((price) => ({
          time: price.time.updated,
          rateUSD: price.bpi.USD.rate_float,
          rateBRL: price.bpi.BRL.rate_float,
        }))
      )
      .subscribe((rate) => {
        if (
          rate.rateUSD !== this.lastRate.rateUSD ||
          rate.rateBRL !== this.lastRate.rateBRL
        ) {
          const currentRates = this.bitcoinRates.getValue();
          currentRates.push(rate);
          this.bitcoinRates.next(currentRates);
          this.lastRate = rate;
        }
      });
  }

  getBitcoinRates(): BehaviorSubject<BitcoinRate[]> {
    return this.bitcoinRates;
  }
}

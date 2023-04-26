import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mult-table',
  templateUrl: './mult-table.component.html',
  styleUrls: ['./mult-table.component.css'],
})
export class MultTableComponent implements OnInit {
  constructor() {}
  numero: number = 0;
  tabuada: { numero: number; multiplicador: number; resultado: number }[] = [];

  gerarTabuada(): void {
    this.tabuada = [];
    for (let i = 1; i <= 10; i++) {
      this.tabuada.push({
        numero: this.numero,
        multiplicador: i,
        resultado: this.numero * i,
      });
    }
  }
  ngOnInit() {}
}

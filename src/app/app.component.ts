import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WeatherApp';
  numbers: Array<number> = [];

  constructor() {
    this.numbers = Array(5).fill(0).map((x,i)=>i);
  }
}

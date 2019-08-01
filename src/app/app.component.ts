import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Weather App';

  /** array of random number */
  public numbers: Array<number> = [];

  constructor() {
    /** array of 9 random number to display panel */
    this.numbers = Array(9).fill(0).map((x,i)=>i);
  }
}

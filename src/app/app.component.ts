import { Component } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { UtilityService } from './shared/service/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Weather App';

  /** array of random number */
  public numbers: Array<number> = [];

  public online$: Observable<boolean>;

  constructor(
    private utilityService: UtilityService
  ) {
    /** array of 9 random number to display panel */
    this.numbers = Array(9).fill(0).map((x, i) => i);

    /** Check network status by using window events */
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    )
    this.networkStatus()
  }

  public networkStatus() {
    this.online$.subscribe(value => {
      if (!value) {
        alert('“you are offline”, we might want to load cached data if available.')
      }
      this.utilityService.setNetworkStatus(value);
    })
  }
}

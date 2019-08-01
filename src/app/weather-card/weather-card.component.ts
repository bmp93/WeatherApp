import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from './weather.service';
import { interval, timer } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { UtilityService } from '../shared/service/utility.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  providers: [WeatherService]
})
export class WeatherCardComponent implements OnInit {
  /** used to display error message  */
  public message: string = null;

  /** Instance of formGroup to get user input */
  public weatherSearchForm: FormGroup;

  /** Stores weather details of searched location */
  public weatherDetail: any;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    /** initialize form */
    this.initForm();
  }

  initForm() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  getWeatherDetail() {
    /** check internet connection is available or not */
    const status = this.utilityService.getNetworkStatus();
    if (status) {
      this.loadWeatherDetailFromServer();
    } else {
      this.loadCachedWeatherDetail();
    }
  }

  loadWeatherDetailFromServer() {
    /** timer : use to send 1st request without delay & then start polling by interval of 3 minute  */
    timer(0, 3 * 60 * 1000)
      .pipe(
        /** Cancels the previous request and make only one subscription active */
        switchMap(() => this.weatherService.loadWeather(this.weatherSearchForm.value.location))
      )
      .subscribe((result) => {
        if (!result) {
          this.message = 'No Record Found';
          this.weatherDetail = null;
          return;
        }
        this.weatherDetail = result;
        this.message = null;
        /** set detail along with city name in localstorage */
        localStorage.setItem(this.weatherSearchForm.value.location, JSON.stringify(result));
      }, (error) => {
        this.message = error.error.message;
      });
  }

  loadCachedWeatherDetail() {
    this.weatherService.loadWeatherDetailFromLocal(this.weatherSearchForm.value.location).subscribe(result => {
      if (!result) {
        this.message = 'No Data Available in Cache';
        this.weatherDetail = null;
        return;
      }
      this.weatherDetail = result;
      this.message = null;
    });
  }

  onEdit() {
    this.weatherDetail = null;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from './weather.service';
import { interval, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  providers: [WeatherService]
})
export class WeatherCardComponent implements OnInit {
  public message: string = null;
  public weatherSearchForm: FormGroup;
  public weatherDetail: any;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {

    this.initForm();
  }

  initForm() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  getWeatherDetail() {
    timer(0, 1 * 60 * 1000)
      .pipe(
        mergeMap(() => this.weatherService.loadWeather(this.weatherSearchForm.value.location))
      )
      .subscribe((result) => {
        if (!result) {
          this.message = 'No Record Found';
          this.weatherDetail = null;
          return;
        }
        this.weatherDetail = result;
        this.message = null;
        localStorage.setItem(this.weatherSearchForm.value.location, JSON.stringify(result));
      }, (error) => {
        this.message = error.error.message;
      });
  }

  onEdit() {
    this.weatherDetail = null;
  }
}

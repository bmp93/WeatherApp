# Weather App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8 & [OpenWeatherMap API](https://openweathermap.org/api)

## Feature

1. The app consists of a grid of 9 panels(User can add/remove panel by enter number of panel in given input box) and asking the user to enter the city name. On entering the name, the panel shows weather data for that city.
2. User can also edit city by clicking on edit icon available on right corner of that panel.
3. Weather details for individual panel will be updated by interval of 3 minutes without manual refresh.
4. In case of no network availability it prompts user to their offline state and on search, load data from local-storage if available.
5. Badge which is available besides the app title, displays the app mode(Online/Offline).

## Dependencies

- For user interaction [Angular 7](https://angular.io/)
- For Icon [Font Awesome](https://fontawesome.com/)
- For UI Development [Bootstrap 4](https://getbootstrap.com/)
- For weather details [OpenWeatherMap API](https://openweathermap.org/api)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
# MortgageCalculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

In addition, page is published using a CD to [this website](https://main--dani-mortgage-calculator.netlify.app).

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## DEV NOTES

- Style: Sass as a default preprocessor. Added angular material for some elements. I didn't see any specific mobile design in Figma, but I addapted the UI for any screen resolution (following my criteria).
  I'm not totally sure if we wanted to have Go Back / Next Step buttons and other elements as well not related to this. If that's necessary let me know and I'll add them.
  Added number formatting.
- Components: Created 2 components ([mortgage-form](https://github.com/erperejildo/mortgage-calculator/tree/main/src/app/mortgage-form) and [mortgage-result](https://github.com/erperejildo/mortgage-calculator/tree/main/src/app/mortgage-result)) to display each card. Probably, the simple UI, doesn't really need more than one component for this, but I thought it was a good idea to divide this in case, the app grows.
- Lazy loading: Following previous idea, the app uses lazy loading in case we need to add more and more componets to it.
- Share info: Initially, I was passing information between components using `@Input`/`@Output`/`EventEmitter` (check [here](https://github.com/erperejildo/mortgage-calculator/commit/0e1ebb5863815a97046bf3d07efeebf458790f2f)), but after implementing lazy loading, I created a [service](https://github.com/erperejildo/mortgage-calculator/blob/main/src/app/services/mortgage.service.ts) for this, separating the logic.
- Routing: Since this is not really needed (it just a home page), this is not created, but I pushed [some example](https://github.com/erperejildo/mortgage-calculator/commit/632c8c8bc903b93b9c6b04cd709bd6186b8b54af) in case we wanted some routes.
- Unit tests: Added. Just run `ng test`.
- Mortgage calculation: I'm still not sure about the "borrowing amount". It probably has some miscalculation, but it is due to my lack of info regarding this topic in particular.
- Validation: I added a simple validation for all inputs showing a text in one component and hidding the values in the other.
- Accessibility: Covered both components with necessary arias, tooltips, etc., as well created a correct skeleton to improve SEO. Page was also tested using keyboard only and in dark mode.

## SCREENSHOTS

![image](https://github.com/user-attachments/assets/e270d508-f5d7-4289-8dbd-86873f8382ec)

![image](https://github.com/user-attachments/assets/a1a29595-e3da-4daa-a023-4c8904218b44)

![image](https://github.com/user-attachments/assets/a9f7524f-95c4-4fb7-9e32-a4a4799d4d03)


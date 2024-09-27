import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-mortgage-forms></app-mortgage-forms>
      <app-mortgage-result></app-mortgage-result>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}

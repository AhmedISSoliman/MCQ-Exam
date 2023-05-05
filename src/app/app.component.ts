import { Component } from '@angular/core';
import { AuthService } from './account/services/auth.service';
import { LocalizationService } from './shared/services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private localizationService: LocalizationService,
    private authService: AuthService
  ) {
    var currentLanguage = this.localizationService.getCurrentLanguage();
    this.localizationService.changeAppLang(currentLanguage);

    this.getUserData();
  }
  title = 'MCQ-Exam';

  getUserData() {
    this.authService.getUserData().subscribe(res => {
      this.authService.userDataSubject.next(res);
    })
  }
}

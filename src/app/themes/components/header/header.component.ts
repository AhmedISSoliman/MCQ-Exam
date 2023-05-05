import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AuthService } from 'src/app/account/services/auth.service';
import { LocalizationService } from './../../../shared/services/localization.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentLanguage: string = 'ar';
  userData: any;
  constructor(
    private translateService: TranslateService,
    private localizationService: LocalizationService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.currentLanguage = this.localizationService.getCurrentLanguage();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    })
    this.authService.userDataSubject.subscribe((res: any) => {
      if (res?.role) {
        this.userData = res;
      }
    });
  }
  logout() {
    const model = {}
    this.authService.logout(model).subscribe();
  }
  changeLanguage(lang: string) {
    this.localizationService.changeAppLang(lang);
  }
}

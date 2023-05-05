import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private translate: TranslateService) { }
  getCurrentLanguage() {
    return localStorage.getItem('language') || 'ar'
  }
  changeAppTheme(lang: string) {
    if (lang == 'ar') {
      document.dir = 'rtl',
        document.documentElement.lang = lang;
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    }
    else {
      document.dir = 'ltr';
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
    document.documentElement.lang = lang;
  }
  changeAppLang(lang: string) {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.changeAppTheme(lang);
  }
}

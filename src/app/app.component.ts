import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    const browserLang = this.translate.getBrowserLang() || 'en';
    const isMexico = navigator.language?.toLowerCase().includes('es-mx');
  
    const langToUse = isMexico ? 'es' : (browserLang.match(/en|es/) ? browserLang : 'en');
    this.translate.use(langToUse);
  }
  
  
}
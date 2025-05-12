import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  navigateExternal(url: string, target = '_blank') {
    window.open(url, target);
  }

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}

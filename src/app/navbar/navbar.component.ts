import {Component} from '@angular/core';
import {NavigationService} from '../services/navigation.service';

@Component({
  selector: 'ma-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  constructor(private navigationService: NavigationService) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  goToStart() {
    this.navigationService.scrollToElement('ma-hero');
    this.isMobileMenuOpen = false;
  }

  goToContact() {
    this.navigationService.scrollToElement('contact');
    this.isMobileMenuOpen = false;
  }

  goToWho() {
    this.navigationService.scrollToElement('who');
    this.isMobileMenuOpen = false;
  }
}

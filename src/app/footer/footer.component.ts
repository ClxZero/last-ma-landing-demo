import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationService} from '../services/navigation.service';

@Component({
  selector: 'ma-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
})
export class FooterComponent {
  constructor(
    private router: Router,
    private navigationService: NavigationService,
  ) {}

  links: {text: string; link: string}[] = [
    {text: 'Inicio', link: '#'},
    {text: 'Política de Privacidad', link: 'pop'},
    {text: 'Terminos de Servicio', link: 'tos'},
  ];

  contactInfo: {text: string; link: string | false}[] = [
    {text: '+5691231231', link: 'tel:+5691231231'},
    {
      text: 'thisis@ademo.cl',
      link: 'mailto:notworking@demodemodemo.cl',
    },
    {text: 'Háblanos por whatsapp', link: 'https://wa.me/00008'},
    {
      text: 'Las Condes, Santiago, Chile.',
      link: 'https://maps.google.com/?q=Av.+Las+Condes',
    },
  ];

  footerLink(link: string | false): void {
    if (!link) return;

    if (
      link.startsWith('http') ||
      link.startsWith('tel:') ||
      link.startsWith('mailto:')
    ) {
      if (link === 'https://wa.me/00008') {
        console.log('unavailable, this is just for show');
      }

      window.open(link, '_blank');
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.router.navigateByUrl(link);
    }
  }

  goToStart() {
    this.navigationService.scrollToElement('ma-hero');
  }
}

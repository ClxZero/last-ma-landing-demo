/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationService} from '../../services/navigation.service';
import {TextObject} from '../../models/csvtexts';
import {TextMapperService} from '../../services/text-mapper.service';

@Component({
  selector: 'hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnChanges {
  @Input() text: TextObject[] = [{_key: '', text: ''}];
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private textMapper: TextMapperService,
  ) {}

  hero_title = '';
  hero_sub_title = '';
  hero_button_cta = '';
  hero_button_contact = '';

  // TODO: After fixing the email links, add a query param register here so we can add it to Sentry data

  goToApp() {
    this.navigationService.navigateExternal('https://app.monitoraustral.cl/');
  }

  goToContact() {
    this.navigationService.scrollToElement('contact');
  }

  ngAfterViewInit() {
    console.log('This is a demo webpage');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && changes['text'].currentValue) {
      this.text = [...changes['text'].currentValue]; // Clone the array to avoid revertion
      this.textMapper.fillData(this, this.text);
    }
  }
}

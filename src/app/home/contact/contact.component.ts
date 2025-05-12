import {isPlatformBrowser} from '@angular/common';
import {
  Component,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import {TextObject} from '../../models/csvtexts';
import {TextMapperService} from '../../services/text-mapper.service';

@Component({
  selector: 'contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit, OnChanges {
  @Input() text: TextObject[] = [{_key: '', text: ''}];

  contact_title = '';
  contact_sub_title = '';

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    private textMapper: TextMapperService,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      {
        this.ngZone.runOutsideAngular(() => {
          const script = document.createElement('script');
          script.src = 'https://assets.calendly.com/assets/external/widget.js'; // This is Calendly's widget script
          script.async = true;
          document.body.appendChild(script);
        });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && changes['text'].currentValue) {
      this.text = [...changes['text'].currentValue]; // Clone the array to avoid revertion
      this.textMapper.fillData(this, this.text);
    }
  }
}

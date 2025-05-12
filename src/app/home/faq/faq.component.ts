import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FaqcardComponent} from './faqcard/faqcard.component';
import {CommonModule} from '@angular/common';
import {TextObject} from '../../models/csvtexts';
import {TextMapperService} from '../../services/text-mapper.service';

@Component({
  selector: 'faq',
  imports: [FaqcardComponent, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent implements OnChanges {
  @Input() text: TextObject[] = [{_key: '', text: ''}];

  faq_title = '';
  faq_object!: TextObject[];
  faqs: {title: string; text: string}[] = [];

  constructor(private textMapper: TextMapperService) {}

  extractTexts(input: string): {title: string; text: string}[] {
    const regex = /title:\s*\[(.*?)\]\s*text:\s*\[(.*?)\]/g;
    const matches = [...input.matchAll(regex)];
    return matches
      .map(match => ({
        title: match[1].trim(),
        text: match[2].trim(),
      }))
      .filter(item => item.title !== '' && item.text !== '');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && changes['text'].currentValue) {
      this.text = [...changes['text'].currentValue]; // Clone the array to avoid revertion

      this.textMapper.fillData(this, this.text);

      if (this.faq_object) {
        this.faq_object.forEach(x => {
          const extraction = this.extractTexts(x.text);
          if (extraction.length) {
            this.faqs.push(this.extractTexts(x.text)[0]);
          }
        });
      }
    }
  }
}

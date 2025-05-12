import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TextObject} from '../../models/csvtexts';
import {TextMapperService} from '../../services/text-mapper.service';

@Component({
  selector: 'who',
  imports: [],
  templateUrl: './who.component.html',
  styleUrl: './who.component.scss',
})
export class WhoComponent implements OnChanges {
  @Input() text: TextObject[] = [{_key: '', text: ''}];

  who_title = '';
  who_text = '';

  constructor(private textMapper: TextMapperService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && changes['text'].currentValue) {
      this.text = [...changes['text'].currentValue]; // Clone the array to avoid revertion
      this.textMapper.fillData(this, this.text);
    }
  }
}

import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TextObject} from '../../models/csvtexts';
import {TextMapperService} from '../../services/text-mapper.service';

@Component({
  selector: 'screenshots',
  imports: [],
  templateUrl: './screenshots.component.html',
  styleUrl: './screenshots.component.scss',
})
export class ScreenshotsComponent implements OnChanges {
  @Input() text: TextObject[] = [{_key: '', text: ''}];

  ss_title = '';
  ss_1 = '';
  ss_2 = '';

  constructor(private textMapper: TextMapperService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && changes['text'].currentValue) {
      this.text = [...changes['text'].currentValue]; // Clone the array to avoid revertion
      this.textMapper.fillData(this, this.text);
    }
  }
}

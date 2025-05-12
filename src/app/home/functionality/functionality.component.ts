import {
  Component,
  Inject,
  Input,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import {FuncardComponent} from './funcard/funcard.component';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {TextObject} from '../../models/csvtexts';
import {TextMapperService} from '../../services/text-mapper.service';
import {AnimationOptions, LottieComponent} from 'ngx-lottie';

@Component({
  selector: 'functionality',
  imports: [CommonModule, FuncardComponent, LottieComponent],
  templateUrl: './functionality.component.html',
  styleUrl: './functionality.component.scss',
})
export class FunctionalityComponent {
  @Input() text: TextObject[] = [{_key: '', text: ''}];

  func_title = '';
  func_object!: TextObject[];

  functionalities: {title: string; text: string}[] = [];

  lottieOptions: AnimationOptions = {
    path: '../../../assets/imgs/func/func-circle.json',
    loop: true,
    autoplay: true,
  };

  isBrowser = false;

  constructor(
    private textMapper: TextMapperService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

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

      if (this.func_object) {
        this.func_object.forEach(x => {
          const extraction = this.extractTexts(x.text);
          if (extraction.length) {
            this.functionalities.push(this.extractTexts(x.text)[0]);
          }
        });
      }
    }
  }
}

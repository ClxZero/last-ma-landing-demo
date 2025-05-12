import {
  Component,
  Inject,
  Input,
  OnChanges,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {TextObject} from '../../models/csvtexts';
import {TextMapperService} from '../../services/text-mapper.service';
import {AnimationOptions, LottieComponent} from 'ngx-lottie';

@Component({
  selector: 'lotus',
  imports: [CommonModule, LottieComponent],
  templateUrl: './lotus.component.html',
  styleUrl: './lotus.component.scss',
  standalone: true,
})
export class LotusComponent implements OnChanges {
  @Input() text: TextObject[] = [{_key: '', text: ''}];

  lotus_title = '';
  lotus_sub_title = '';
  lotus_option_1 = '';
  lotus_option_2 = '';
  lotus_o1_n1 = '';
  lotus_o1_n1_text = '';
  lotus_o1_n2 = '';
  lotus_o1_n2_text = '';
  lotus_o2_n1 = '';
  lotus_o2_n1_text = '';
  lotus_o2_n2 = '';
  lotus_o2_n2_text = '';
  lotus_o2_n3 = '';
  lotus_o2_n3_text = '';

  activeSection: 1 | 2 = 1;
  activePetalSection1: 1 | 3 = 1;
  activePetalSection2: 1 | 2 | 3 = 1;

  lottieOptions: AnimationOptions = {
    path: '../../../assets/imgs/louts/arrows.json',
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

  switchSection(section: 1 | 2) {
    this.activeSection = section;
  }

  selectPetal(section: 1 | 2, petalNumber: 1 | 2 | 3) {
    if (section === 1) {
      if (petalNumber !== 2) {
        this.activePetalSection1 = petalNumber as 1 | 3;
      }
    } else {
      this.activePetalSection2 = petalNumber;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && changes['text'].currentValue) {
      this.text = [...changes['text'].currentValue]; // Clone the array to avoid revertion
      this.textMapper.fillData(this, this.text);
    }
  }
}

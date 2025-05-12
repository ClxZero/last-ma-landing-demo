import {Component, Input} from '@angular/core';

@Component({
  selector: 'ma-faqcard',
  imports: [],
  templateUrl: './faqcard.component.html',
  styleUrl: './faqcard.component.scss',
})
export class FaqcardComponent {
  @Input() question!: string;
  @Input() answer!: string;
}

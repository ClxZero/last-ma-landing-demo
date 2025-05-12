import {Component, Input} from '@angular/core';

@Component({
  selector: 'ma-funcard',
  imports: [],
  templateUrl: './funcard.component.html',
  styleUrl: './funcard.component.scss',
})
export class FuncardComponent {
  @Input() title!: string;
  @Input() text!: string;

  isHovered = false;
  isSelected = false;

  onMouseEnter() {
    this.isHovered = true;
  }
  onMouseLeave() {
    this.isHovered = false;
  }
  onToggleSelect() {
    this.isSelected = !this.isSelected;
  }
}

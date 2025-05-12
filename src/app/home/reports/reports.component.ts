import {isPlatformBrowser} from '@angular/common';
import {
  ApplicationRef,
  Component,
  inject,
  Inject,
  Input,
  NgZone,
  OnChanges,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {first} from 'rxjs';
import {TextObject} from '../../models/csvtexts';
import {TextMapperService} from '../../services/text-mapper.service';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import {Subject, debounceTime} from 'rxjs';

@Component({
  selector: 'reports',
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnChanges {
  @Input() text: TextObject[] = [{_key: '', text: ''}];

  activeSection: 1 | 2 | 3 | 4 = 1;

  report_title = '';
  report_1 = '';
  report_2 = '';
  report_3 = '';
  report_4 = '';

  step_1 = '.report-slide-1';
  step_2 = '.report-slide-2';
  step_3 = '.report-slide-3';
  step_4 = '.report-slide-4';

  private progressSubject = new Subject<number>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private textMapper: TextMapperService,
    private ngZone: NgZone,
  ) {
    this.progressSubject.pipe(debounceTime(80)).subscribe(progress => {
      this.ngZone.run(() => {
        if (progress <= 0.25) {
          this.activeSection = 1;
        } else if (progress <= 0.5) {
          this.activeSection = 2;
        } else if (progress <= 0.75) {
          this.activeSection = 3;
        } else {
          this.activeSection = 4;
        }
      });
    });

    // It was necessary to do this so the SSR could work fine
    // If this gets to fail, we started using it with ngAfterviewInit,
    // but switched as we were getting an error with angular starting period.
    const applicationRef = inject(ApplicationRef);
    applicationRef.isStable.pipe(first(isStable => isStable)).subscribe(() => {
      setTimeout(() => {
        if (isPlatformBrowser(this.platformId)) {
          // ScrollTrigger / Slides effect plugin
          const numberOfSections = 4;
          gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

          const timeline = gsap.timeline();
          timeline
            .from('.report-slide-1', {xPercent: 100 * numberOfSections})
            .from('.report-slide-2', {xPercent: 100 * numberOfSections})
            .from('.report-slide-3', {xPercent: 100 * numberOfSections})
            .from('.report-slide-4', {xPercent: 100 * numberOfSections});

          ScrollTrigger.create({
            id: 'reports-trigger',
            animation: timeline,
            trigger: '#report',
            start: 'center center',
            end: '+=4000',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            snap: 1 / numberOfSections,
            onUpdate: self => {
              // Just emit the progress value to the subject
              this.progressSubject.next(self.progress);
            },
          });

          // Create a separate ScrollTrigger for the navigator
          ScrollTrigger.create({
            trigger: '#report',
            start: 'top center',
            end: '+=4500',
            onEnter: () => {
              gsap.to('.section-select-buttons', {
                opacity: 1,
                duration: 0.3,
                pointerEvents: 'auto',
              });
            },
            onLeave: () => {
              gsap.to('.section-select-buttons', {
                opacity: 0,
                duration: 0.3,
                pointerEvents: 'none',
              });
            },
            onEnterBack: () => {
              gsap.to('.section-select-buttons', {
                opacity: 1,
                duration: 0.3,
                pointerEvents: 'auto',
              });
            },
            onLeaveBack: () => {
              gsap.to('.section-select-buttons', {
                opacity: 0,
                duration: 0.3,
                pointerEvents: 'none',
              });
            },
          });
        }
      });
    });
  }

  jumpToStep(step: string) {
    gsap.registerPlugin(ScrollToPlugin);

    // Get the ScrollTrigger instance
    const st = ScrollTrigger.getById('reports-trigger');

    // Calculate which section we're jumping to (1-based index)
    const sectionNumber = parseInt(step.slice(-1)) - 1; // Gets the last character and converts to 0-based index

    // Calculate the progress point we need to jump to (0 to 1)
    const progress = sectionNumber / 3; // 3 because we have 4 sections (0/3, 1/3, 2/3, 3/3)
    // Animate the scroll position
    if (st?.animation) {
      gsap.to(st.animation, {
        progress: progress,
        duration: 1,
        ease: 'power2.inOut',
      });
    }

    this.activeSection = parseInt(step.slice(-1)) as 1 | 2 | 3 | 4;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && changes['text'].currentValue) {
      this.text = [...changes['text'].currentValue]; // Clone the array to avoid revertion
      this.textMapper.fillData(this, this.text);
    }
  }

  ngOnDestroy() {
    this.progressSubject.complete();
  }
}

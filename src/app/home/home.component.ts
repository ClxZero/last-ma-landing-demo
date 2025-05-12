/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map, Subscription} from 'rxjs';
import {CsvParserService} from '../services/csv-parser.service';
import {ContactComponent} from './contact/contact.component';
import {FaqComponent} from './faq/faq.component';
import {FunctionalityComponent} from './functionality/functionality.component';
import {HeroComponent} from './hero/hero.component';
import {LotusComponent} from './lotus/lotus.component';
import {ReportsComponent} from './reports/reports.component';
import {ScreenshotsComponent} from './screenshots/screenshots.component';
import {WhoComponent} from './who/who.component';
import {GroupedObjects, TextObject} from '../models/csvtexts';

@Component({
  selector: 'app-home',
  imports: [
    ContactComponent,
    FaqComponent,
    FunctionalityComponent,
    HeroComponent,
    LotusComponent,
    ReportsComponent,
    ScreenshotsComponent,
    WhoComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  // Sections/Components --> Each one needs to recieve a text
  hero: TextObject[] = [{_key: '', text: ''}];
  lotus: TextObject[] = [{_key: '', text: ''}];
  ss: TextObject[] = [{_key: '', text: ''}];
  report: TextObject[] = [{_key: '', text: ''}];
  func: TextObject[] = [{_key: '', text: ''}];
  who: TextObject[] = [{_key: '', text: ''}];
  faq: TextObject[] = [{_key: '', text: ''}];
  contact: TextObject[] = [{_key: '', text: ''}];

  texts_url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMSmB2HUpidgR1Z9fkGImwjdxkJVCn-5ilsxwywBE573Ap1I47L2UorCUu5ukgnXJlXBm-NZ7hhXYV/pub?gid=0&single=true&output=csv';

  constructor(
    private http: HttpClient,
    private csvParser: CsvParserService,
    private router: Router,
  ) {
    const textsSub = this.getCSV(this.texts_url).subscribe(() => {});
    this.subscriptions.add(textsSub);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  getCSV(url: string) {
    return this.http.get(url, {responseType: 'text'}).pipe(
      map((csvText: string) => {
        const rawData: TextObject[] = this.csvParser.parse(csvText);
        const rawGrouped = this.groupObjectsByKeyPrefix(rawData);

        Object.entries(rawGrouped).forEach(([key, value]) => {
          switch (key) {
            case 'hero':
              this.hero = value;
              break;
            case 'lotus':
              this.lotus = value;
              break;
            case 'ss':
              this.ss = value;
              break;
            case 'report':
              this.report = value;
              break;
            case 'func':
              this.func = value;
              break;
            case 'who':
              this.who = value;
              break;
            case 'faq':
              this.faq = value;
              break;
            case 'contact':
              this.contact = value;
              break;
            default:
              break;
          }
        });
      }),
    );
  }

  groupObjectsByKeyPrefix(data: TextObject[]): GroupedObjects {
    return data.reduce((acc: GroupedObjects, obj: TextObject) => {
      const match = obj._key.match(/^([^_]+)_/);
      if (match) {
        const prefix = match[1];
        if (!acc[prefix]) {
          acc[prefix] = [];
        }
        acc[prefix].push(obj);
      }
      return acc;
    }, {});
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

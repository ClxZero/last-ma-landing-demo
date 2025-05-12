import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LotusComponent} from './lotus.component';

describe('LotusComponent', () => {
  let component: LotusComponent;
  let fixture: ComponentFixture<LotusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LotusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

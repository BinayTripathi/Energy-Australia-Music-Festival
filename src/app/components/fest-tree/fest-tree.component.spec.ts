import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FestTreeComponent } from './fest-tree.component';

describe('FestTreeComponent', () => {
  let component: FestTreeComponent;
  let fixture: ComponentFixture<FestTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FestTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

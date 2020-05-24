import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceDetailsPageComponent } from './announce-details-page.component';

describe('AnnounceDetailsPageComponent', () => {
  let component: AnnounceDetailsPageComponent;
  let fixture: ComponentFixture<AnnounceDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnounceDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounceDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

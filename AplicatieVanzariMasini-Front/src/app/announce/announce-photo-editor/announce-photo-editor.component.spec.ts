import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncePhotoEditorComponent } from './announce-photo-editor.component';

describe('AnnouncePhotoEditorComponent', () => {
  let component: AnnouncePhotoEditorComponent;
  let fixture: ComponentFixture<AnnouncePhotoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncePhotoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncePhotoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

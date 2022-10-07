import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosParentComponent } from './photos-parent.component';

describe('PhotosParentComponent', () => {
  let component: PhotosParentComponent;
  let fixture: ComponentFixture<PhotosParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

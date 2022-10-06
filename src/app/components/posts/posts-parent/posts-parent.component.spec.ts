import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsParentComponent } from './posts-parent.component';

describe('PostsParentComponent', () => {
  let component: PostsParentComponent;
  let fixture: ComponentFixture<PostsParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

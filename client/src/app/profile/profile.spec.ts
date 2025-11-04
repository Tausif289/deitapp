import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent2 } from './profile';

describe('Profile', () => {
  let component: ProfileComponent2;
  let fixture: ComponentFixture<ProfileComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

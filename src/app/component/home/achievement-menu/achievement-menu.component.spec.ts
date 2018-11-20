import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementMenuComponent } from './achievement-menu.component';

describe('AchievementMenuComponent', () => {
  let component: AchievementMenuComponent;
  let fixture: ComponentFixture<AchievementMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MybookingsPage } from './mybookings.page';

describe('MybookingsPage', () => {
  let component: MybookingsPage;
  let fixture: ComponentFixture<MybookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybookingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MybookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

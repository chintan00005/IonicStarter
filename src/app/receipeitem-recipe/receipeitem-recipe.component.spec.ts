import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReceipeitemRecipeComponent } from './receipeitem-recipe.component';

describe('ReceipeitemRecipeComponent', () => {
  let component: ReceipeitemRecipeComponent;
  let fixture: ComponentFixture<ReceipeitemRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceipeitemRecipeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceipeitemRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

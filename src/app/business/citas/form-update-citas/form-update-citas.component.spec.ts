import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateCitasComponent } from './form-update-citas.component';

describe('FormUpdateCitasComponent', () => {
  let component: FormUpdateCitasComponent;
  let fixture: ComponentFixture<FormUpdateCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

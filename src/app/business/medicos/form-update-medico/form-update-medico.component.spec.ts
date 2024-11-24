import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateMedicoComponent } from './form-update-medico.component';

describe('FormUpdateMedicoComponent', () => {
  let component: FormUpdateMedicoComponent;
  let fixture: ComponentFixture<FormUpdateMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

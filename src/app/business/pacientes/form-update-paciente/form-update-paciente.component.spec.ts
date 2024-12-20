import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdatePacienteComponent } from './form-update-paciente.component';

describe('FormUpdatePacienteComponent', () => {
  let component: FormUpdatePacienteComponent;
  let fixture: ComponentFixture<FormUpdatePacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdatePacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdatePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validators/validator.service';



@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {


  constructor(private formBuilder: FormBuilder, private validatorService: ValidatorService){}

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    username: ['', [Validators.required, this.validatorService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });

  onSave(){
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }
}

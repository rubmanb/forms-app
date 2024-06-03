import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validators/validator.service';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private validatorService: ValidatorService) {}

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    // this.myForm.reset();
  }

  isNotValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null{
    /* let textError = '';
    if (this.myForm.controls[field].hasError('required')) {
      textError = 'Este camp es requerido';
    } else if (this.myForm.controls[field].hasError('minlength')) {
      textError = 'El campo tiene que tener mas de 3 letras';
    }

    return textError;*/
    if(!this.myForm.controls[field]) return null;
    const textError = this.myForm.controls[field].errors || {};

    for(const key of Object.keys(textError)) {
      switch(key) {
        case 'required': return 'Este campo es requerido';
        case 'minlength': return `Este campo tiene que tener ${textError['minlength'].requiredLength} carácteres`;
      }
    }

    return null;
  }

  onSave(): void {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({ price: 0, inStorage: 0 });
  }
}

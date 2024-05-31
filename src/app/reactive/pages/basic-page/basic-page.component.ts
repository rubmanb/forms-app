import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    // this.myForm.reset();
  }

  isNotValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string {
    let textError = '';
    if (this.myForm.controls[field].hasError('required')) {
      textError = 'This field is required';
    } else if (this.myForm.controls[field].hasError('minlength')) {
      textError = 'The field must be at least 3 letters';
    }
    return textError;
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

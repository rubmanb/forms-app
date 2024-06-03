import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  constructor(private formBuilder: FormBuilder){}

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required], [Validators.minLength]],
    favGames: this.formBuilder.array([
      ['World of Warcraft', Validators.required],
      ['Diablo 4', Validators.required],
      ['Final Fantasy', Validators.required]
    ]),
    removeFavGames: ['', Validators.required]
  });

  public newFavGame: FormControl = new FormControl('', [Validators.required]);

  onSubmit(): void{
    if(this.myForm.valid){
      this.myForm.markAllAsTouched();
      return;
    }
    (this.myForm.controls['favGames'] as FormArray) = this.formBuilder.array([]);
    this.myForm.reset();
  }

  get favGamesControl(){
    return this.myForm.get('favGames') as FormArray;
  }

  isNotValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null{
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

  isValidFieldInArray(formArray: FormArray, i: number): boolean | null{
      return (
      formArray.controls[i].errors && formArray.controls[i].touched
    );
  }

  onDeleteFavGame(i: number):void{
    this.favGamesControl.removeAt(i);
  }

  onAddNewFavGame():void{
    if(this.newFavGame.invalid) return;

    const newGame = this.newFavGame.value;

    this.favGamesControl.push(this.formBuilder.control(newGame, Validators.required));

    this.newFavGame.reset();
  }

}

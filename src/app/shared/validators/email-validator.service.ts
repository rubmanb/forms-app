import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';
import { ValidatorService } from './validator.service';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator{

  // TODO: Esta es una forma simple
  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log({email});
  //   return of({
  //     emailTaken: true,
  //   }).pipe(
  //     delay(2000),
  //   )
  // }

  // TODO: FORMA más compleja
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors|null>( (subscriber) => {
      if(email === 'ruben@google.com'){
        subscriber.next({emailTaken: true});
        subscriber.complete()
      }

      subscriber.next(null);
      subscriber.complete();

    }).pipe(
      delay(3000)
    );

    return httpCallObservable;
  }


}

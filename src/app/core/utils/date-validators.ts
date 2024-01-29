import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateValidators {
  static notFuture(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = control.value;
      const currentDate = new Date().toISOString().split('T')[0];

      return selectedDate > currentDate ? { notFuture: true } : null;
    };
  }
}

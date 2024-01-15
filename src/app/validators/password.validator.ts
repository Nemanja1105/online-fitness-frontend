import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.repeatPassword
    ? null
    : { PasswordNoMatch: true };
};

export function notEqualToValidator(defaultValue: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isNotEqual = value !== defaultValue;
    return isNotEqual ? null : { notEqualTo: true };
  };
}

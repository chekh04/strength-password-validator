import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasLetters = /[a-zA-Z]/.test(value);
    const hasDigits = /\d/.test(value);
    const hasSymbols = /[^\w\s]/.test(value);

    if (hasLetters && hasDigits && hasSymbols) {
      return null;
    }

    if ((hasLetters && hasSymbols) || (hasLetters && hasDigits) || (hasDigits && hasSymbols)) {
      return { 'mediumPassword': true };
    }

    return { 'easyPassword': true };
  };
}

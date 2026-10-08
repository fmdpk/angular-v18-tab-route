import { AbstractControl, ValidationErrors } from '@angular/forms';

// Custom validator example
export function noSpecialChars(
  control: AbstractControl,
): ValidationErrors | null {
  const value = control.value;
  if (value && /[^a-zA-Z0-9 ]/.test(value)) {
    return { noSpecialChars: true };
  }
  return null;
}

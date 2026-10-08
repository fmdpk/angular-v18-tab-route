// search-field.model.ts
import { ValidatorFn } from '@angular/forms';

export interface SearchFieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'dropdown' | 'date' | 'checkbox';
  placeholder?: string;
  options?: { label: string; value: any }[];
  validators?: ValidatorFn[];
  colClass?: string;

  /** Custom error messages per error key */
  errorMessages?: {
    [errorKey: string]: string; // e.g. { required: 'Name is required', minlength: 'Min 3 chars' }
  };
}

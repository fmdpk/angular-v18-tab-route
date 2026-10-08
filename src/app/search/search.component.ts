import { DatePickerModule } from 'primeng/datepicker';
// search.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SearchFieldConfig } from '../search-field.model';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    ButtonModule,
    SelectModule,
    DatePickerModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  @Input() fields: SearchFieldConfig[] = [];
  @Input() initialValues: Record<string, any> = {};

  @Output() search = new EventEmitter<any>();
  @Output() resetForm = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const group: Record<string, any> = {};

    this.fields.forEach((field) => {
      group[field.key] = [
        this.initialValues[field.key] ?? null,
        field.validators || [],
      ];
    });

    this.form = this.fb.group(group);
  }

  onSearch(): void {
    if (this.form.valid) {
      this.search.emit(this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
    }
  }

  onReset(): void {
    this.form.reset();
    this.resetForm.emit();
  }

  /**
   * Returns the first error message for a field
   */
  getErrorMessage(field: SearchFieldConfig): string | null {
    const control = this.form.get(field.key);

    if (!control || !control.errors || !control.touched) {
      return null;
    }

    // Custom messages from config have priority
    if (field.errorMessages) {
      for (const errorKey of Object.keys(control.errors)) {
        if (field.errorMessages[errorKey]) {
          return field.errorMessages[errorKey];
        }
      }
    }

    // Fallback default messages
    const errors = control.errors;

    if (errors['required']) return `${field.label} is required`;
    if (errors['minlength'])
      return `${field.label} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength'])
      return `${field.label} cannot be more than ${errors['maxlength'].requiredLength} characters`;
    if (errors['min'])
      return `${field.label} must be at least ${errors['min'].min}`;
    if (errors['max'])
      return `${field.label} cannot be more than ${errors['max'].max}`;
    if (errors['email']) return `Please enter a valid email`;
    if (errors['pattern']) return `${field.label} has an invalid format`;

    // Custom validator error (example)
    if (errors['customError']) return errors['customError'];

    // Generic fallback
    return `${field.label} is invalid`;
  }

  /**
   * Helper to check if a field has any error
   */
  hasError(key: string): boolean {
    const control = this.form.get(key);
    return !!(control && control.invalid && control.touched);
  }
}

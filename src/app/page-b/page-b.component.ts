// page-b.component.ts
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { SearchFieldConfig } from '../search-field.model';
import { noSpecialChars } from '../no-special-chars.validator';

@Component({
  selector: 'app-page-b',
  standalone: true,
  imports: [SearchComponent],
  template: `
    <app-search [fields]="searchFields" (search)="onSearch($event)">
    </app-search>
  `,
})
export class PageBComponent {
  searchFields: SearchFieldConfig[] = [
    {
      key: 'name',
      label: 'Name',
      validators: [
        Validators.required,
        Validators.minLength(3),
        noSpecialChars,
      ],
      errorMessages: {
        required: 'Name is required',
        minlength: 'Name must be at least 3 characters',
        noSpecialChars: 'Special characters are not allowed',
      },
    },
    {
      key: 'email',
      label: 'Email',
      validators: [Validators.required, Validators.email],
      errorMessages: {
        required: 'Email is required',
        email: 'Please enter a valid email address',
      },
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number',
      validators: [Validators.required, Validators.min(18), Validators.max(65)],
      errorMessages: {
        required: 'Age is required',
        min: 'You must be at least 18 years old',
        max: 'Maximum age is 65',
      },
    },
    {
      key: 'status',
      label: 'Status',
      type: 'dropdown',
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Inactive', value: 'INACTIVE' },
      ],
      validators: [Validators.required],
      errorMessages: {
        required: 'Please select a status',
      },
    },
  ];

  onSearch(criteria: any): void {
    console.log('Page B search →', criteria);
  }
}

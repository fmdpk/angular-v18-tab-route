// page-a.component.ts
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { SearchFieldConfig } from '../search-field.model';

@Component({
  selector: 'app-page-a',
  standalone: true,
  imports: [SearchComponent],
  template: `
    <app-search
      [fields]="searchFields"
      (search)="onSearch($event)"
      (resetForm)="onReset()"
    >
    </app-search>
  `,
})
export class PageAComponent {
  searchFields: SearchFieldConfig[] = [
    { key: 'name', label: 'Name', validators: [Validators.required] },
    { key: 'code', label: 'Code' },
    { key: 'fromDate', label: 'From Date', type: 'date' },
    { key: 'toDate', label: 'To Date', type: 'date' },

    // Extra fields for Page A
    {
      key: 'status',
      label: 'Status',
      type: 'dropdown',
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Inactive', value: 'INACTIVE' },
      ],
      validators: [Validators.required],
    },
    { key: 'region', label: 'Region' },
  ];

  onSearch(criteria: any): void {
    console.log('Page A search →', criteria);
  }

  onReset(): void {
    console.log('Form reset');
  }
}

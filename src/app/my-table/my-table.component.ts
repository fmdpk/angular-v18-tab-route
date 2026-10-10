import { Component, signal, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [TableModule, ConfirmDialog],
  templateUrl: './my-table.component.html',
  providers: [ConfirmationService, ConfirmDialogModule], // or provide it at a higher level
})
export class MyTableComponent {
  @ViewChild('dt') table!: Table;

  products: any[] = [
    { id: 1, first: 'Product 1', second: 'Description 1' },
    { id: 2, first: 'Product 2', second: 'Description 2' },
    { id: 3, first: 'Product 3', second: 'Description 3' },
    { id: 4, first: 'Product 4', second: 'Description 4' },
    { id: 5, first: 'Product 5', second: 'Description 5' },
    { id: 6, first: 'Product 6', second: 'Description 6' },
    { id: 7, first: 'Product 7', second: 'Description 7' },
    { id: 8, first: 'Product 8', second: 'Description 8' },
    { id: 9, first: 'Product 9', second: 'Description 9' },
    { id: 10, first: 'Product 10', second: 'Description 10' },
    { id: 11, first: 'Product 11', second: 'Description 11' },
    { id: 12, first: 'Product 12', second: 'Description 12' },
    { id: 13, first: 'Product 13', second: 'Description 13' },
    { id: 14, first: 'Product 14', second: 'Description 14' },
    { id: 15, first: 'Product 15', second: 'Description 15' },
    { id: 16, first: 'Product 16', second: 'Description 16' },
    { id: 17, first: 'Product 17', second: 'Description 17' },
    { id: 18, first: 'Product 18', second: 'Description 18' },
    { id: 19, first: 'Product 19', second: 'Description 19' },
    { id: 20, first: 'Product 20', second: 'Description 20' },
  ];
  tableData: any[] = this.products.slice(0, 5); // Initial data for the first page
  selectedProducts: any[] = [];

  first = signal(0); // current page start index
  rows = signal(5);
  private previousFirst = 0; // keep previous page
  loading = signal(false);
  totalRecords = signal(this.products.length);
  isConfirmDialogVisible = signal(false);

  constructor(private confirmationService: ConfirmationService) {}

  onPage(event: any) {
    // event = { first, rows, page, pageCount }
    if (this.selectedProducts?.length > 0) {
      this.isConfirmDialogVisible.set(true);
      // User has selections → ask for confirmation
      this.confirmationService.confirm({
        message:
          'You have selected rows. Changing the page will clear the selection. Do you want to continue?',
        header: 'Confirm Pagination',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes, continue',
        rejectLabel: 'Cancel',
        accept: () => {
          // Clear selection and allow the new page
          this.selectedProducts = [];
          this.first.set(event.first);
          this.previousFirst = event.first;
          this.isConfirmDialogVisible.set(false);
          this.loadData(event);
        },
        reject: () => {
          // Stay on the previous page
          setTimeout(() => {
            this.first.set(this.previousFirst);

            // Force the table to update (sometimes needed)
            if (this.table) {
              this.table.first = this.previousFirst;
            }
          }, 0);
        },
      });
    } else {
      // No selection → just update the page
      this.first.set(event.first);
      this.previousFirst = event.first;
    }
  }

  loadData(event: TableLazyLoadEvent) {
    // Simulate data loading (e.g., from an API)
    // For this example, we already have the products array defined
    // In a real application, you might fetch data here and update the products array
    // event = { first, rows }
    if (this.isConfirmDialogVisible()) {
      return; // Prevent loading if the confirmation dialog is visible
    }
    this.loading.set(true);
    setTimeout(() => {
      this.updateTableData(event);
      this.loading.set(false);
    }, 1500); // Simulate a delay for loading
  }

  private updateTableData(event: TableLazyLoadEvent) {
    this.tableData = this.products.slice(
      event.first,
      event.first! + event.rows!,
    );
  }
}

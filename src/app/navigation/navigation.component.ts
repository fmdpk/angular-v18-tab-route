import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {TabService} from '../tab.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="navigation-bar">
      <button pButton
        icon="pi pi-home"
        label="Dashboard"
        (click)="openTab('/dashboard', 'Dashboard', 'pi pi-home')"
        class="p-button-text"></button>

      <button pButton
        icon="pi pi-users"
        label="Users"
        (click)="openTab('/users', 'Users', 'pi pi-users')"
        class="p-button-text"></button>

      <button pButton
        icon="pi pi-shopping-cart"
        label="Products"
        (click)="openTab('/products', 'Products', 'pi pi-shopping-cart')"
        class="p-button-text"></button>

      <button pButton
        icon="pi pi-cog"
        label="Settings"
        (click)="openTab('/settings', 'Settings', 'pi pi-cog')"
        class="p-button-text"></button>
    </div>
  `,
  styles: [`
    .navigation-bar {
      padding: 1rem;
      background: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
  `]
})
export class NavigationComponent {
  constructor(private tabService: TabService) {}

  openTab(route: string, title: string, icon: string): void {
    this.tabService.openTab(route, title, icon);
  }
}

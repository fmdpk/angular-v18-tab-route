import {Component, inject} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {MenuItem} from '../menuItems';

@Component({
  selector: 'app-mat-tab-container',
  standalone: true,
  imports: [CdkDrag, CdkDropList, MatTabsModule, RouterOutlet, NgIf],
  templateUrl: './mat-tab-container.component.html',
  styleUrl: './mat-tab-container.component.scss'
})
export class MatTabContainerComponent {
  private router = inject(Router)

  protected tabs = [
    {
      id: 0,
      icon: 'pi pi-home',
      isActive: false,
      route: '/dashboard',
      title: 'Dashboard',
      outlet: 'Dashboard'
    },
    {
      id: 1,
      icon: 'pi pi-home',
      isActive: false,
      route: '/dashboard/:id',
      title: 'Dashboard Detail',
      outlet: 'DashboardDetail'
    },
    {
      id: 2,
      icon: 'pi pi-users',
      isActive: false,
      route: '/users',
      title: 'Users',
      outlet: 'Users'
    },
    {
      id: 3,
      icon: 'pi pi-shopping-cart',
      isActive: false,
      route: '/products',
      title: 'Products',
      outlet: 'Products'
    },
    {
      id: 4,
      icon: 'pi pi-cog',
      isActive: false,
      route: '/settings',
      title: 'Settings',
      outlet: 'Settings'
    },
    // {
    //   id: 5,
    //   icon: 'pi pi-warehouse',
    //   isActive: false,
    //   route: '/',
    //   title: 'Home'
    // },
  ];

  activeLink = this.tabs[0].route;
  protected selectedTabIndex = 0;

  drop(event: CdkDragDrop<string[]>) {
    const prevActive = this.tabs[this.selectedTabIndex];
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    this.selectedTabIndex = this.tabs.indexOf(prevActive);
  }

  onTabChanged(event:  MatTabChangeEvent){
    console.log(event)
    // this.router.navigate([event.tab])
  }
}

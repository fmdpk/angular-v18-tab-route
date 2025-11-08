import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import {Router, RouterOutlet} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
import {MenuItem} from '../menuItems';
import {Tab, TabService} from '../tab.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-mat-tab-container',
  standalone: true,
  imports: [CdkDrag, CdkDropList, MatTabsModule, RouterOutlet, NgIf, AsyncPipe],
  templateUrl: './mat-tab-container.component.html',
  styleUrl: './mat-tab-container.component.scss'
})
export class MatTabContainerComponent implements OnInit{
  private router = inject(Router)
  tabService = inject(TabService)
  private destroyRef = inject(DestroyRef)

  // protected tabs: MenuItem[] = [
  //   {
  //     id: 0,
  //     icon: 'pi pi-home',
  //     isActive: false,
  //     route: '/dashboard',
  //     title: 'Dashboard',
  //     outlet: 'Dashboard'
  //   },
  //   // {
  //   //   id: 1,
  //   //   icon: 'pi pi-home',
  //   //   isActive: false,
  //   //   route: '/dashboard/:id',
  //   //   title: 'Dashboard Detail',
  //   //   outlet: 'DashboardDetail'
  //   // },
  //   {
  //     id: 2,
  //     icon: 'pi pi-users',
  //     isActive: false,
  //     route: '/users',
  //     title: 'Users',
  //     outlet: 'Users'
  //   },
  //   {
  //     id: 3,
  //     icon: 'pi pi-shopping-cart',
  //     isActive: false,
  //     route: '/products',
  //     title: 'Products',
  //     outlet: 'Products'
  //   },
  //   {
  //     id: 4,
  //     icon: 'pi pi-cog',
  //     isActive: false,
  //     route: '/settings',
  //     title: 'Settings',
  //     outlet: 'Settings'
  //   },
  //   // {
  //   //   id: 5,
  //   //   icon: 'pi pi-warehouse',
  //   //   isActive: false,
  //   //   route: '/',
  //   //   title: 'Home'
  //   // },
  // ];

  protected tabs: Tab[] = []

  // activeLink = this.tabs[0].route;
  protected selectedTabIndex = 0;

  ngOnInit() {
    this.tabService.tabs$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.tabs = res
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    const prevActive = this.tabs[this.selectedTabIndex];
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    this.selectedTabIndex = this.tabs.indexOf(prevActive);
  }

  onTabChanged(event:  MatTabChangeEvent){
    console.log(event)
    // this.router.navigate([event.tab])
  }

  removeTab(tab: Tab, index: number){
    console.log(index)
    console.log(this.tabs[index])
    if (this.tabs[index]) {
      this.tabService.closeTab(+this.tabs[index].id);
      // this.tabs = this.tabs.filter(item => item.id !== tab.id)
      // this.router.navigate([{ outlets: { [tab.outlet!]: null } }]);
    }
  }
}

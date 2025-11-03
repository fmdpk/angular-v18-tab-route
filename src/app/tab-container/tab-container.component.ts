import {Component, OnInit, OnDestroy} from '@angular/core';
import {TabViewModule} from 'primeng/tabview';
import {TabMenuModule} from 'primeng/tabmenu';
import {Router, RouterOutlet} from '@angular/router';
import {Subscription} from 'rxjs';
import {CommonModule} from '@angular/common';
import {TabService, Tab} from '../tab.service';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {TabsModule} from 'primeng/tabs';

@Component({
  selector: 'app-tab-container',
  standalone: true,
  imports: [CommonModule, TabMenuModule, RouterOutlet, CdkDropList, TabsModule, CdkDrag, TabViewModule],
  templateUrl: 'tab-container.component.html',
  styleUrl: 'tab-container.component.scss',
})
export class TabContainerComponent implements OnInit, OnDestroy {
  tabs: Tab[] = [];
  activeTabId: number = -1;
  activeIndex: number = 0;

  private subscriptions: Subscription[] = [];

  constructor(private tabService: TabService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.tabService.tabs$.subscribe((tabs) => {
        this.tabs = tabs;
      }),

      this.tabService.activeTabId$.subscribe((activeTabId) => {
        this.activeTabId = activeTabId;
        this.updateActiveIndex();
      }),
    );
  }

  onTabChange(event: any): void {
    console.log(event)
    if (this.tabs[event.index]) {
      const tab = this.tabs[event.index];
      this.tabService.setActiveTab(tab.id);
      this.router.navigate([tab.route]);
    }
  }

  onTabClose(event: any): void {
    console.log(event)
    const tabIndex = event.index;
    if (this.tabs[tabIndex]) {
      this.tabService.closeTab(this.tabs[tabIndex].id);
    }
  }

  private updateActiveIndex(): void {
    const index = this.tabs.findIndex((tab) => tab.id === this.activeTabId);
    if (index !== -1) {
      this.activeIndex = index;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  drop(event: CdkDragDrop<Tab[]>) {
    if (event.previousIndex === event.currentIndex) return;
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    // this.setActiveTab(event)
  }
}

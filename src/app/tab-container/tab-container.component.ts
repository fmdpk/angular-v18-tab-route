import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabService, Tab } from '../tab.service';

@Component({
  selector: 'app-tab-container',
  standalone: true,
  imports: [CommonModule, TabViewModule, TabMenuModule, RouterOutlet],
  templateUrl: 'tab-container.component.html',
  styleUrl: 'tab-container.component.scss',
})
export class TabContainerComponent implements OnInit, OnDestroy {
  tabs: Tab[] = [];
  activeTabId: number = -1;
  activeIndex: number = 0;

  private subscriptions: Subscription[] = [];

  constructor(private tabService: TabService, private router: Router) {}

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
    if (this.tabs[event.index]) {
      const tab = this.tabs[event.index];
      this.tabService.setActiveTab(tab.id);
      this.router.navigate([tab.route]);
    }
  }

  onTabClose(event: any): void {
    const tabIndex = event.index;
    if (this.tabs[tabIndex]) {
      this.tabService.closeTab(this.tabs[tabIndex].id);
    }
  }

  private updateActiveIndex(): void {
    const index = this.tabs.findIndex((tab) => tab.id === this.activeTabId);
    if (index !== -1) {
      setTimeout(()=> {
        this.activeIndex = index;
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

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
  template: `
    <p-tabView
      [(activeIndex)]="activeIndex"
      [scrollable]="true"
      (onChange)="onTabChange($event)"
      (onClose)="
        $event.originalEvent.preventDefault();
        $event.originalEvent.stopPropagation();
        onTabClose($event)
      "
    >
      <p-tabPanel
        *ngFor="let tab of tabs; let i = index"
        [header]="tab.title"
        [closable]="tab.closable"
        [selected]="tab.id === activeTabId"
      >
        <router-outlet *ngIf="activeIndex === i"></router-outlet>
      </p-tabPanel>
    </p-tabView>
  `,
  styles: [
    `
      :host ::ng-deep .p-tabview-panels {
        padding: 0;
      }
    `,
  ],
})
export class TabContainerComponent implements OnInit, OnDestroy {
  tabs: Tab[] = [];
  activeTabId: string = '';
  activeIndex: number = 0;

  private subscriptions: Subscription[] = [];

  constructor(private tabService: TabService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.tabService.tabs$.subscribe((tabs) => {
        this.tabs = tabs;
        // this.updateActiveIndex();
      }),

      this.tabService.activeTabId$.subscribe((activeTabId) => {
        this.activeTabId = activeTabId;
        this.updateActiveIndex();
      }),

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Handle navigation changes if needed
        }
      })
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
      this.activeIndex = index;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

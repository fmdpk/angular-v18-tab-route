import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface Tab {
  title: string;
  route: string;
  icon?: string;
  closable?: boolean;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private tabsSubject = new BehaviorSubject<Tab[]>([]);
  private activeTabIdSubject = new BehaviorSubject<string>('');

  tabs$ = this.tabsSubject.asObservable();
  activeTabId$ = this.activeTabIdSubject.asObservable();

  constructor(private router: Router) {}

  openTab(
    route: string,
    title: string,
    icon?: string,
    closable: boolean = true
  ): void {
    const newTab: Tab = {
      id: this.generateId(),
      route,
      title,
      icon,
      closable,
    };

    const currentTabs = this.tabsSubject.value;

    // Check if tab already exists
    const existingTab = currentTabs.find((tab) => tab.route === route);
    if (existingTab) {
      this.setActiveTab(existingTab.id);
      this.router.navigate([existingTab.route]);
      return;
    }

    const updatedTabs = [...currentTabs, newTab];
    this.tabsSubject.next(updatedTabs);
    this.setActiveTab(newTab.id);
    this.router.navigate([route]);
  }

  closeTab(tabId: string): void {
    const currentTabs = this.tabsSubject.value;
    const tabToClose = currentTabs.find((tab) => tab.id === tabId);

    if (!tabToClose) return;

    const updatedTabs = currentTabs.filter((tab) => tab.id !== tabId);
    this.tabsSubject.next(updatedTabs);

    // If closed tab was active, activate another tab
    if (this.activeTabIdSubject.value === tabId && updatedTabs.length > 0) {
      // this.setActiveTab(updatedTabs[updatedTabs.length - 1].id);
      this.router.navigate([updatedTabs[updatedTabs.length - 1].route]);
    } else if (updatedTabs.length === 0) {
      this.router.navigate(['/']);
    }
  }

  setActiveTab(tabId: string): void {
    this.activeTabIdSubject.next(tabId);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

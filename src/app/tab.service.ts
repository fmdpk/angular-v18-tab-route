import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface Tab {
  title: string;
  route: string;
  icon?: string;
  closable?: boolean;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private tabsSubject = new BehaviorSubject<Tab[]>([]);
  private activeTabIdSubject = new BehaviorSubject<number>(-1);

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

  closeTab(tabId: number): void {
    const currentTabs = this.tabsSubject.value;
    let foundIndex = -1
    const tabToClose = currentTabs.find((tab, index) => {
      if(tab.id === tabId){
        foundIndex = index;
      }
      return tab.id === tabId;
    });

    if (!tabToClose) return;

    const updatedTabs = currentTabs.filter((tab) => tab.id !== tabId);
    //reinitialize tabs id with their index in tabs array
    updatedTabs.forEach((tab, index) => {
      tab.id = index;
    })
    this.tabsSubject.next(updatedTabs);

    // If closed tab was active, activate last tab
    if (this.activeTabIdSubject.value === tabId && updatedTabs.length > 0) {
      this.router.navigate([updatedTabs[foundIndex - 1].route]).then(() => {
        this.setActiveTab(updatedTabs[foundIndex - 1].id);
      });
    }
    // If closed tab was not active, and it was smaller than active tab, set active tab to last tab
    else if(this.activeTabIdSubject.value !== tabId && this.activeTabIdSubject.value > tabId && updatedTabs.length > 0) {
      this.router.navigate([updatedTabs[this.activeTabIdSubject.value - 1].route]).then(() => {
        this.setActiveTab(this.activeTabIdSubject.value - 1);
      });
    } else if (updatedTabs.length === 0) {
      this.router.navigate(['/']);
    }
  }

  setActiveTab(tabId: number): void {
    this.activeTabIdSubject.next(tabId);
  }

  private generateId(): number {
    if(this.tabsSubject.value.length > 0){
      return this.tabsSubject.value.length
    } else {
      return 0;
    }
  }
}

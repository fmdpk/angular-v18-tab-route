import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

export interface Tab {
  title: string;
  route: string;
  icon?: string;
  closable?: boolean;
  id: number;
  outlet: string,
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private tabsSubject = new BehaviorSubject<Tab[]>([]);
  title$ = new BehaviorSubject<string>('');
  outlet$ = new BehaviorSubject<string>('');
  icon$ = new BehaviorSubject<string>('');
  wasLastTab$ = new BehaviorSubject<boolean>(false);
  tabs$ = this.tabsSubject.asObservable();
  activeTabIdSubject = new BehaviorSubject<number>(-1);
  activeTabId$ = this.activeTabIdSubject.asObservable();

  constructor(private router: Router) {
  }

  openTab(
    route: string,
    title: string,
    outlet: string,
    icon?: string,
    closable: boolean = true,
    changeRoute: boolean = true
  ): void {
    const newTab: Tab = {
      id: this.generateId(),
      route,
      title,
      icon,
      closable,
      outlet,
      name: 'name'
    };
    const currentTabs = this.tabsSubject.value;

    // Check if tab already exists
    const existingTab = currentTabs.find((tab) => tab.outlet === outlet);
    console.log(existingTab)
    if (existingTab) {
      this.changeTabsState(existingTab.route, existingTab.id, false)
      return;
    }

    const updatedTabs = [...currentTabs, newTab];
    this.tabsSubject.next(updatedTabs);
    this.changeTabsState(route, newTab.id, changeRoute)
  }

  closeTab(tabId: number): void {
    this.wasLastTab$.next(false)
    const currentTabs = this.tabsSubject.value;
    let currentTabIndex = -1
    const tabToClose = currentTabs.find((tab, index) => {
      if (tab.id === tabId) {
        currentTabIndex = index;
      }
      return tab.id === tabId;
    });

    if (!tabToClose) return;

    const updatedTabs = currentTabs.filter((tab) => tab.id !== tabId);
    this.reorderTabs(updatedTabs)
    //reinitialize tabs id with their index in tabs array

    console.log(tabToClose)
    console.log(updatedTabs)
    console.log(this.activeTabIdSubject.value)
    console.log(tabId)
    console.log(updatedTabs.length)
    // If closed tab was active, activate last tab
    if (this.activeTabIdSubject.value === tabId && updatedTabs.length > 0) {
      if (updatedTabs[currentTabIndex - 1]) {
        this.changeTabsState(updatedTabs[currentTabIndex - 1].route, updatedTabs[currentTabIndex - 1].id, false, tabToClose.outlet)
      } else {
        this.changeTabsState(updatedTabs[currentTabIndex].route, updatedTabs[currentTabIndex].id, false, tabToClose.outlet)
      }

    }
    // If closed tab was not active, and it was smaller than active tab, set active tab to last tab
    else if (this.activeTabIdSubject.value !== tabId && updatedTabs.length > 0) {
      // this.changeTabsState(updatedTabs[this.activeTabIdSubject.value - 1].route, this.activeTabIdSubject.value - 1, false, tabToClose.outlet)
      let activeTabId= this.activeTabIdSubject.value > tabId ? this.activeTabIdSubject.value - 1 : this.activeTabIdSubject.value
      this.changeTabsState('', activeTabId, false, tabToClose.outlet)
    } else if (updatedTabs.length === 0) {
      this.title$.next('dashboard')
      this.icon$.next('pi pi-home')
      this.wasLastTab$.next(true)
      this.setActiveTab(-1)
      this.router.navigate(['/'])
    }
  }

  reorderTabs(updatedTabs: Tab[]){
    updatedTabs.forEach((tab, index) => {
      tab.id = index;
    })
    this.tabsSubject.next(updatedTabs);
  }

  /**
   * @description change route and set active route
   * @param {number} id
   * @param {string} route
   * @param changeRoute
   * @param outlet
   * */
  changeTabsState(route: string, id: number, changeRoute: boolean = true, outlet?: string): void {
    console.log(changeRoute)
    if(changeRoute){
      console.log(changeRoute)
      this.router.navigate([route]).then(() => {
        this.setActiveTab(id);
      });
    } else {
      console.log(changeRoute)
      if(outlet){
        this.wasLastTab$.next(true)
        this.router.navigate([{ outlets: { [outlet!]: null } }]);
      }
      this.setActiveTab(id);
    }
  }

  setActiveTab(tabId: number): void {
    this.activeTabIdSubject.next(tabId);
  }

  private generateId(): number {
    if (this.tabsSubject.value.length > 0) {
      return this.tabsSubject.value.length
    } else {
      return 0;
    }
  }
}

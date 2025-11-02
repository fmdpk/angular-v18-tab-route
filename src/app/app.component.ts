import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {TabContainerComponent} from './tab-container/tab-container.component';
import {Subscription} from 'rxjs';
import {TabService} from './tab.service';
import {MENU_ITEMS, MenuItem} from './menuItems';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, TabContainerComponent],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss'
})
export class AppComponent implements AfterViewInit, OnInit {
  subscription: Subscription | undefined = undefined;
  private router: Router = inject(Router);
  private tabService: TabService = inject(TabService);
  navigationEndCounter: number = 0

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscription = this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.navigationEndCounter += 1
        if (this.navigationEndCounter < 2) {
          this.createTabOnPageLoad(res)
        } else if (this.navigationEndCounter >= 2){
          this.tabService.openTab(res.urlAfterRedirects, this.tabService.title$.getValue(), this.tabService.icon$.getValue())
        }
      }
    })
  }

  createTabOnPageLoad(res: NavigationEnd) {
    MENU_ITEMS.forEach((item) => {
      let title = this.createTabTitle(item, res.urlAfterRedirects)
      if (item.route.includes(title.split(' - ')[0])) {
        this.tabService.openTab(res.urlAfterRedirects, title, item.icon)
      }
    })
  }

  createTabTitle(item: MenuItem, route: string) {
    let title = ''
    let splitRoute = route.split('/')
    splitRoute = splitRoute.filter(item => item !== '')
    splitRoute.forEach((item, index) => {
      if (index !== splitRoute.length - 1) {
        title += (item + ' - ')
      } else if (index === splitRoute.length - 1) {
        title += item
      }
    })
    return title
  }
}

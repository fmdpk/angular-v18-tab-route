import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {TabContainerComponent} from './tab-container/tab-container.component';
import {Subscription} from 'rxjs';
import {TabService} from './tab.service';
import {MENU_ITEMS} from './menuItems';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, TabContainerComponent],
  template: `
    <div class="app-container">
      <app-navigation></app-navigation>
      <div class="content">
        <app-tab-container></app-tab-container>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .content {
      flex: 1;
      overflow: hidden;
    }
  `]
})
export class AppComponent implements AfterViewInit, OnInit {
  subscription: Subscription | undefined = undefined;
  private router: Router = inject(Router);
  private tabService: TabService = inject(TabService);

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscription = this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        MENU_ITEMS.forEach((item) => {
          if (item.route.includes(res.urlAfterRedirects)) {
            this.tabService.openTab(item.route, item.title, item.icon)
            this.subscription?.unsubscribe()
            this.subscription = undefined
          }
        })
      }
    })
  }
}

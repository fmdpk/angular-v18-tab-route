import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  Router,
  RouterOutlet,
  RoutesRecognized
} from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {TabContainerComponent} from './tab-container/tab-container.component';
import {Subscription} from 'rxjs';
import {TabService} from './tab.service';
import {MENU_ITEMS, MenuItem} from './menuItems';
import {MatTabContainerComponent} from './mat-tab-container/mat-tab-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, TabContainerComponent, MatTabContainerComponent],
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
      // console.log(res)
      if(res instanceof  NavigationSkipped && res.reason.includes('because it is the same as the current Router URL')){
        this.tabService.openTab(res.url, this.tabService.title$.getValue(), this.tabService.outlet$.getValue(), this.tabService.icon$.getValue(), true, false)
      }
      if (res instanceof NavigationStart) console.log('NAV START', res);
      if (res instanceof NavigationEnd) {
        this.navigationEndCounter += 1
        if (this.navigationEndCounter < 2) {
          // this.createTabOnPageLoad(res)
        } else if (this.navigationEndCounter >= 2){
          console.log(res)
          if(!this.tabService.wasLastTab$.getValue()){
            this.tabService.openTab(res.url, this.tabService.title$.getValue(), this.tabService.outlet$.getValue(), this.tabService.icon$.getValue(), true, false)
          } else {
            this.tabService.wasLastTab$.next(false)
          }
        }
      }
      if (res instanceof NavigationError) {
        console.error('Navigation Error:', res.error);
      }
      if (res instanceof RoutesRecognized) {
        console.log('Routes Recognized:', res.state.root);
      }
    })
  }

  createTabOnPageLoad(res: NavigationEnd) {
    MENU_ITEMS.forEach((item) => {
      let title = this.createTabTitle(item, res.urlAfterRedirects)
      // if(title.split(' - ')[0] === '') {
      //   this.tabService.title$.next('dashboard')
      //   this.tabService.icon$.next('pi pi-home')
      //   this.router.navigate(['/dashboard'])
      //   return
      // }
      if (item.route.includes(title.split(' - ')[0])) {
        this.tabService.openTab(res.url, title.split(' - ')[0] === '' ? item.title : title, item.outlet, item.icon, true, false)
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

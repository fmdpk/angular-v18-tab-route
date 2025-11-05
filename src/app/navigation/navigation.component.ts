import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {Router} from '@angular/router';
import {TabService} from '../tab.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: 'navigation.component.html',
  styleUrl: 'navigation.component.scss'
})
export class NavigationComponent {
  constructor(private router: Router, private tabService: TabService) {}
  outlet = ''

  openTab(route: string, title: string, icon: string): void {
    // this.tabService.openTab(route, title, icon);
    this.outlet = String(title).charAt(0).toUpperCase() + String(title).slice(1)
    let routes = { outlet: [route] }
    console.log(this.outlet)
    this.tabService.title$.next(title)
    this.tabService.outlet$.next(this.outlet)
    this.tabService.icon$.next(icon)
    // this.router.navigate([{ outlets: { [String(title).charAt(0).toUpperCase() + String(title).slice(1)]: route }])
    // this.router.navigate([{ outlets: { [String(title).charAt(0).toUpperCase() + String(title).slice(1)]: route } }])
    // this.router.navigate(['', { outlets: { outlet: [route] } }])
    // this.router.navigate(['/', { [this.outlet]: { Dashboard: [route] } }])
    this.router.navigate([{ outlets: { [this.outlet]: [route] } }])
  }
}

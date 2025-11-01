import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {TabService} from '../tab.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: 'navigation.component.html',
  styleUrl: 'navigation.component.scss'
})
export class NavigationComponent {
  constructor(private tabService: TabService) {}

  openTab(route: string, title: string, icon: string): void {
    this.tabService.openTab(route, title, icon);
  }
}

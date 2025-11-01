import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {TabService} from '../tab.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  router = inject(Router)
  tabService = inject(TabService)

  items = [
    {
      id: 1,
      title: 'item 1'
    },
    {
      id: 2,
      title: 'item 2'
    },
    {
      id: 3,
      title: 'item 3'
    },
  ]

  goToDetail(item: {id: number, title: string}){
    this.router.navigate(['/dashboard', item.id])
    this.tabService.openTab(`${'/dashboard/' + item.id}`, item.title, '')
  }
}

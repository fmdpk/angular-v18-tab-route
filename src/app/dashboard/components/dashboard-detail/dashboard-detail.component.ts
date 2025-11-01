import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard-detail',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.scss'
})
export class DashboardDetailComponent implements OnInit{
  activatedRoute = inject(ActivatedRoute)

  title = signal('')
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.title.set(params['id']);
    });
  }
}

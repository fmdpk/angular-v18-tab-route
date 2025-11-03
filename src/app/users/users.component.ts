import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  title = 'users component'
  ngOnInit(){
    console.log(this.title)
    setTimeout(() => {
      this.title = 'users component after 2 seconds'
    }, 2000)
  }
}

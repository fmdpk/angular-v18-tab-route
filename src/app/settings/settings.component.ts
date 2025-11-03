import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  title = 'settings component'
  ngOnInit(){
    console.log(this.title)
    setTimeout(() => {
      this.title = 'settings component after 2 seconds'
    }, 2000)
  }
}

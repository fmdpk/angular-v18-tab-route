import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  title = 'settings component'
  cdr = inject(ChangeDetectorRef)
  ngOnInit(){
    console.log(this.title)
    setTimeout(() => {
      this.title = 'settings component after 2 seconds'
      // this.cdr.markForCheck()
    }, 2000)
  }
}

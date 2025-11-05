import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  title = 'products component'
  ngOnInit(){
    console.log(this.title)
    setTimeout(() => {
      this.title = 'products component after 2 seconds'
    }, 2000)
  }
}

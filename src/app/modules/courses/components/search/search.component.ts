import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent {
  value = '';

  onSearch(): void {
    console.log('onSearch ==> ', this.value);
  }
}

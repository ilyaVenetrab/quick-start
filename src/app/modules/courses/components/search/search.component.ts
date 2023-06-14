import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent {
  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  value = '';

  onSearch(): void {
    this.search.emit(this.value);
  }
}

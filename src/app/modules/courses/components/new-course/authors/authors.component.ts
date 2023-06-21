import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent {}

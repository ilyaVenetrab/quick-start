import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from '../../../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}

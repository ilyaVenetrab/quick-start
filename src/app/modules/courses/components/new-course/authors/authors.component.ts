import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy } from '@angular/core';
import { AuthorsService } from '../../../../../services/authors.service';
import { IAuthor } from '../../../../../models/authors';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthorsService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AuthorsComponent,
    },
  ],
})
export class AuthorsComponent implements ControlValueAccessor, OnDestroy {
  selectedAuthors: IAuthor[] | null = null;

  touched = false;

  onChange = (_author: IAuthor[] | null) => {};

  onTouched = () => {};

  authors$: BehaviorSubject<IAuthor[]> = new BehaviorSubject<IAuthor[]>([]);

  destroy$: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authorsService: AuthorsService) {}

  filterAuthors(event: any): void {
    this.authorsService
      .getList(event?.query || '')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authors) => {
        this.authors$.next(authors);
      });
  }

  onSelect(_author: IAuthor): void {
    this.onChange(this.selectedAuthors);
  }

  onUnselect({ fullName }: IAuthor): void {
    this.onChange(this.selectedAuthors?.filter((i) => i.fullName !== fullName) || null);
  }

  writeValue(author: IAuthor[]): void {
    this.selectedAuthors = author;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
  }
}

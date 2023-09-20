import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationCourseComponent } from './duration-course.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { DurationPipe } from '../../../pipes/duration.pipe';
import { FormsModule } from '@angular/forms';

describe('DurationCourseComponent', () => {
  let component: DurationCourseComponent;
  let fixture: ComponentFixture<DurationCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DurationCourseComponent, DurationPipe],
      imports: [InputNumberModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DurationCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

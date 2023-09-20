import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCourseComponent } from './new-course.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { CardModule } from 'primeng/card';
import { DurationCourseComponent } from './duration-course/duration-course.component';
import { CalendarModule } from 'primeng/calendar';
import { AuthorsComponent } from './authors/authors.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { autoSpy, SpyOf } from '../../../../utils/auto-spy';
import { HttpClient } from '@angular/common/http';
import { InputNumberModule } from 'primeng/inputnumber';
import { DurationPipe } from '../../pipes/duration.pipe';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { By } from '@angular/platform-browser';

describe('NewCourseComponent', () => {
  let component: NewCourseComponent;
  let fixture: ComponentFixture<NewCourseComponent>;
  const httpClient: SpyOf<HttpClient> = autoSpy(HttpClient);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CardModule,
        CalendarModule,
        InputNumberModule,
        AutoCompleteModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [NewCourseComponent, DurationCourseComponent, AuthorsComponent, DurationPipe],
      providers: [
        FormBuilder,
        provideMockStore({
          initialState: {
            isLoading: false,
            courses: [
              {
                id: 4,
                title: 'Sit voluptate eiusmod ea',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est fugit laudantium nobis quisquam recusandae?',
                creationData: '2023-06-09T21:00:00.000Z',
                duration: 35,
                authors: [
                  {
                    fullName: 'David Morrison',
                  },
                ],
                topRated: true,
              },
            ],
          },
        }),
        {
          provide: HttpClient,
          useValue: httpClient,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 fields initially', () => {
    const element = fixture.debugElement;
    const fields = element.queryAll(By.css('.p-float-label'));

    expect(fields.length).toBe(5);
  });

  it('should have correct form value', () => {
    component.form.patchValue({
      id: 4,
      title: 'Sit voluptate eiusmod ea',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est fugit laudantium nobis quisquam recusandae?',
      creationData: new Date('2023-06-09T21:00:00.000Z'),
      duration: 35,
      authors: [
        {
          fullName: 'David Morrison',
        },
      ],
      topRated: true,
    });

    expect(component.form.controls.id.value).toEqual(4);
    expect(component.form.controls.title.value).toEqual('Sit voluptate eiusmod ea');
    expect(component.form.controls.description.value).toEqual(
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est fugit laudantium nobis quisquam recusandae?',
    );
    expect(component.form.controls.duration.value).toEqual(35);
    expect(component.form.controls.authors.value).toEqual([
      {
        fullName: 'David Morrison',
      },
    ]);
    expect(component.form.controls.topRated.value).toEqual(true);
  });

  it('should save form', (done) => {
    const button = fixture.debugElement.query(By.css('.button-save'));
    spyOn(component, 'onSave');
    component.form.patchValue({
      id: 4,
      title: 'Sit voluptate eiusmod ea',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est fugit laudantium nobis quisquam recusandae?',
      creationData: new Date('2023-06-09T21:00:00.000Z'),
      duration: 35,
      authors: [
        {
          fullName: 'David Morrison',
        },
      ],
      topRated: true,
    });
    button.triggerEventHandler('click');
    fixture.whenStable().then(() => {
      expect(component.onSave).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should cancel form', () => {
    const button = fixture.debugElement.query(By.css('.button-cancel'));
    spyOn(component, 'onCancel');
    button.triggerEventHandler('click');
    expect(component.onCancel).toHaveBeenCalledTimes(1);
  });
});

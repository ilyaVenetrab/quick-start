import { CourseItemComponent } from './course-item.component';

function setup<T>(): { default: () => any; build: () => T; [key: string]: any } {
  const builder = {
    default(): any {
      return builder;
    },
    build(): any {
      return new CourseItemComponent();
    },
  };
  return builder;
}

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  const { build } = setup<CourseItemComponent>();

  beforeEach(() => {
    component = build();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit course', () => {
    component.course = {
      id: 3,
      title: 'Reprehenderit eiusmod nostrud amet',
      description:
        'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.',
      creationData: new Date('2023-06-09T21:00:00.000Z'),
      duration: 82,
      authors: [
        {
          fullName: 'John Doe',
        },
        {
          fullName: 'Don Romer',
        },
      ],
      topRated: false,
    };
    spyOn(component.edit, 'emit');

    component.onEdit();

    expect(component.edit.emit).toHaveBeenCalledOnceWith(component.course);
  });

  it('should delete course', () => {
    component.course = {
      id: 3,
      title: 'Reprehenderit eiusmod nostrud amet',
      description:
        'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.',
      creationData: new Date('2023-06-09T21:00:00.000Z'),
      duration: 82,
      authors: [
        {
          fullName: 'John Doe',
        },
        {
          fullName: 'Don Romer',
        },
      ],
      topRated: false,
    };
    spyOn(component.delete, 'emit');

    component.onDelete();

    expect(component.delete.emit).toHaveBeenCalledOnceWith(component.course.id);
  });
});

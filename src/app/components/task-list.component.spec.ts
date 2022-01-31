import { render } from '@testing-library/angular';
import { TaskListComponent } from './task-list.component';
import { Empty, WithPinnedTasks } from './task-list.stories';
import { TaskComponent } from './task.component';

describe('TaskList component', () => {
  it('renders pinned tasks at the start of the list', async () => {
    const mockedActions = jest.fn();

    const tree = await render(TaskListComponent, {
      declarations: [TaskComponent],
      componentProperties: {
        ...WithPinnedTasks.args,
        onPinTask: {
          emit: mockedActions,
        } as any,
        onArchiveTask: {
          emit: mockedActions,
        } as any,
      },
    });

    const component = tree.fixture.componentInstance;
    expect(component.tasksInOrder[0].id).toBe('6');
  });

  it('renders no tasks message when there are no tasks', async () => {
    const mockedActions = jest.fn();

    const tree = await render(TaskListComponent, {
      declarations: [TaskComponent],
      componentProperties: {
        ...Empty.args,
        onPinTask: { emit: mockedActions } as any,
        onArchiveTask: { emit: mockedActions } as any,
      },
    });

    const component = tree.fixture;
    const message = component.nativeElement.querySelector('.title-message');
    expect(message.textContent).toBe('You have no tasks');
  });
});

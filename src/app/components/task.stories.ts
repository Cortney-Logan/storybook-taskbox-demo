import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TaskComponent } from './task.component';

/// there are two levels of organization in Storybook: the component and its child stories
// each story is a permutation of a component

// to tell Storybook at the component we are documenting we create this default export
// - component: The component itself
// - title: how to refer to the component in the sidebar of the Storybook app
// - excludedStories: exports in the story file that should not be rendered as stories by storybook
export default {
  component: TaskComponent,
  decorators: [
    moduleMetadata({
      declarations: [TaskComponent],
      imports: [CommonModule],
    }),
  ],
  title: 'Task',
  excludedStories: /.*Data$/,
} as Meta;

// action() allows us to create a callback that appears in the action pannel of the storybook UI when clicked
// so when we build a pin button we'll be able to determin fi a button click is successful in the UI
// we need to pass the same set of actions to all permutations of our component
// so it is convenient to bundle them into a signel actionsData variable
// this is passed into our story definition each tiem
export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

// as we have multiple permutations of our component assigning it to a template variable is convenient
// Template.bind({}) is a technique for making a copy of a function
// this is used to allow each exported story to set its own properties but use the same implementation
// args (arguments) allow us to live-edit our components. Once an arg value changes, so does the component
const Template: Story = (args) => ({
  props: {
    ...args,
    onPinTask: actionsData.onPinTask,
    onArchiveTask: actionsData.onArchiveTask,
  },
});

// to define our stories we export a function for each of our test states to generate a story
// the story is a function that returns a rendered element (i.e. a component class with a set of props) in a given state
export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2021, 0, 1, 9, 0),
  },
};

// when creating a story we use the base task arg to build out the shape of the task the component expects
// this is typically modeled from what the actual data looks like
export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  },
};

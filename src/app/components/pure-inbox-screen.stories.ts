import { CommonModule } from '@angular/common';
import { NgxsModule, Store } from '@ngxs/store';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TasksState } from '../state/task.state';
import { PureInboxScreenComponent } from './pure-inbox-screen.component';
import { TaskModule } from './task.module';

export default {
  component: PureInboxScreenComponent,
  decorators: [
    moduleMetadata({
      declarations: [PureInboxScreenComponent],
      imports: [CommonModule, TaskModule, NgxsModule.forRoot([TasksState])],
      providers: [Store]
    }),
  ],
  title: 'PureInboxScreen',
} as Meta;

const Template: Story = args => ({
  props: args,
});

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: true,
};

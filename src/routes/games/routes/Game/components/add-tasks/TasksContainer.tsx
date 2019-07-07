import React, { FC } from 'react';
import {
  ListSubheader,
  List,
  ListItem,
  Divider,
  Box,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import AddTaskTextField from './AddTaskTextField';
import Task from 'models/task';
import DeleteIcon from 'mdi-material-ui/Delete';

interface TaskListItemProps {
  onRemoveTask: (taskId: string) => void;
  task: Task;
}

const TaskListItem: FC<TaskListItemProps> = ({ task, onRemoveTask }) => (
  <>
    <ListItem>
      <ListItemText primary={task.name} />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete"
          onClick={() => onRemoveTask(task.id || '')}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    <Divider variant="fullWidth" component="li" />
  </>
);

interface Props {
  newTaskText: string;
  onAddTask: () => void;
  onChange: (newText: string) => void;
  onRemoveTask: (taskId: string) => void;
  tasks: Task[];
}

const TasksContainer: FC<Props> = ({
  newTaskText,
  onAddTask,
  onRemoveTask,
  onChange,
  tasks
}) => (
  <List
    subheader={
      <ListSubheader>
        <div>Städuppgifter</div>
        <AddTaskTextField
          value={newTaskText}
          onChange={onChange}
          onSubmit={onAddTask}
        />
      </ListSubheader>
    }
  >
    <Box pl={2}>
      {tasks.map(task => (
        <TaskListItem key={task.id} task={task} onRemoveTask={onRemoveTask} />
      ))}
    </Box>
  </List>
);

export default TasksContainer;

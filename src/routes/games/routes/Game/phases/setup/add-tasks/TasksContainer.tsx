import React, { FC } from 'react';
import {
  List,
  ListItem,
  Divider,
  Box,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge as MuiBadge,
  Typography,
} from '@material-ui/core';
import AddTaskTextField from './AddTaskTextField';
import Task from 'models/task';
import DeleteIcon from 'mdi-material-ui/Delete';
import styled from 'styled-components/macro';
import { BadgeProps } from '@material-ui/core/Badge';
import StickyListSubHeader from 'components/StickyListSubHeader';

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

const Badge = styled(MuiBadge as FC<BadgeProps>)`
  && .MuiBadge-badge {
    right: -${({ theme }) => theme.spacing(2)}px;
    top: 50%;
    background-color: ${({ theme }) => theme.palette.grey[300]};
  }
`;

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
  tasks,
}) => (
  <List
    subheader={
      <StickyListSubHeader>
        <div>
          <Badge badgeContent={tasks.length}>
            <Typography>Städuppgifter</Typography>
          </Badge>
        </div>

        <AddTaskTextField
          value={newTaskText}
          onChange={onChange}
          onSubmit={onAddTask}
        />
      </StickyListSubHeader>
    }
  >
    <Box mt={1} pl={2}>
      {tasks.map(task => (
        <TaskListItem key={task.id} task={task} onRemoveTask={onRemoveTask} />
      ))}
    </Box>
  </List>
);

export default TasksContainer;

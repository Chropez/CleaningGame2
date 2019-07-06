import React, { FC } from 'react';
import {
  ListSubheader,
  List,
  TextField,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import SendIcon from 'mdi-material-ui/Send';

interface Props {
  tasks?: string;
}

function onAddTask(task: string) {
  console.log('adding task ' + task);
}

const TasksContainer: FC<Props> = () => (
  <List
    subheader={
      <ListSubheader>
        <div>Städuppgifter</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            onAddTask('dsdsd');
          }}
        >
          <TextField
            variant="outlined"
            label="Lägg till städuppgift"
            fullWidth={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="Lägg till städuppgift"
                    type="submit"
                    color="primary"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </ListSubheader>
    }
  ></List>
);

export default TasksContainer;

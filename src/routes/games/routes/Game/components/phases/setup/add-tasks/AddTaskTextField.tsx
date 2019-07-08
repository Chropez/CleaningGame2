import React, { FC } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SendIcon from 'mdi-material-ui/Send';

interface Props {
  onSubmit: () => void;
  onChange: (newText: string) => void;
  value: string;
}

const AddTaskTextField: FC<Props> = ({ onSubmit, onChange, value }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <TextField
      variant="outlined"
      label="Lägg till städuppgift"
      fullWidth={true}
      onChange={e => onChange(e.target.value)}
      value={value}
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
);

export default AddTaskTextField;

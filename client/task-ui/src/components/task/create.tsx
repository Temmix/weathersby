import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { useMutation, gql } from "@apollo/client";

const CREATE_TASK = gql`
  mutation TaskCreate(
    $title: String!
    $description: String!
    $completed: Boolean!
  ) {
    taskCreate(
      title: $title
      description: $description
      completed: $completed
    ) {
      taskErrors {
        message
      }
      task {
        title
        description
      }
    }
  }
`;

export const CreateTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [taskCreate] = useMutation(CREATE_TASK);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };

  function HandleSubmit(event: any) {
    event.preventDefault();
    console.log({ title, description, completed });

    taskCreate({
      variables: {
        title: title,
        description: description,
        completed: completed,
      },
    });
    // navigate to home page
    navigate("/tasks");
  }

  return (
    <React.Fragment>
      <div style={{ height: 400, width: "60%" }}>
        <form onSubmit={HandleSubmit}>
          <Box m={3} pt={5} padding={10}>
            <h2>Create Task Form</h2>
            <Stack spacing={2} direction='row' sx={{ marginBottom: 4 }}>
              <TextField
                type='text'
                variant='outlined'
                color='primary'
                label='Title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                size='small'
                fullWidth
                required
              />
            </Stack>
            <TextField
              type='text'
              variant='outlined'
              color='primary'
              label='Description'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              fullWidth
              required
              size='small'
              sx={{ mb: 4 }}
            />

            <Box pb={2}>
              <FormControlLabel
                label='completed'
                control={
                  <Checkbox checked={completed} onChange={handleChange} />
                }
              />
            </Box>
            <Button variant='outlined' color='primary' type='submit'>
              Submit
            </Button>
          </Box>
        </form>
      </div>
    </React.Fragment>
  );
};

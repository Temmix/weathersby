import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Box,
  FormControlLabel,
  Checkbox,
  LinearProgress,
  Alert,
} from "@mui/material";

import { useMutation, gql, useQuery } from "@apollo/client";

const GET_TASK = gql`
  query Task($taskId: ID!) {
    task(taskId: $taskId) {
      id
      title
      description
      completed
    }
  }
`;

const UPDATE_TASK = gql`
  mutation TaskUpdate(
    $taskId: ID!
    $title: String!
    $description: String!
    $completed: Boolean!
  ) {
    taskUpdate(
      taskId: $taskId
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

const DELETE_TASK = gql`
  mutation TaskDelete($taskId: ID!) {
    taskDelete(taskId: $taskId) {
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

export const UpdateTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const [taskUpdate] = useMutation(UPDATE_TASK);
  const [taskDelete] = useMutation(DELETE_TASK);
  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_TASK, {
    fetchPolicy: "no-cache",
    variables: { taskId: id },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };

  useEffect(() => {
    if (data && data.task !== null) {
      const { task } = data;
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed);
    }
  }, [data]);

  const HandleSubmit = (event: any) => {
    event.preventDefault();

    taskUpdate({
      variables: {
        taskId: id,
        title: title,
        description: description,
        completed: completed,
      },
    });
    // navigate to home page
    navigate("/");
  };

  const handleDelete = async () => {
    await taskDelete({ variables: { taskId: id } });
    navigate("/");
  };

  if (error || data?.task === null)
    return (
      <Box m={3} pt={5} padding={10}>
        <Alert variant='standard' severity='error'>
          Please try again later
        </Alert>
      </Box>
    );

  if (loading) return <LinearProgress color='inherit' />;

  return (
    <>
      <div style={{ height: 400, width: "60%" }}>
        <form onSubmit={HandleSubmit}>
          <Box m={3} pt={5} padding={10}>
            <h2>Update Task Form</h2>
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
            <Button
              disabled={!title || !description}
              variant='outlined'
              color='primary'
              type='submit'
              style={{ marginRight: "12px" }}
            >
              Submit
            </Button>
            <Button
              variant='outlined'
              color='error'
              type='button'
              onClick={handleDelete}
              style={{ marginRight: "12px" }}
            >
              Delete
            </Button>
            <Button
              variant='outlined'
              color='primary'
              type='button'
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
};

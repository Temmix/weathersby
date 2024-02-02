import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridRowParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { Alert, Box, Button, LinearProgress } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      completed
      createdAt
    }
  }
`;

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "description", headerName: "Description", width: 130 },
  { field: "completed", headerName: "Completed", width: 130 },
];

export const List = () => {
  const navigate = useNavigate();
  const { data, error, loading } = useQuery(GET_TASKS);

  if (error)
    return (
      <Box m={3} pt={5} padding={10}>
        <Alert variant='standard' severity='error'>
          This is a filled error Alert.
        </Alert>
      </Box>
    );

  if (loading) return <LinearProgress color='inherit' />;
  const handleRowClick = (
    params: GridRowParams,
    _event: MuiEvent<React.MouseEvent<HTMLElement>>,
    _details: GridCallbackDetails
  ) => {
    console.log({ params });
  };

  const handleNavigation = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/tasks/create");
  };

  return (
    <Box mr={10} ml={10} pt={5}>
      <Box mb={3}>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={handleNavigation}
        >
          New Task
        </Button>
      </Box>

      <div style={{ height: 400, width: "60%" }}>
        <DataGrid
          rows={data.tasks}
          onRowClick={handleRowClick}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25]}
        />
      </div>
    </Box>
  );
};

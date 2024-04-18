import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { UpdateTask, GET_TASK, UPDATE_TASK, DELETE_TASK } from "./update";
import { MockedProvider } from "@apollo/client/testing";

// Mock useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: "1" }),
}));

// Define mocks for Apollo client
const mocks = [
  {
    request: {
      query: GET_TASK,
      variables: { taskId: "1" },
    },
    result: {
      data: {
        task: {
          id: "1",
          title: "Test Title",
          description: "Test Description",
          completed: false,
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_TASK,
      variables: {
        taskId: "1",
        title: "Updated Title",
        description: "Updated Description",
        completed: true,
      },
    },
    result: {
      data: {
        taskUpdate: {
          taskErrors: [],
          task: {
            title: "Updated Title",
            description: "Updated Description",
          },
        },
      },
    },
  },
  {
    request: {
      query: DELETE_TASK,
      variables: { taskId: "1" },
    },
    result: {
      data: {
        taskDelete: {
          taskErrors: [],
          task: {
            title: "Test Title",
            description: "Test Description",
          },
        },
      },
    },
  },
];

describe("UpdateTask", () => {
  it("renders the update task form", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateTask />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/completed/i)).toBeInTheDocument();
      expect(screen.getByText(/Submit/i)).toBeInTheDocument();
      expect(screen.getByText(/Back/i)).toBeInTheDocument();
      expect(screen.getByText(/Delete/i)).toBeInTheDocument();
    });
  });

  it("submits the form with valid input", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateTask />
      </MockedProvider>
    );

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Title/i), {
        target: { value: "Updated Title" },
      });
      fireEvent.change(screen.getByLabelText(/Description/i), {
        target: { value: "Updated Description" },
      });
      fireEvent.click(screen.getByLabelText(/completed/i));

      fireEvent.click(screen.getByText(/Submit/i));
    });

    await waitFor(() => {
      expect(screen.getByText(/Back/i)).toBeInTheDocument();
    });
  });

  it("deletes the task when delete button is clicked", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateTask />
      </MockedProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Delete/i));
    });

    await waitFor(() => {
      expect(screen.getByText(/Back/i)).toBeInTheDocument();
    });
  });
});

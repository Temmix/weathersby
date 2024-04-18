import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { CreateTask, CREATE_TASK } from "./create";
import { MockedProvider } from "@apollo/client/testing";

// Mock useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

// Define mocks for Apollo client
const mocks = [
  {
    request: {
      query: CREATE_TASK,
      variables: {
        title: "Test Title",
        description: "Test Description",
        completed: false,
      },
    },
    result: {
      data: {
        taskCreate: {
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

describe("CreateTask", () => {
  it("renders the create task form", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateTask />
      </MockedProvider>
    );

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });

  it("submits the form with valid input", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateTask />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Test Description" },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/Back/i)).toBeInTheDocument();
    });
  });

  it("does not submit the form with invalid input", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateTask />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.queryByText(/Submit/i)).toBeDisabled();
    });
  });
});

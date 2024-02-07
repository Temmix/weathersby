import "@testing-library/jest-dom";
import { queryByText, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_TASKS, List } from "./list";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn(),
}));

describe("<List />", () => {
  it("renders the expected loading message when the query is loading", async () => {
    const taskListMock = {
      delay: 30,
      request: {
        query: GET_TASKS,
      },
    };
    const { container } = render(
      <MockedProvider mocks={[taskListMock]}>
        <List />
      </MockedProvider>
    );

    expect(await screen.getByRole("progressbar")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      "MuiLinearProgress-root MuiLinearProgress-colorInherit MuiLinearProgress-indeterminate css-futumu-MuiLinearProgress-root"
    );
  });
});

describe("<List />", () => {
  it("renders the expected error state", async () => {
    const taskListMock = {
      request: {
        query: GET_TASKS,
      },
      error: new Error("Network Error!"),
    };

    render(
      <MockedProvider mocks={[taskListMock]}>
        <List />
      </MockedProvider>
    );

    expect(
      await screen.findByText("Please try again later")
    ).toBeInTheDocument();
  });
});

describe("<List />", () => {
  it("renders the expected success state", async () => {
    const taskListMock = {
      request: {
        query: GET_TASKS,
      },
      result: {
        data: {
          tasks: [
            {
              id: "1",
              title: "Task #1",
              description: "Description for Task  #1",
            },
            {
              id: "2",
              title: "Task #2",
              description: "Description for Task  #2",
            },
          ],
        },
      },
    };

    render(
      <MockedProvider mocks={[taskListMock]}>
        <List />
      </MockedProvider>
    );

    // assert the title for each tasks is visible
    expect(await screen.findByText("Task #1")).toBeInTheDocument();
    expect(await screen.findByText("Task #2")).toBeInTheDocument();
  });
});

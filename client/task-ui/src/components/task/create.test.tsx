import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { CreateTask, CREATE_TASK } from "./create";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn(),
}));

describe("<CreateTask />", () => {
  it("should render success states on create", async () => {
    const task = {
      title: "First title",
      description: "Cool description",
      completed: false,
    };
    const mocks = [
      {
        request: {
          query: CREATE_TASK,
          variables: task,
        },
        result: { data: task },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateTask />
      </MockedProvider>
    );

    // Find the button element...
    const button = screen.getByText("Submit");
    fireEvent.click(button); // Simulate a click and fire the mutation
  });
});

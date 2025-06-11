import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../redux/store";
import { MemoryRouter } from "react-router";
import Profile from "./Profile";

describe("Profile component", () => {
  test("Renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );
  });
});

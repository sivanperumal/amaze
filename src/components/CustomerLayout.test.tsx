import { render } from "@testing-library/react";
import CustomerLayout from "./CustomerLayout";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import { MemoryRouter } from "react-router";

describe("Customer Layout Component", () => {
  test("Component Render correctly", () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <CustomerLayout />
        </MemoryRouter>
      </Provider>
    );
  });
});

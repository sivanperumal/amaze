import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import MainLayout from "./MainLayout";
import { MemoryRouter } from "react-router";
import { SidebarProps } from "./CategorySidebar";
import { HeaderProps } from "./Header";

jest.mock("./CategorySidebar", () => {
  return {
    __esModule: true,
    default: (props: SidebarProps) => (
      <div>
        <button
          onClick={props.onCloseSidebar}
          data-testid="open-category-sidebar"
        >
          Open Close Sidebar
        </button>
        <label>{props.open}</label>
      </div>
    ),
  };
});

jest.mock("./Header", () => {
  return {
    __esModule: true,
    default: (props: HeaderProps) => (
      <div>
        <button
          onClick={props.onClickSidebar}
          data-testid="open-header-sidebar"
        >
          Open Close Sidebar
        </button>
      </div>
    ),
  };
});
describe("MainLayout component", () => {
  test("Renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <MainLayout />
        </MemoryRouter>
      </Provider>
    );

    const sidebarBtn = screen.getByTestId("open-category-sidebar");
    expect(sidebarBtn).toBeInTheDocument();
    fireEvent.click(sidebarBtn);

    const headerBtn = screen.getByTestId("open-header-sidebar");
    expect(headerBtn).toBeInTheDocument();
    fireEvent.click(headerBtn);
  });
});

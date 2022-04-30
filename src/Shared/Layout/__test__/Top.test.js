import { render, screen } from "@testing-library/react";
import { format } from "date-fns";
import TopBar from "../TopBar";
const handelClick = jest.fn();
describe("Should render the top bar", () => {
  test("Should render last logged in status when the user is authenticated", () => {
    render(
      <TopBar
        appBar=""
        auth={true}
        mobileOpen={handelClick}
        logOutApp={handelClick}
      />
    );
    const header = screen.getByText(
      `Last logged In ${format(new Date(), "MMMM d, yyyy")}`
    );
    expect(header).toBeInTheDocument();
  });

  test("Should render welcome message when the user is not authenticated", () => {
    render(
      <TopBar
        appBar=""
        auth={false}
        mobileOpen={handelClick}
        logOutApp={handelClick}
      />
    );
    const header = screen.getByText("Welcome to Airline Services");
    expect(header).toBeInTheDocument();
  });
});

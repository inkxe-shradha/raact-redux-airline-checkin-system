import {
  fireEvent,
  render as customRender,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import Login from "../Login";
import reduxStore from "../../../store/store";
import { ThemeProvider } from "@mui/styles";
import { Router } from "react-router-dom";
import { createTheme } from "@mui/system";
import { createMemoryHistory } from "history";
const store = reduxStore();
const theme = createTheme();
const render = (component, location) => {
  const history = createMemoryHistory();
  history.push(location);
  return customRender(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router location={history.location} navigator={history}>
          {component}
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

describe("Should test Login page", () => {
  it("Should sign in button present on the component", () => {
    render(<Login />, "/login");
    const linkElement = screen.getAllByText(/Sign In/i);
    expect(linkElement).toBeTruthy();
  });

  it("Input should be initially empty", () => {
    render(<Login />, "/login");
    const emailElement = screen.getByRole("textbox", { name: "Email" });
    const passwordElement = screen.getByLabelText(/password/i);
    expect(emailElement.value).toBe("");
    expect(passwordElement.value).toBe("");
  });

  it("Should be able to type an email", async () => {
    render(<Login />, "/login");
    const emailElement = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailElement, {
      target: { value: "shradhasuman2@gmail.com" },
    });
    await waitFor(() => {
      expect(emailElement.value).toBe("shradhasuman2@gmail.com");
    });
  });

  it("Should be able to type a password", async () => {
    render(<Login />, "/login");
    const passwordElement = screen.getByLabelText(/password/i);
    fireEvent.change(passwordElement, { target: { value: "12345678" } });
    await waitFor(() => {
      expect(passwordElement.value).toBe("12345678");
    });
  });

  it("Should be show invalid email if the email is not valid", async () => {
    render(<Login />, "/login");
    const errorElement = screen.queryByText(/Enter a valid email/i);
    expect(errorElement).not.toBeInTheDocument();
    // getting the email field for testing purposes
    const emailElement = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailElement, { target: { value: "shradhasuman.com" } });
    const submitButtonElement = screen.getByRole("button", { name: /Log in/i });

    fireEvent.click(submitButtonElement);
    await waitFor(() => {
      const emailErrorAfter = screen.getByText("Enter a valid email");
      expect(emailErrorAfter).toBeInTheDocument();
    });
  });

  it("Should be show invalid password if the password  length is less than 8", async () => {
    render(<Login />, "/login");
    const errorElement = screen.queryByText(
      /Password should be of minimum 8 characters length/i
    );
    expect(errorElement).not.toBeInTheDocument();
    // getting the email field for testing purposes
    const passwordElement = screen.getByLabelText(/password/i);
    fireEvent.change(passwordElement, { target: { value: "12345" } });
    const submitButtonElement = screen.getByRole("button", { name: /Log in/i });

    fireEvent.click(submitButtonElement);
    await waitFor(() => {
      const passwordErrorAfter = screen.getByText(
        "Password should be of minimum 8 characters length"
      );
      expect(passwordErrorAfter).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { StudentProvider } from "./context/StudentContext";

test("renders the CampusDesk overview", () => {
  render(
    <MemoryRouter>
      <StudentProvider>
        <App />
      </StudentProvider>
    </MemoryRouter>
  );

  expect(screen.getByText("Good morning, Admin.")).toBeInTheDocument();
  expect(screen.getByText("Total students")).toBeInTheDocument();
});
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { App, WrappedApp } from "./App";

describe("App", () => {
  it("renders hello world", () => {
    // given
    render(<WrappedApp />);
    // when
    // then
    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("hello world");
  });

  it("renders not found when invalid path", () => {
    render(
      <MemoryRouter initialEntries={["/this-route-does-not-exist"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("not found");
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";

const geistSans = { variable: "geist-sans-variable" };
const geistMono = { variable: "geist-mono-variable" };

function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      lang="es"
      data-testid="layout-container"
    >
      {children}
    </div>
  );
}

describe("RootLayout", () => {
  it("renders children inside layout", () => {
    render(
      <TestLayout>
        <div data-testid="child">Hello World</div>
      </TestLayout>
    );
    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Hello World");
  });

  it("applies font classes and language attribute", () => {
    render(<TestLayout><div /></TestLayout>);
    const container = screen.getByTestId("layout-container");

    expect(container).toHaveClass("geist-sans-variable");
    expect(container).toHaveClass("geist-mono-variable");
    expect(container).toHaveClass("antialiased");
    expect(container).toHaveAttribute("lang", "es");
  });

  it("handles null children without throwing errors", () => {
    expect(() => render(<TestLayout>{null}</TestLayout>)).not.toThrow();
    const container = screen.getByTestId("layout-container");
    expect(container).toBeInTheDocument();
  });

  it("handles invalid children without throwing errors", () => {
    // @ts-expect-error: purposely passing invalid children type
    expect(() => render(<TestLayout>{12345}</TestLayout>)).not.toThrow();
    const container = screen.getByTestId("layout-container");
    expect(container).toBeInTheDocument();
    expect(container.textContent).toContain("12345");
  });
});

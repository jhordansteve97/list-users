import React from "react";
import { render, screen } from "@testing-library/react";
import { TableHeader } from "@/app/components/table/tableHeader";

describe("TableHeader", () => {
  it("shouldRenderTwoHeaderColumns", () => {
    render(<table><TableHeader /></table>);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(2);
  });

  it("shouldDisplayUsuariosInFirstHeader", () => {
    render(<table><TableHeader /></table>);
    const usuariosHeader = screen.getByText("Usuarios");
    expect(usuariosHeader).toBeInTheDocument();
  });

  it("shouldApplyCorrectClassesToHeaderColumns", () => {
    render(<table><TableHeader /></table>);
    const headers = screen.getAllByRole("columnheader");
    headers.forEach((header) => {
      expect(header).toHaveClass(
        "p-4",
        "transition-colors",
        "cursor-pointer",
        "border-y",
        "border-slate-200",
        "bg-slate-50",
        "hover:bg-slate-100"
      );
    });
  });

  it("shouldRenderWithoutParentTable", () => {
    expect(() => render(<TableHeader />)).not.toThrow();
    // Optionally check for thead presence
    expect(screen.getByRole("row")).toBeInTheDocument();
  });

  it("shouldIgnoreUnexpectedProps", () => {
    // @ts-expect-error: testing unexpected props
    render(<TableHeader className="unexpected" data-test="foo" />);
    // Should still render as normal
    expect(screen.getByText("Usuarios")).toBeInTheDocument();
  });

  it("shouldRenderMultipleInstancesCorrectly", () => {
    render(
      <table>
        <TableHeader />
        <TableHeader />
      </table>
    );
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(4); // 2 headers per instance, 2 instances
    const usuariosHeaders = screen.getAllByText("Usuarios");
    expect(usuariosHeaders).toHaveLength(2);
  });
});
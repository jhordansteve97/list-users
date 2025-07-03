import React from "react";
import { render, screen } from "@testing-library/react";
import { TableCard } from "@/app/components/table/tableCard";

describe("TableCard", () => {
  it("should_render_children_inside_table_card", () => {
    render(
      <TableCard>
        <span data-testid="child-element">Child Content</span>
      </TableCard>
    );
    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("should_display_title_and_description_text", () => {
    render(
      <TableCard>
        <div />
      </TableCard>
    );
    expect(screen.getByText("Lista de Usuarios")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Revisa a detalle cada usuario dando clic en el botón de ver."
      )
    ).toBeInTheDocument();
  });

  it("should_apply_expected_css_classes", () => {
    const { container } = render(
      <TableCard>
        <div />
      </TableCard>
    );
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass(
      "relative",
      "mx-4",
      "mt-4",
      "overflow-hidden",
      "text-slate-700",
      "bg-white",
      "rounded-none",
      "bg-clip-border"
    );
  });

  it("should_handle_null_children_without_error", () => {
    expect(() =>
      render(
        // @ts-expect-error Testing null children edge case
        <TableCard>{null}</TableCard>
      )
    ).not.toThrow();
    expect(screen.getByText("Lista de Usuarios")).toBeInTheDocument();
  });

  it("should_render_react_fragment_as_children", () => {
    render(
      <TableCard>
        <>
          <div data-testid="frag-1">Fragment 1</div>
          <div data-testid="frag-2">Fragment 2</div>
        </>
      </TableCard>
    );
    expect(screen.getByTestId("frag-1")).toBeInTheDocument();
    expect(screen.getByTestId("frag-2")).toBeInTheDocument();
  });

  it("should_maintain_layout_with_large_or_nested_children", () => {
    const largeNestedChild = (
      <div data-testid="large-nested">
        <div>
          <div>
            <div>
              <div>
                <span>Deep Content</span>
                <div style={{ height: "1000px", width: "1000px" }}>
                  Large Content
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    const { container } = render(
      <TableCard>{largeNestedChild}</TableCard>
    );
    expect(screen.getByTestId("large-nested")).toBeInTheDocument();
    expect(screen.getByText("Deep Content")).toBeInTheDocument();
    expect(screen.getByText("Large Content")).toBeInTheDocument();
    // Layout integrity: outer div should still have expected classes
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass("relative", "mx-4", "mt-4");
  });
});
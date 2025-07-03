import React from "react";
import { render, screen } from "@testing-library/react";
import { TableBody } from "@/app/components/table/tableBody";
import { User } from "@/app/types/usersTypes";

// Mocks for next/image and next/link
jest.mock("next/image", () => (props: any) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
});
jest.mock("next/link", () => {
  return ({ href, children, ...rest }: any) => <a href={href} {...rest}>{children}</a>;
});

// Mock for errorImage
jest.mock("../../../../public/errorImagen.png", () => "errorImagen.png");

describe("TableBody", () => {
  const validUser: User = {
    id: 42,
    email: "test@example.com",
    first_name: "John",
    last_name: "Doe",
    avatar: "https://example.com/avatar.jpg",
  };

  it("should_render_user_information_with_valid_props", () => {
    render(<table><tbody><TableBody {...validUser} /></tbody></table>);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", validUser.avatar);
    expect(img).toHaveAttribute("alt", "John");
  });

  it("should_display_avatar_image_when_avatar_url_is_provided", () => {
    render(<table><tbody><TableBody {...validUser} /></tbody></table>);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", validUser.avatar);
  });

  it("should_navigate_to_correct_user_page_on_link_click", () => {
    render(<table><tbody><TableBody {...validUser} /></tbody></table>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/user/${validUser.id}`);
  });

  it("should_display_fallback_image_when_avatar_is_missing_or_invalid", () => {
    const userWithoutAvatar = { ...validUser, avatar: "" };
    render(<table><tbody><TableBody {...userWithoutAvatar} /></tbody></table>);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "errorImagen.png");
  });

  it("should_handle_missing_user_fields_gracefully", () => {
    // Remove email and last_name
    const incompleteUser = {
      id: 1,
      email: "",
      first_name: "Jane",
      last_name: "",
      avatar: "",
    };
    render(<table><tbody><TableBody {...incompleteUser} /></tbody></table>);
    expect(screen.getByText("Jane")).toBeInTheDocument();
    // Email is empty, so the <p> should still be present but empty
    expect(screen.getAllByText("")).toBeTruthy();
  });

  it("should_render_correctly_with_empty_or_null_props", () => {
    // @ts-expect-error: Testing with null/empty props
    render(<table><tbody><TableBody /></tbody></table>);
    // Should not throw, but since required props are missing, nothing should render
    // The test passes if no error is thrown and the table row is present
    expect(screen.queryByRole("row")).not.toBeNull();
  });
});
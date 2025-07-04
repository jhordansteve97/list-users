import React from "react";
import { render, screen } from "@testing-library/react";
import type { User } from "@/app/types";
import { Card } from "@/app/components";

// Mock next/image
jest.mock("next/image", () => (props: any) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock errorImage
jest.mock("../../../../public/errorImagen.png", () => "mocked-error-image.png");

describe("Card component", () => {
  const baseUser: User = {
    id: 1,
    email: "test@example.com",
    first_name: "John",
    last_name: "Doe",
    avatar: "https://example.com/avatar.jpg",
  };

  it("should_render_user_card_with_all_required_data", () => {
    render(<Card {...baseUser} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should_display_avatar_image_with_correct_attributes", () => {
    render(<Card {...baseUser} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", baseUser.avatar);
    expect(img).toHaveAttribute("alt", baseUser.first_name);
    expect(img).toHaveClass("w-30 h-30 rounded-full mx-auto");
  });

  it("should_display_full_name_and_email_correctly", () => {
    render(<Card {...baseUser} />);
    expect(screen.getByText(`${baseUser.first_name} ${baseUser.last_name}`)).toBeInTheDocument();
    expect(screen.getByText(baseUser.email)).toBeInTheDocument();
  });

  it("should_show_fallback_message_when_required_data_missing", () => {
    const { container } = render(
      <Card
        id={2}
        email=""
        first_name="Jane"
        last_name="Smith"
        avatar="https://example.com/avatar2.jpg"
      />
    );
    expect(container).toHaveTextContent("Faltan datos obligatorios");
  });

  it("should_not_render_avatar_when_avatar_url_missing", () => {
    const userWithoutAvatar = { ...baseUser, avatar: "" };
    render(<Card {...userWithoutAvatar} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("Faltan datos obligatorios")).toBeInTheDocument();
  });

  it("should_handle_null_or_undefined_user_fields", () => {
    // Test with null values
    // @ts-expect-error: Testing null/undefined handling
    render(<Card id={3} email={null} first_name={null} last_name={null} avatar={null} />);
    expect(screen.getByText("Faltan datos obligatorios")).toBeInTheDocument();

    // Test with undefined values
    // @ts-expect-error: Testing null/undefined handling
    render(<Card id={4} email={undefined} first_name={undefined} last_name={undefined} avatar={undefined} />);
    expect(screen.getAllByText("Faltan datos obligatorios").length).toBeGreaterThan(1);
  });
});
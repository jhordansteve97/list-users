import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TableContainer } from "@/app/components/table/tableContainer";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

export const mockUsers = {
  data: [
    {
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "",
    },
    {
      id: 2,
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      last_name: "Weaver",
      avatar: "",
    },
    {
      id: 3,
      email: "emma.wong@reqres.in",
      first_name: "Emma",
      last_name: "Wong",
      avatar: "",
    },
  ],
  page: 1,
  per_page: 6,
  total: 12,
  total_pages: 2,
  support: {
    url: "",
    text: "All the Pokémon data you'll ever need in one place, easily accessible through a modern free open-source RESTful API.",
  },
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  mockPush.mockClear();
});

describe("TableContainer", () => {
  it("should_render_initial_user_list", () => {
    render(<TableContainer users={mockUsers} />);
    expect(screen.getByText((text) => text.includes('George'))).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes("Janet"))).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes("Emma"))).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes("Pagina 1 de 2"))).toBeInTheDocument();
  });

  it("should_filter_users_based_on_search_input", () => {
    render(<TableContainer users={mockUsers} />);
    const input = screen.getByPlaceholderText("Buscar usuario...");
    fireEvent.change(input, { target: { value: "Janet" } });
    expect(screen.getByText((text) => text.includes("Janet"))).toBeInTheDocument();
    expect(screen.queryByText((text) => text.includes("George"))).not.toBeInTheDocument();
    expect(screen.queryByText((text) => text.includes("Emma"))).not.toBeInTheDocument();
  });

  it("should_display_empty_table_when_no_users_match_search", () => {
    render(<TableContainer users={mockUsers} />);
    const input = screen.getByPlaceholderText("Buscar usuario...");
    fireEvent.change(input, { target: { value: "notfound" } });
    // TableBody rows should not be rendered
    expect(screen.queryByText((text) => text.includes("George"))).not.toBeInTheDocument();
    expect(screen.queryByText((text) => text.includes("Janet"))).not.toBeInTheDocument();
    expect(screen.queryByText((text) => text.includes("Emma"))).not.toBeInTheDocument();
    // Optionally, check for empty state if implemented
  });

  it("should_disable_anterior_button_on_first_page", () => {
    const usersOnFirstPage = { ...mockUsers, page: 1 };
    render(<TableContainer users={usersOnFirstPage} />);
    const anteriorBtn = screen.getByRole("button", { name: /Anterior/i });
    expect(anteriorBtn).toBeDisabled();
    const siguienteBtn = screen.getByRole("button", { name: /Siguiente/i });
    expect(siguienteBtn).not.toBeDisabled();
  });

});

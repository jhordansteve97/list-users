import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import UserListPage from "@/app/(users)/userList/[page]/page";
import { getUsers } from "@/app/services";
import { notFound } from "next/navigation";
import { TableContainer } from "@/app/components";

jest.mock("@/app/services", () => ({
  getUsers: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));
jest.mock("@/app/components", () => ({
  TableContainer: jest.fn(() => <div data-testid="table-container" />),
}));

describe("UserListPage", () => {
  const mockParams = Promise.resolve({ page: "2" });
  const mockUsersData = {
    data: [{ id: 1, name: "Alice" }],
    page: 2,
    total_pages: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("test_renders_user_list_page_with_valid_data", async () => {
    (getUsers as jest.Mock).mockResolvedValue(mockUsersData);

    // @ts-ignore
    const { container, findByTestId } = render(
      // @ts-ignore
      await UserListPage({ params: mockParams })
    );

    expect(getUsers).toHaveBeenCalledWith("2");
    expect(await findByTestId("table-container")).toBeInTheDocument();
  });


  it("test_async_param_and_data_fetching_success", async () => {
    (getUsers as jest.Mock).mockResolvedValue(mockUsersData);

    // @ts-ignore
    await UserListPage({ params: mockParams });

    expect(getUsers).toHaveBeenCalledTimes(1);
    expect(getUsers).toHaveBeenCalledWith("2");
  });

  it("test_not_found_triggered_on_null_user_data", async () => {
    (getUsers as jest.Mock).mockResolvedValue(null);

    // @ts-ignore
    await UserListPage({ params: mockParams });

    expect(notFound).toHaveBeenCalled();
  });

  it("test_invalid_or_malformed_params_handling", async () => {
    (getUsers as jest.Mock).mockResolvedValue(null);

    // params is missing 'page'
    const malformedParams = Promise.resolve({});

    // @ts-ignore
    await UserListPage({ params: malformedParams });

    expect(getUsers).toHaveBeenCalledWith(undefined);
    expect(notFound).toHaveBeenCalled();
  });
});
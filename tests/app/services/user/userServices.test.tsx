import { getUsers, getUser } from "@/app/services/users/userServices";
import type { User } from "@/app/types";
import { mockUsers } from "tests/app/components/table/tableContainer.test";

describe("User Service", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, URL: "https://mockapi.com" };
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.env = OLD_ENV;
  });

  describe("getUsers", () => {
    it("should return the users correctly when fetch is successful", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      } as Response);

      const result = await getUsers("1");
      expect(result).toEqual(mockUsers);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://mockapi.com/api/users?page=1",
        {
          method: "GET",
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      );
    });

    it("should return null if response is not ok", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      const result = await getUsers("1");
      expect(result).toBeNull();
    });

    it("should return null if fetch throws an error", async () => {
      global.fetch = jest
        .fn()
        .mockRejectedValueOnce(new Error("network error"));

      const result = await getUsers("1");
      expect(result).toBeNull();
    });
  });

  describe("getUser", () => {
    it("should return the user correctly when fetch is successful", async () => {
      const mockUser: User = {
        id: 1,
        email: "george.bluth@reqres.in",
        first_name: "George",
        last_name: "Bluth",
        avatar: "",
      };

      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockUser }),
      } as Response);

      const result = await getUser("1");
      expect(result).toEqual(mockUser);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://mockapi.com/api/users/1",
        {
          method: "GET",
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      );
    });

    it("should return null if response is not ok", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      const result = await getUser("1");
      expect(result).toBeNull();
    });

    it("should return null if fetch throws an error", async () => {
      global.fetch = jest.fn().mockRejectedValueOnce(new Error("network fail"));

      const result = await getUser("1");
      expect(result).toBeNull();
    });
  });
});

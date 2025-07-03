import { generateMetadata } from "@/app/(users)/user/[id]/page";
import { getUser } from "@/app/services";
import type { Metadata } from "next";

jest.mock("@/app/services", () => ({
  getUser: jest.fn(),
}));

describe("generateMetadata", () => {
  const errorJson = {
    title: "Usuario no encontrado",
    description: "No existe el usuario",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("test_generateMetadata_returns_metadata_for_existing_user", async () => {
    const mockUser = {
      id: "123",
      first_name: "John",
      last_name: "Doe",
    };
    (getUser as jest.Mock).mockResolvedValue(mockUser);

    const params = Promise.resolve({ id: "123" });
    const result = await generateMetadata({ params });

    expect(getUser).toHaveBeenCalledWith("123");
    expect(result).toEqual({
      title: "#123 - John Doe",
      description: "Pagina del usuario John Doe",
    });
  });

  it("test_generateMetadata_extracts_id_from_params", async () => {
    const mockUser = {
      id: "abc",
      first_name: "Jane",
      last_name: "Smith",
    };
    (getUser as jest.Mock).mockResolvedValue(mockUser);

    const params = Promise.resolve({ id: "abc" });
    await generateMetadata({ params });

    expect(getUser).toHaveBeenCalledWith("abc");
  });

  it("test_generateMetadata_metadata_format_for_valid_user", async () => {
    const mockUser = {
      id: "42",
      first_name: "Alice",
      last_name: "Wonderland",
    };
    (getUser as jest.Mock).mockResolvedValue(mockUser);

    const params = Promise.resolve({ id: "42" });
    const result = await generateMetadata({ params });

    expect(result.title).toBe("#42 - Alice Wonderland");
    expect(result.description).toBe("Pagina del usuario Alice Wonderland");
  });

  it("test_generateMetadata_returns_error_metadata_for_nonexistent_user", async () => {
    (getUser as jest.Mock).mockResolvedValue(null);

    const params = Promise.resolve({ id: "999" });
    const result = await generateMetadata({ params });

    expect(result).toEqual(errorJson);
  });

  it("test_generateMetadata_returns_error_metadata_on_exception", async () => {
    (getUser as jest.Mock).mockImplementation(() => {
      throw new Error("Network error");
    });

    const params = Promise.resolve({ id: "fail" });
    const result = await generateMetadata({ params });

    expect(result).toEqual(errorJson);
  });

  it("test_generateMetadata_handles_missing_id_in_params", async () => {
    // @ts-expect-error purposely omitting id
    const params = Promise.resolve({});
    const result = await generateMetadata({ params });

    expect(result).toEqual(errorJson);
  });
});
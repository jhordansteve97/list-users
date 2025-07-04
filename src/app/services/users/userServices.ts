import { User, UsersResponse } from "@/app/types";
const url = process.env.NEXT_PUBLIC_API_URL;

/**
 * Consumes the API to obtain a list of users.
 * @param {string} page - the user's page number.
 * @returns {UsersResponse | null} returns null if there is an error or returns a json if successful.
 */
export const getUsers = async (page: string): Promise<UsersResponse | null> => {
  try {
    const res = await fetch(`${url}/api/users?page=${page}`, {
      method: "GET",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    if (!res.ok) {
      console.error(res.status);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error en fetchUser:", error);
    return null;
  }
};

/**
 * consumes the API to get a specific user.
 * @param {string} id - needs an id to search for the user.
 * @returns {User | null} returns null if there is an error or returns a json if successful.
 */
export const getUser = async (id: string): Promise<User | null> => {
  try {
    const res = await fetch(`${url}/api/users/${id}`, {
      method: "GET",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    if (!res.ok) {
      console.error(res.status);
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

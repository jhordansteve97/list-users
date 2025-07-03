"use client";
import { UsersResponse } from "@/app/types";
import { TableBody } from "./tableBody";
import { TableCard } from "./tableCard";
import { TableHeader } from "./tableHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  users: UsersResponse;
}
export const TableContainer = ({ users }: Props) => {
  const { data, page, total_pages } = users;
  const [usersState, setUsersState] = useState(data);
  const router = useRouter();

  const filterUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length) {
      const filtered = usersState.filter((user) =>
        Object.values(user).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm)
        )
      );
      setUsersState(filtered);
    } else {
      setUsersState(data); // Resetear si no hay búsqueda
    }
  };

  return (
    <div className="max-w-[720px] min-w-[300px] w-full">
      <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
        <TableCard>
          <input
            type="search"
            onChange={filterUser}
            className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar usuario..."
          />
        </TableCard>
        <div className="p-0 max-h-[520px] overflow-auto">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <TableHeader />
            <tbody>
              {usersState?.map((user) => (
                <TableBody key={user.id} {...user} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-3">
          <p className="block text-sm text-slate-500">
            Pagina {page} de {total_pages}
          </p>
          <div className="flex gap-1">
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => router.push(`/userList/${page - 1}`)}
              disabled={page === 1}
            >
              Anterior
            </button>
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => router.push(`/userList/${page + 1}`)}
              disabled={page === total_pages}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";

export const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
          <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
            Usuarios
          </p>
        </th>
        <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
          <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500"></p>
        </th>
      </tr>
    </thead>
  );
};

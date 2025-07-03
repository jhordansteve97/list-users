import React from "react";

interface Props {
  children: React.JSX.Element
}

export const TableCard = ({children}: Props) => {
  return (
    <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
      <div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-slate-800">
            Lista de Usuarios
          </h3>
          <p className="text-slate-500 line-clamp-2">
            Revisa a detalle cada usuario dando clic en el botón de ver.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

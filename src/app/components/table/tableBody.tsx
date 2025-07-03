import { User } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GrView } from "react-icons/gr";
import errorImage from "../../../../public/errorImagen.png";

export const TableBody = ({...props}: User) => {
  const {id, email, first_name, last_name, avatar} = props;
  return (
    <tr>
      <td className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={avatar || errorImage}
            alt={first_name}
            className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-slate-700">{first_name} {last_name} </p>
            <p className="text-sm text-slate-500">{email}</p>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-slate-200 flex flex-col justify-center items-center">
        <Link
          href={`/user/${id}`}
          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          title="ver usuario"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-slate-500">
            <GrView size={20} />
          </span>
        </Link>
      </td>
    </tr>
  );
};

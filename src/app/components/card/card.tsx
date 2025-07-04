"use client";
import { useRouter } from "next/navigation";
import { User } from "@/app/types";
import Image from "next/image";
import React from "react";
import errorImage from "../../../../public/errorImagen.png";

export const Card = ({ ...props }: User) => {
  const { email, first_name, last_name, avatar } = props;
  const router = useRouter();
  if (!email || !first_name || !last_name || !avatar) {
    return (
      <div>
        <p>Faltan datos obligatorios</p>
        <button onClick={() => router.back()}>Volver atrás</button>
      </div>
    );
  }
  return (
    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-xl/20 p-5">
      {avatar &&
      <Image
        width={30}
        height={30}
        src={avatar || errorImage}
        alt={first_name}
        className="w-30 h-30 rounded-full mx-auto"
      />}
      <h2 className="text-center text-2xl font-semibold mt-3">
        {first_name || ""} {last_name || ""}
      </h2>
      <p className="text-center text-gray-600 mt-1">{email || ""}</p>
      <div className="w-full flex justify-center mt-4">
        <button
          className="m-auto rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={() => router.back()}
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
};

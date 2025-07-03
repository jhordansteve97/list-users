"use client";
import { User } from "@/app/types";
import Image from "next/image";
import React from "react";
import errorImage from "../../../../public/errorImagen.png";

export const Card = ({ ...props }: User) => {
  const { email, first_name, last_name, avatar } = props;
  if (!email || !first_name || !last_name || !avatar) {
    return <p>Faltan datos obligatorios</p>; // o lanzar error, o renderizar un fallback
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
    </div>
  );
};

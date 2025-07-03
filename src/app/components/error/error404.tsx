import Image from "next/image";
import Link from "next/link";
import React from "react";
import imageBg from "../../../../public/image.svg";

export const Error404 = () => {
  return (
    <Link href={'/userList/1'} className="w-full h-screen flex flex-col items-center justify-center">
      <Image src={imageBg} alt="fondo" />
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">
          Page Not Found
        </p>
        <p className="md:text-lg lg:text-xl text-gray-600 mt-8">
          Lo sentimos, no se encontro el usuario que buscaba.
        </p>
        <button>regresar</button>
      </div>
    </Link>
  );
};


import { Card } from "@/app/components";
import { getUser } from "@/app/services";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const errorJson = {
      title: 'Usuario no encontrado',
      description: 'No existe el usuario'
    };

  try {
    const { id } = await params;
    const user = await getUser(id);
    if (user) {
      return {
        title: `#${user.id} - ${user.first_name} ${user.last_name}`,
        description: `Pagina del usuario ${user.first_name} ${user.last_name}`,
      };
    }
    return errorJson;
  } catch (error) {
    console.error(error);
    return errorJson;
  }

}

export default async function Userid({ params }: Props) {
  const { id } = await params;
  const userData = await getUser(id);

  if (!userData) {
    notFound();
  }

  return (
    <div className="h-screen flex justify-center items-center">
      {userData && <Card {...userData} />}
    </div>
  );
}

import { TableContainer } from "@/app/components";
import { getUsers } from "@/app/services";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ page: string }>;
}

export default async function UserListPage({params}: Props) {
  const { page } = await params;
  const usersData = await getUsers(page);

  if (!usersData) {
    notFound();
  }

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      {usersData && <TableContainer users={usersData} />}
    </div>
  );
}

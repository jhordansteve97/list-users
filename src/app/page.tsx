import { redirect } from "next/navigation";

export default function Home(): never {
  redirect('/userList/1');
}

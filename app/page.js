import TopicsList from "@/components/TopicsList";
import LoginForm from "@/components/LoginForm";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // if (session) redirect("/dashboard");

  return (
    <>
    {/* <TopicsList /> */}
    {
      session ? <TopicsList/> : <LoginForm />
    }
    <Sidebar/>
    </>
  )
}
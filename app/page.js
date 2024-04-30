import TopicsList from "@/components/TopicsList";
import LoginForm from "@/components/LoginForm";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import PurchaseList from "@/components/PurchaseList";
// import Purchase from "./purchase/page";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // if (session) redirect("/dashboard");

  return (
    <>
    {/* <TopicsList /> */}
    {
      session ? 
      <>
      <PurchaseList userEmail={session?.user?.email}/>
      <h1 className="font-bold text-2xl">Buyables</h1>
      <TopicsList user={session?.user?.name}/>
      </> 
      : <LoginForm />
    }
    <Sidebar/>
    </>
  )
}
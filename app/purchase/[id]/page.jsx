import EditTopicForm from "@/components/EditTopicForm";
import PurchaseConfirm from "@/components/PurchaseConfirm";
// import { useSession } from "next-auth/react";

// const getTopicById = async (id) => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch topic");
//     }

//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

export default async function Purchase({ params }) {
  const { id } = params;
//   const { topic } = await getTopicById(id);
//   const { title, description } = topic;

//   const { data: session } = useSession();

//   const userEmail = session?.user?.email;

  return (
  <>
  <PurchaseConfirm id={id}  />
  </>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PurchaseConfirm({ id}) {
    // const [purchasedItem, setPurchasedItem] = useState([]);

  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // const updatedPurchasedItem = [...purchasedItem, id]; // Add id to purchased array
        // setPurchasedItem(updatedPurchasedItem);
      
      const res = await fetch(`http://localhost:3000/api/purchase/${userEmail}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ purchased: id }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

    //   router.refresh();
    //   router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-3 h-full">
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <button className="bg-green-600 font-bold text-white py-3 px-6 rounded-lg">
        Confirm Purchase
      </button>
<br/>
      You will be redirected to our Payment Gateway
    </form>
  );
}
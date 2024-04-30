
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { title } from "process";
import { SiGoogledocs } from "react-icons/si";

const getPurchasedItems = async (userEmail) => {
  try {
    const res = await fetch(`https://notes-exchange.vercel.app/api/purchase/${userEmail}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    // console.log(res)
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const getTopics = async () => {
  try {
    const res = await fetch("https://notes-exchange.vercel.app/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function PurchaseList({ userEmail }) {
  const { purchasedIds } = await getPurchasedItems(userEmail);
  // console.log(purchasedIds)

  const { topics } = await getTopics();
  // console.log(topics)

  const filteredTopics = topics.filter((topic) => purchasedIds.includes(topic._id));
  return (
    <>
    {(purchasedIds.length === 0) ?"":<h1 className="font-bold text-2xl">Previous Purchases</h1>}
      {filteredTopics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex  gap-5 items-start rounded-lg"
        >
          <div className="icon-column">
            <SiGoogledocs size={100} />
          </div>

          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
            <div>Drive Link: {t.drivelink}</div>
            <div>Posted By <b>{t.userName}</b></div>
            {/* <button onClick={() => checkout(quantity, itemPrice, itemName)}>Buy</button> */}
            {/* <Link href={`/purchase/${t._id}`}>
              BUY
            </Link> */}
          </div>

         {/* { (user===t.userName)?<div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>:""} */}
        </div>
      ))}
    </>
  );
}
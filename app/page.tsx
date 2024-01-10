// "use client";

import nextAuth, { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { nextAuthOptions } from "./lib/next-auth/options";
import { Purchase, User } from "./types/types";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const { contents } = await getAllBooks();
  // console.log(contents);

  let purchaseBookIds: string[];

  // use session はサーバーサイドでしか使えないので、ここで使うことはできない
  const session = await getServerSession(nextAuthOptions);
  // as User は、session.userがnullの場合にエラーが出るのを防ぐためにつける
  // as は、型アサーションというもので、型を強制的に変換するもの
  const user = session?.user as User;
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" } // SSRでキャッシュを使わないようにする つけなくても、デフォルトでキャッシュを使わないようになっている
      // clintだと、useeffectは初回読み込みが遅くなる。
    );
    const purshasesData = await response.json();
    // console.log(purshasesData);
    // console.log(contents);

    purchaseBookIds = purshasesData.map((purchase: Purchase) => {
      return purchase.bookId;
    });
    // console.log(purchaseBookIds);
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchaseBookIds?.includes(book.id)}
          />
        ))}
      </main>
    </>
  );
}

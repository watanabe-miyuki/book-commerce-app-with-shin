import { getDetailBook } from "@/app/lib/microcms/client";
import Image from "next/image";
import React from "react";

// フォルダ名を[id]にすると、動的ルーティングになる
// そのため、paramsの中身は{ id: string }になる

const DetailBook = async ({ params }: { params: { id: string } }) => {
  const book = await getDetailBook(params.id); // SSR
  console.log("huga", book);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={book.thumbnail?.url}
          alt="book-image"
          className="w-full h-80 object-cover object-center"
          width={700}
          height={700}
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <div
            className="text-gray-700 mt-2"
            // microsmsから取得したデータを表示するために、dangerouslySetInnerHTMLを使う
            dangerouslySetInnerHTML={{ __html: book.content }}
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              公開日:{new Date(book.publishedAt as any).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              最終更新:{new Date(book.updatedAt as any).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;

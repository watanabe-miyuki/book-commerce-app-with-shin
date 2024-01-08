import exp from "constants";

type BookType = {
  id: number;
  title: string;
  contnt: string;
  price: number;
  thumbnail: { url: string };
  createdAt: string;
  updatedAt: string;
};

export type { BookType };

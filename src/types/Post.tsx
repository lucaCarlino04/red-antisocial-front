import type { Usuario } from "./Usuario";
import type { Tag } from "./Tag";

export type Post = {
  _id: string;
  description: string;
  user: Usuario;
  tags: Tag[];
  images: string[];
  fechaPublicacion: string;
  comments?: string[];
};

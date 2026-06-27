import type { Usuario } from "./Usuario";
import type { Post } from "./Post";

export type Comentario = {
  _id: string;
  text: string;
  user: Usuario;
  post: Post;
  fechaPublicacion: string;
};

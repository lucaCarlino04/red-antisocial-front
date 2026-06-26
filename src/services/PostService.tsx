import type {Post} from "../types/Post";
import { URL } from "../api";

const API_URL = `${URL}/publicaciones`;

export async function obtenerPosts(): Promise<Post[]> {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los posts");
  }

  const posts: Post[] = await respuesta.json();

  return posts;
}

export async function obtenerPostPorId(id: string): Promise<Post> {
  const respuesta = await fetch(`${API_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el post");
  }

  return await respuesta.json();
}
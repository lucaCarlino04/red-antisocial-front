import type {Usuario} from "../types/Usuario";

import { URL } from "../api";

const API_URL = `${URL}/usuarios`;

export async function obtenerUsuarios(): Promise<Usuario[]> {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los usuarios");
  }

  const productos: Usuario[] = await respuesta.json();

  return productos;
}

export async  function obtenerUsuarioPorNickName(nickName: string): Promise<Usuario> {
  const respuesta = await fetch(`${API_URL}/${nickName}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el usuario");
  }

  return await respuesta.json();
}

export async function crearUsuario(nickName: string): Promise<Usuario> {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({nickName})
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo crear el usuario")
  }

  return await respuesta.json()
}
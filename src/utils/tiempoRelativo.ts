export function tiempoRelativo(fecha: string) {
  const diff = Date.now() - new Date(fecha).getTime();
  const min = Math.floor(diff / 60000);
  const hs = Math.floor(min / 60);
  const dias = Math.floor(hs / 24);
  if (min < 60) return `${min} m`;
  if (hs < 24) return `${hs} h`;
  return `${dias} d`;
}

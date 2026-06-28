import { useInView } from "react-intersection-observer";

export default function ComponenteAnimado({
  children,
}: {
  children: React.ReactNode;
}) {
  // triggerOnce = la animacion se realiza una sola vez
  // threshold = Se realiza la animacion al llegar al 9% del componente hijo
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.09 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

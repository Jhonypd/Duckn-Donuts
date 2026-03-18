import type { Route } from "./+types/home";
import CatalogoPage from "../pages/catalogo/page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Duck'n Donuts" },
    { name: "description", content: "Bem-vindo ao Duck'n Donuts!" },
  ];
}

export default function Home() {
  return <CatalogoPage />;
}

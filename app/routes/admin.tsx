import type { Route } from "./+types/admin";
import AdminPage from "../pages/admin/page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Duck'n Donuts | Admin" },
    { name: "description", content: "Painel administrativo Duck'n Donuts." },
  ];
}

export default function Admin() {
  return <AdminPage />;
}

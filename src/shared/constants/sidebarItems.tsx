import {
  Warehouse,
  Package,
  Truck,
  Users,
  UserCog,
  LayoutDashboard,
} from "lucide-react";

export const sidebarItems = [
  {
    name: "Gösterge Paneli",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  { name: "Depolar", icon: <Warehouse size={20} />, path: "/warehouses" },
  { name: "Ürünler", icon: <Package size={20} />, path: "/products" },
  { name: "Sevkiyatlar", icon: <Truck size={20} />, path: "/shipments" },
  { name: "Müşteriler", icon: <Users size={20} />, path: "/customers" },
  { name: "Kullanıcılar", icon: <UserCog size={20} />, path: "/users" },
];

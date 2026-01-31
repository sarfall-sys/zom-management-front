import SidebarLayout from "./SidebarLayout";
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
  HiOutlineTemplate,
  HiUsers,

  
} from "react-icons/hi";

function AdminLayout() {
  const data = [
    { name: "Dashboard", icon: HiChartPie, to: "/admin/dashboard" },
    { name: "Products", icon: HiViewBoards, to: "/products" },
    { name: "Users", icon: HiUser, to: "/admin/users" },
    { name: "Brands", icon: HiArrowSmRight, to: "/brands" },
    { name: "Banners", icon: HiInbox, to: "/banners" },
    { name: "Families", icon: HiUser, to: "/families" },
    { name: "Subfamilies", icon: HiShoppingBag, to: "/subfamilies" },
    { name: "Categories", icon: HiUser, to: "/categories" },
    { name: "Subcategories", icon: HiShoppingBag, to: "/subcategories" },
  ];
  return (
    <div className="flex">
      <SidebarLayout routes={data} />
    </div>
  );
}

export default AdminLayout;

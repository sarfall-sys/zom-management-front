import SidebarLayout from "./SidebarLayout";
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiViewBoards,
  HiOutlineTemplate,
  HiUsers,

  
} from "react-icons/hi";

function UserLayout() {
  const data = [
    { name: "Dashboard", icon: HiChartPie, to: "/" },
    { name: "Products", icon: HiViewBoards, to: "/products" },
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

export default UserLayout;

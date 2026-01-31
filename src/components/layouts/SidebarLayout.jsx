import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import {

  HiOutlineTemplate,

  
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function SidebarLayout({routes}) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Sidebar
        aria-label="Sidebar with logo branding example"
        className={`${
          open ? "w-64 " : "w-18"
        }  h-screen relative duration-300 ease-in-out`}
      >
        <div
          className={`absolute cursor-pointer -right-4 top-3 w-9 h-9 p-0.5 border-border-light dark:border-border-dark border-2 rounded-full text-xl flex items-center justify-center ${
            !open && "rotate-180"
          } transition-all ease-in-out duration-300`}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <HiOutlineTemplate size={26} />
          ) : (
            <HiOutlineTemplate size={26} />
          )}
        </div>
        {routes.map((route, index) => (
          <SidebarItems key={index}>
            <SidebarItemGroup>
              <SidebarItem
                key={route.name}
                icon={route.icon}
                href={route.to}
                className={`${
                  !open && "justify-center"
                } origin-left duration-300 ease-in-out`}
              >
                {open && route.name}
              </SidebarItem>
              
            </SidebarItemGroup>
          </SidebarItems>
        ))}
      </Sidebar>
    </div>
  );
}

export default SidebarLayout;

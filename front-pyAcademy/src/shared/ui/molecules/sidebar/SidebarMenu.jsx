import { SidebarMenuItem } from "../../atoms/SidebarMenuItem";

export const SidebarMenu = ({ options, isSidebarOpen }) => {
  return (
    <div className="flex flex-col space-y-2 mt-[72px] px-2 border-t ">
      {options.map(({ title, to, Icon }) => (
        <SidebarMenuItem
          key={title}
          title={title}
          to={to}
          Icon={Icon}
          isSidebarOpen={isSidebarOpen}
        />
      ))}
    </div>
  );
};

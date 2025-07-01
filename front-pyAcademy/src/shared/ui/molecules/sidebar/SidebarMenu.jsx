import { SidebarMenuItem } from '../../atoms/SidebarMenuItem';

export function SidebarMenu({ options, isSidebarOpen }) {
  return (
    <div className=" space-y-2 mt-[72px] px-2 border-t">
      <div className="flex flex-col mt-5 gap-2">
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
    </div>
  );
}

import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavUser } from './Navuser';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Menu items.
const items = [
  {
    title: 'B.Tech Statistics',
    url: '/btech_statistics',
  },
  {
    title: 'M.Tech Statistics',
    url: '/mtech_statistics',
  },
];

export async function AppSidebar() {
  const session = await getServerSession(authOptions);
  const navuser_props: { name: string; email: string } = {
    name: session?.user?.email ?? '',
    email: session?.user?.email ?? '',
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-start gap-6">
          <div className="relative w-20 h-20 bg-white rounded-full">
            <Image
              src={'/images/IIIT_VADODARA_LOGO.png'}
              fill
              alt="institute_logo"
            ></Image>
          </div>
          <h1 className="text-white text-2xl font-semibold">IIIT V</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navuser_props} />
      </SidebarFooter>
    </Sidebar>
  );
}

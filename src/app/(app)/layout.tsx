"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Award,
  BookOpen,
  Calendar,
  ChevronDown,
  LayoutDashboard,
  Leaf,
  LifeBuoy,
  Menu,
  MessageSquare,
  Settings,
  Shield,
  Sprout,
  Star,
  Users,
  Video,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { FirebaseClientProvider, useUser, useAuth } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { Skeleton } from "@/components/ui/skeleton";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/matching", icon: Users, label: "Find Mentors" },
  { href: "/sessions", icon: Video, label: "Sessions" },
  { href: "/reminders", icon: Calendar, label: "Set Reminders"},
  { href: "/plan", icon: Sprout, label: "7-Day Plan" },
  { href: "/journal", icon: BookOpen, label: "Journal" },
  { href: "/group-study", icon: Users, label: "Group Study" },
  { href: "/workshops", icon: Award, label: "Workshops" },
  { href: "/rewards", icon: Star, label: "Rewards" },
  { href: "/mentor-dashboard", icon: Shield, label: "Mentor View" },
];

function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Button
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

function AppHeader() {
  const { toggleSidebar } = useSidebar();
  const { user, isUserLoading } = useUser();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
       <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      <div className="flex w-full items-center justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
               {isUserLoading ? (
                <Skeleton className="h-9 w-9 rounded-full" />
              ) : (
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.photoURL ?? "https://picsum.photos/seed/user-avatar/100/100"} alt="User" />
                <AvatarFallback>{user?.email?.[0]?.toUpperCase() ?? 'U'}</AvatarFallback>
              </Avatar>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{isUserLoading ? 'Loading...' : user?.isAnonymous ? 'Anonymous User' : (user?.displayName || 'Student User')}</p>
                <p className="text-xs leading-none text-muted-foreground">
                   {isUserLoading ? '' : user?.isAnonymous ? 'anonymous@example.com' : (user?.email || 'student@example.com')}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    const auth = useAuth();
    const { user, isUserLoading } = useUser();

    React.useEffect(() => {
        if (!isUserLoading && !user) {
            initiateAnonymousSignIn(auth);
        }
    }, [auth, user, isUserLoading]);
    
    return <>{children}</>;
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <FirebaseClientProvider>
        <AuthProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col w-full">
                <AppHeader />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
                    {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </FirebaseClientProvider>
    </div>
  );
}

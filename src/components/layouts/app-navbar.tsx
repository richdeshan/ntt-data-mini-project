import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { User } from "@/types/auth";

interface NavBarProps {
  user: User;
  onLogout: () => void;
}

export function NavBar({ user, onLogout }: NavBarProps) {
  const userInitials = `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b px-6 bg-white top-0 sticky z-99999">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <span className="text-sm font-semibold text-gray-500">Dashboard</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none hover:cursor-pointer">
          <Avatar className="h-9 w-9 border shadow-sm">
            <AvatarImage src={user.image} alt={user.firstName} />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-xs">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mt-4">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onLogout}
            className="text-destructive focus:text-destructive focus:bg-red-50 hover:cursor-pointer flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
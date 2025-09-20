import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  const location = useLocation();
  
  const getPageTitle = (pathname: string) => {
    const routes: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/generate-plan': 'Generate Plan',
      '/plan-history': 'Plan History',
      '/data-management': 'Data Management',
      '/analytics': 'Analytics'
    };
    return routes[pathname] || 'Dashboard';
  };
  const currentDateTime = new Date().toLocaleString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="text-foreground hover:bg-accent" />
        <h1 className="text-xl font-semibold text-foreground">{getPageTitle(location.pathname)}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search orders or rakes..."
            className="pl-10 w-64 bg-background border-border"
          />
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="h-5 w-5 text-foreground" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>
        </div>
        
        {/* Date/Time */}
        <div className="text-sm text-muted-foreground">
          {currentDateTime}
        </div>
      </div>
    </header>
  );
};
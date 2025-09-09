import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const Header = ({ isAuthenticated = false, user }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout logic will be implemented with Supabase
    navigate("/login");
  };

  return (
    <header className="bg-card border-b border-border shadow-card-shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-court-gradient rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">MC</span>
          </div>
          <h1 className="text-2xl font-bold bg-court-gradient bg-clip-text text-transparent">
            MyCourts
          </h1>
        </Link>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="hover:bg-secondary">
                  Dashboard
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 bg-card border-border" 
                  align="end" 
                  forceMount
                >
                  <DropdownMenuItem className="flex cursor-pointer" asChild>
                    <Link to="/perfil">
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex cursor-pointer" asChild>
                    <Link to="/perfil">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex cursor-pointer text-destructive focus:text-destructive" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-secondary">
                  Entrar
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button className="bg-court-gradient hover:shadow-hover-glow transition-all duration-300">
                  Cadastrar
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
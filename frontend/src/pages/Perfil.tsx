import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Camera, MapPin, Clock, Users } from "lucide-react";

interface MockUser {
  name: string;
  email: string;
  avatar?: string; // opcional
}

interface UserScheduledCourts {
  id: number;
  courtName: string;
  address: string;
  time: string; // não tenho certeza total se isso vai funcionar
  date: string;
  participants: number;
}

export default function Perfil() {
  const [name, setName] = useState<string>("Mota");
  const [email, setEmail] = useState<string>("mota@email.com");
  const [phone, setPhone] = useState<string>("(11) 99999-9999");

  // Mock user data
  const mockUser: MockUser = {
    name: "Mota",
    email: "mota@email.com",
    avatar: undefined,
  };

  // Mock user's scheduled courts
  const userScheduledCourts: UserScheduledCourts[] = [
    {
      id: 1,
      courtName: "Quadra Street Ball",
      address: "Rua das Palmeiras, 123 - Centro",
      time: "19:00",
      date: "2024-03-15",
      participants: 6,
    },
    {
      id: 2,
      courtName: "Quadra Elite Sports",
      address: "Av. dos Esportes, 456 - Vila Nova",
      time: "18:00",
      date: "2024-03-16",
      participants: 7,
    },
  ];

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Profile update logic will be implemented with Supabase
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} user={mockUser} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="shadow-card-shadow border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl">Meu Perfil</CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais e preferências
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {mockUser.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-court-gradient hover:shadow-hover-glow"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{mockUser.name}</h2>
                  <p className="text-muted-foreground">{mockUser.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">Jogador Ativo</Badge>
                    <Badge variant="outline">2 jogos agendados</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Personal Information */}
            <Card className="shadow-card-shadow border-border bg-card">
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Atualize seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-input border-border focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-input border-border focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-input border-border focus:ring-ring"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-court-gradient hover:shadow-hover-glow transition-all duration-300"
                  >
                    Atualizar Perfil
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Scheduled Games */}
            <Card className="shadow-card-shadow border-border bg-card">
              <CardHeader>
                <CardTitle>Jogos Agendados</CardTitle>
                <CardDescription>
                  Suas próximas partidas confirmadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userScheduledCourts.map((court, index) => (
                    <div key={court.id}>
                      <div className="space-y-2">
                        <h3 className="font-medium">{court.courtName}</h3>
                        <div className="flex items-center text-sm text-muted-foreground space-x-3">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="truncate">{court.address}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                              <span>
                                {court.time} - {court.date}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Users className="w-3 h-3 mr-1 text-muted-foreground" />
                              <span>{court.participants} jogadores</span>
                            </div>
                          </div>
                          <Badge variant="secondary">Confirmado</Badge>
                        </div>
                      </div>
                      {index < userScheduledCourts.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

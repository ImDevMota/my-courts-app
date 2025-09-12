import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, CheckCircle } from "lucide-react";
import axios from "axios";

export default function Dashboard() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os dados do back-end
  useEffect(() => {
    async function fetchCourts() {
      try {
        const response = await axios.get("http://localhost:3000/dashboard");
        setCourts(response.data); // Atualiza o estado com os dados do back-end
      } catch (err) {
        setError("Erro ao carregar as quadras. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourts();
  }, []);

  // Ver como trazer e usar os dados do usuário logado
  const handleJoinCourt = async (courtId, timeSlot) => {
    try {
      await axios.post("http://localhost:3000/confirmacao", {
        courtId,
        timeSlot,
        userId: mockUser.email, // ou id do usuário real
      });

      setCourts((prevCourts) =>
        prevCourts.map((court) =>
          court.id === courtId
            ? {
                ...court,
                schedules: court.schedules.map((schedule) =>
                  schedule.time === timeSlot
                    ? {
                        ...schedule,
                        participants: schedule.userJoined
                          ? schedule.participants - 1
                          : schedule.participants + 1,
                        userJoined: !schedule.userJoined,
                      }
                    : schedule
                ),
              }
            : court
        )
      );
    } catch (error) {
      console.error("Erro ao confirmar presença:", error);
      alert("Não foi possível confirmar presença. Tente novamente.");
    }
  };

  // Mock user data
  const mockUser = {
    name: "Mota",
    email: "mota@mail.com",
    avatar: undefined,
  };

  // if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} user={mockUser} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Encontre e confirme sua presença nas melhores quadras de basquete da
            cidade
          </p>
        </div>

        <div className="grid gap-6">
          {courts.map((court) => (
            <Card
              key={court.id}
              className="shadow-card-shadow border-border bg-card overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-48 md:h-auto">
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl">{court.name}</CardTitle>
                    <CardDescription className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {court.address}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="space-y-3">
                      {court.schedules.map((schedule) => (
                        <div
                          key={schedule.time}
                          className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">
                                {schedule.time}
                              </span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">
                                {schedule.participants}/
                                {schedule.maxParticipants}
                              </span>
                            </div>

                            <Badge
                              variant={
                                schedule.participants >=
                                schedule.maxParticipants
                                  ? "destructive"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {schedule.participants >= schedule.maxParticipants
                                ? "Lotado"
                                : "Disponível"}
                            </Badge>
                          </div>

                          <Button
                            onClick={() =>
                              handleJoinCourt(court.id, schedule.time)
                            }
                            disabled={
                              schedule.participants >=
                                schedule.maxParticipants && !schedule.userJoined
                            }
                            variant={
                              schedule.userJoined ? "secondary" : "default"
                            }
                            className={
                              schedule.userJoined
                                ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                : "bg-court-gradient hover:shadow-hover-glow transition-all duration-300"
                            }
                          >
                            {schedule.userJoined ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Confirmado
                              </>
                            ) : (
                              "Marcar Presença"
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

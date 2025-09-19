import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/Header";
import { MapPin, Users, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import court1 from "@/assets/court-1.jpg";

const Index = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Encontre a{" "}
              <span className="bg-court-gradient bg-clip-text text-transparent">
                quadra perfeita
              </span>{" "}
              para seu jogo
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Conecte-se com outros jogadores, reserve horários e confirme sua
              presença nas melhores quadras de basquete da cidade.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cadastro">
              <Button
                size="lg"
                className="bg-court-gradient hover:shadow-hover-glow transition-all duration-300 text-lg px-8 py-3"
              >
                Começar Agora
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-secondary text-lg px-8 py-3"
              >
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Por que escolher a MyCourts?
            </h2>
            <p className="text-muted-foreground text-lg">
              A plataforma completa para organizar seus jogos de basquete
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card-shadow border-border bg-card text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-court-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Encontre Quadras</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Descubra as melhores quadras da sua região com informações
                  detalhadas sobre localização e horários disponíveis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card-shadow border-border bg-card text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-court-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Conecte-se</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Veja quantos jogadores já confirmaram presença e garanta que
                  terá um jogo animado com o time completo.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card-shadow border-border bg-card text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-court-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Organize Horários</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Confirme sua presença com um clique e mantenha seus jogos
                  organizados em um só lugar.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Veja como funciona</h2>
            <p className="text-muted-foreground text-lg">
              Interface simples e intuitiva para uma experiência perfeita
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={court1}
                alt="Preview da quadra"
                className="rounded-lg shadow-card-shadow w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-court-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold text-sm">
                    1
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Escolha sua quadra</h3>
                  <p className="text-muted-foreground">
                    Navegue pelas quadras disponíveis e veja todas as
                    informações importantes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-court-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold text-sm">
                    2
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Confirme sua presença</h3>
                  <p className="text-muted-foreground">
                    Selecione o horário e confirme sua participação com um
                    simples clique.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-court-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold text-sm">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Jogue e se divirta!</h3>
                  <p className="text-muted-foreground">
                    Apareça na quadra na hora marcada e desfrute do seu jogo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar a jogar?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Junte-se à comunidade MyCourts e nunca mais perca um jogo por falta
            de jogadores.
          </p>
          <Link to="/cadastro">
            <Button
              size="lg"
              className="bg-court-gradient hover:shadow-hover-glow transition-all duration-300 text-lg px-8 py-3"
            >
              Cadastrar Gratuitamente
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;

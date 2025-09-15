import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BarChart3, Settings, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Sistema de Análise de Confiabilidade
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plataforma avançada para análise de confiabilidade de equipamentos industriais com recursos de timeline, Pareto, GRP, MTTR, LDA e LRU.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="backdrop-blur-glass bg-card/80 border-white/10 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Recursos Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4">
                  <BarChart3 className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Análises Estatísticas</h3>
                  <p className="text-sm text-muted-foreground">
                    Gráficos Pareto, análise Weibull e cálculos de confiabilidade
                  </p>
                </div>
                <div className="text-center p-4">
                  <Settings className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">GRP & MTTR</h3>
                  <p className="text-sm text-muted-foreground">
                    Growth Reliability Program e Mean Time To Repair
                  </p>
                </div>
                <div className="text-center p-4">
                  <TrendingUp className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Timeline & LRU</h3>
                  <p className="text-sm text-muted-foreground">
                    Timeline de eventos e análise de unidades substituíveis
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Link to="/reliability-analysis">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity font-semibold px-8 py-4">
                    Iniciar Análise de Confiabilidade
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;

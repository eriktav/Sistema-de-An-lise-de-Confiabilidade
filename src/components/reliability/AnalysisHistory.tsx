import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnalysisResult } from '@/types/reliability';
import { History, Calendar, Building, Tag, ChevronRight } from 'lucide-react';

interface AnalysisHistoryProps {
  analyses: AnalysisResult[];
  onViewResult: (analysisId: string) => void;
}

export function AnalysisHistory({ analyses, onViewResult }: AnalysisHistoryProps) {
  if (analyses.length === 0) {
    return null;
  }

  return (
    <Card className="w-full backdrop-blur-glass bg-card/80 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Análises Anteriores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="flex items-center justify-between p-4 rounded-lg bg-background/30 border border-white/10 hover:bg-background/40 transition-colors"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{analysis.createdAt.toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{analysis.formData.localPrincipal}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{analysis.formData.tagPI}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={analysis.status === 'completed' ? 'default' : 'secondary'}
                    className={analysis.status === 'completed' ? 'bg-success text-white' : ''}
                  >
                    {analysis.status === 'completed' ? 'Concluída' : 'Processando'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {analysis.formData.dataInicial} - {analysis.formData.dataFinal}
                  </span>
                </div>
              </div>
              
              {analysis.status === 'completed' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewResult(analysis.id)}
                  className="ml-4 hover:bg-primary/20"
                >
                  Ver Resultados
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
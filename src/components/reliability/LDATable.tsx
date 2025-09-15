import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LDAData } from '@/types/reliability';
import { BarChart3 } from 'lucide-react';

interface LDATableProps {
  data: LDAData[];
}

export function LDATable({ data }: LDATableProps) {
  const getBetaInterpretation = (beta: number) => {
    if (beta < 1) return { text: 'Mortalidade Infantil', color: 'bg-warning text-black' };
    if (beta === 1) return { text: 'Taxa Constante', color: 'bg-info text-white' };
    if (beta > 1 && beta < 3) return { text: 'Desgaste Precoce', color: 'bg-destructive text-white' };
    return { text: 'Desgaste', color: 'bg-muted' };
  };

  return (
    <Card className="backdrop-blur-glass bg-card/80 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          LDA - Life Data Analysis (Weibull)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead>Componente</TableHead>
                <TableHead>β (Beta)</TableHead>
                <TableHead>η (Eta)</TableHead>
                <TableHead>Confiabilidade 90%</TableHead>
                <TableHead>Interpretação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => {
                const interpretation = getBetaInterpretation(item.weibullBeta);
                return (
                  <TableRow key={index} className="border-white/10">
                    <TableCell className="font-medium">{item.component}</TableCell>
                    <TableCell className="font-mono">{item.weibullBeta.toFixed(2)}</TableCell>
                    <TableCell className="font-mono">{item.weibullEta.toFixed(0)}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">
                        {item.reliability90.toFixed(0)} horas
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={interpretation.color}>
                        {interpretation.text}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { GRPData } from '@/types/reliability';
import { Settings } from 'lucide-react';

interface GRPTableProps {
  data: GRPData[];
}

export function GRPTable({ data }: GRPTableProps) {
  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 90) return 'bg-success text-white';
    if (reliability >= 75) return 'bg-warning text-black';
    return 'bg-destructive text-white';
  };

  return (
    <Card className="backdrop-blur-glass bg-card/80 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          GRP - Growth Reliability Program
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead>Componente</TableHead>
                <TableHead>MTBF (horas)</TableHead>
                <TableHead>Confiabilidade (%)</TableHead>
                <TableHead>Nível de Confiança</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index} className="border-white/10">
                  <TableCell className="font-medium">{item.component}</TableCell>
                  <TableCell>{item.mtbf.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge className={getReliabilityColor(item.reliability)}>
                      {item.reliability.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell>{item.confidence}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
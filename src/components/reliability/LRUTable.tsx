import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LRUData } from '@/types/reliability';
import { Package } from 'lucide-react';

interface LRUTableProps {
  data: LRUData[];
}

export function LRUTable({ data }: LRUTableProps) {
  const getPriorityColor = (priority: LRUData['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-white';
      case 'medium':
        return 'bg-warning text-black';
      case 'low':
        return 'bg-success text-white';
      default:
        return 'bg-muted';
    }
  };

  const getPriorityText = (priority: LRUData['priority']) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return priority;
    }
  };

  return (
    <Card className="backdrop-blur-glass bg-card/80 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          LRU - Lowest Replaceable Unit
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead>LRU</TableHead>
                <TableHead>MTBF (horas)</TableHead>
                <TableHead>Custo Reposição</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Índice Criticidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => {
                const criticalityIndex = (item.replacementCost / item.mtbf * 1000).toFixed(2);
                return (
                  <TableRow key={index} className="border-white/10">
                    <TableCell className="font-medium">{item.lru}</TableCell>
                    <TableCell>{item.mtbf.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>
                      <span className="font-semibold">
                        R$ {item.replacementCost.toLocaleString('pt-BR')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(item.priority)}>
                        {getPriorityText(item.priority)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-primary">
                      {criticalityIndex}
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
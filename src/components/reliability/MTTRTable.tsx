import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { MTTRData } from '@/types/reliability';
import { Clock } from 'lucide-react';

interface MTTRTableProps {
  data: MTTRData[];
}

export function MTTRTable({ data }: MTTRTableProps) {
  const maxTime = Math.max(...data.map(item => item.maxTime));

  return (
    <Card className="backdrop-blur-glass bg-card/80 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          MTTR - Mean Time To Repair
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead>Tipo de Equipamento</TableHead>
                <TableHead>Tempo Médio (h)</TableHead>
                <TableHead>Tempo Mín (h)</TableHead>
                <TableHead>Tempo Máx (h)</TableHead>
                <TableHead>Amostras</TableHead>
                <TableHead>Distribuição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index} className="border-white/10">
                  <TableCell className="font-medium">{item.equipmentType}</TableCell>
                  <TableCell className="font-semibold text-primary">
                    {item.avgRepairTime.toFixed(1)}
                  </TableCell>
                  <TableCell>{item.minTime.toFixed(1)}</TableCell>
                  <TableCell>{item.maxTime.toFixed(1)}</TableCell>
                  <TableCell>{item.samples}</TableCell>
                  <TableCell>
                    <div className="w-20">
                      <Progress 
                        value={(item.avgRepairTime / maxTime) * 100} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
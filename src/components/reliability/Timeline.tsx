import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TimelineEvent } from '@/types/reliability';
import { Calendar, AlertTriangle, Wrench, Search } from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'maintenance':
        return <Wrench className="h-4 w-4" />;
      case 'failure':
        return <AlertTriangle className="h-4 w-4" />;
      case 'inspection':
        return <Search className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'maintenance':
        return 'bg-info text-white';
      case 'failure':
        return 'bg-destructive text-white';
      case 'inspection':
        return 'bg-success text-white';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Card className="backdrop-blur-glass bg-card/80 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Timeline de Eventos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="relative flex items-start gap-4">
                <div className={`relative z-10 rounded-full p-2 ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                    <Badge variant="secondary" className="capitalize">
                      {event.type}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                  {event.duration && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Duração: {event.duration}h
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
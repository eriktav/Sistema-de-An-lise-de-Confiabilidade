import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { AnalysisFormData } from '@/types/reliability';

interface ReliabilityFormProps {
  onSubmit: (data: AnalysisFormData) => void;
  isLoading: boolean;
}

export function ReliabilityForm({ onSubmit, isLoading }: ReliabilityFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AnalysisFormData>();

  const startDate = watch('startDate');

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-glass bg-card/80 border border-white/10 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Análise de Confiabilidade de Equipamentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="installation">Instalação *</Label>
            <Input
              id="installation"
              {...register('installation', { required: 'Instalação é obrigatória' })}
              className="bg-background/50 border-white/20 focus:border-primary"
              placeholder="Ex: Refinaria Norte"
            />
            {errors.installation && (
              <p className="text-sm text-destructive">{errors.installation.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="equipmentTag">Tag do Equipamento *</Label>
            <Input
              id="equipmentTag"
              {...register('equipmentTag', { required: 'Tag do equipamento é obrigatória' })}
              className="bg-background/50 border-white/20 focus:border-primary"
              placeholder="Ex: P-101A"
            />
            {errors.equipmentTag && (
              <p className="text-sm text-destructive">{errors.equipmentTag.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início *</Label>
              <Input
                id="startDate"
                type="date"
                {...register('startDate', { required: 'Data de início é obrigatória' })}
                className="bg-background/50 border-white/20 focus:border-primary"
              />
              {errors.startDate && (
                <p className="text-sm text-destructive">{errors.startDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Fim *</Label>
              <Input
                id="endDate"
                type="date"
                {...register('endDate', {
                  required: 'Data de fim é obrigatória',
                  validate: (value) =>
                    !startDate || value > startDate || 'Data de fim deve ser posterior à data de início',
                })}
                className="bg-background/50 border-white/20 focus:border-primary"
              />
              {errors.endDate && (
                <p className="text-sm text-destructive">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity font-semibold py-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando Análise...
              </>
            ) : (
              'Analisar Confiabilidade'
            )}
          </Button>

          {isLoading && (
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                Receba os resultados em até 2 dias
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
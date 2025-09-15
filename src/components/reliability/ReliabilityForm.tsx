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

  const dataInicial = watch('dataInicial');

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
            <Label htmlFor="localPrincipal">Local Principal *</Label>
            <Input
              id="localPrincipal"
              {...register('localPrincipal', { required: 'Local Principal é obrigatório' })}
              className="bg-background/50 border-white/20 focus:border-primary"
              placeholder="Ex: Refinaria Norte"
            />
            {errors.localPrincipal && (
              <p className="text-sm text-destructive">{errors.localPrincipal.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagPI">TAG PI *</Label>
            <Input
              id="tagPI"
              {...register('tagPI', { required: 'TAG PI é obrigatória' })}
              className="bg-background/50 border-white/20 focus:border-primary"
              placeholder="Ex: P-101A"
            />
            {errors.tagPI && (
              <p className="text-sm text-destructive">{errors.tagPI.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataInicial">Data Inicial (dd/mm/aaaa) *</Label>
              <Input
                id="dataInicial"
                type="date"
                {...register('dataInicial', { required: 'Data inicial é obrigatória' })}
                className="bg-background/50 border-white/20 focus:border-primary"
              />
              {errors.dataInicial && (
                <p className="text-sm text-destructive">{errors.dataInicial.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataFinal">Data Final (dd/mm/aaaa) *</Label>
              <Input
                id="dataFinal"
                type="date"
                {...register('dataFinal', {
                  required: 'Data final é obrigatória',
                  validate: (value) =>
                    !watch('dataInicial') || value > watch('dataInicial') || 'Data final deve ser posterior à data inicial',
                })}
                className="bg-background/50 border-white/20 focus:border-primary"
              />
              {errors.dataFinal && (
                <p className="text-sm text-destructive">{errors.dataFinal.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="centroPlanejamento">Centro de Planejamento *</Label>
            <Input
              id="centroPlanejamento"
              {...register('centroPlanejamento', { required: 'Centro de Planejamento é obrigatório' })}
              className="bg-background/50 border-white/20 focus:border-primary"
              placeholder="Ex: CP-001"
            />
            {errors.centroPlanejamento && (
              <p className="text-sm text-destructive">{errors.centroPlanejamento.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sinal">Sinal *</Label>
              <select
                id="sinal"
                {...register('sinal', { required: 'Sinal é obrigatório' })}
                className="flex h-10 w-full rounded-md border border-input bg-background/50 border-white/20 focus:border-primary px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Selecione o sinal</option>
                <option value="<">{'<'}</option>
                <option value=">">{'>'}</option>
                <option value="=">=</option>
              </select>
              {errors.sinal && (
                <p className="text-sm text-destructive">{errors.sinal.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="referencia">Referência *</Label>
              <Input
                id="referencia"
                {...register('referencia', { required: 'Referência é obrigatória' })}
                className="bg-background/50 border-white/20 focus:border-primary"
                placeholder="Ex: REF-001"
              />
              {errors.referencia && (
                <p className="text-sm text-destructive">{errors.referencia.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="horimetroRef">Horímetro de Ref. *</Label>
            <Input
              id="horimetroRef"
              {...register('horimetroRef', { required: 'Horímetro de Ref. é obrigatório' })}
              className="bg-background/50 border-white/20 focus:border-primary"
              placeholder="Ex: 1234.5"
            />
            {errors.horimetroRef && (
              <p className="text-sm text-destructive">{errors.horimetroRef.message}</p>
            )}
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
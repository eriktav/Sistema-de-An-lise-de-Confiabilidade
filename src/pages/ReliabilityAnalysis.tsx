import { useState } from 'react';
import { AnalysisFormData, AnalysisResult } from '@/types/reliability';
import { ReliabilityForm } from '@/components/reliability/ReliabilityForm';
import { Timeline } from '@/components/reliability/Timeline';
import { ParetoChart } from '@/components/reliability/ParetoChart';
import { GRPTable } from '@/components/reliability/GRPTable';
import { MTTRTable } from '@/components/reliability/MTTRTable';
import { LDATable } from '@/components/reliability/LDATable';
import { LRUTable } from '@/components/reliability/LRUTable';
import { AnalysisHistory } from '@/components/reliability/AnalysisHistory';
import { generateMockAnalysis } from '@/utils/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';

export default function ReliabilityAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);
  const [showProcessing, setShowProcessing] = useState(false);

  const handleFormSubmit = async (data: AnalysisFormData) => {
    setIsLoading(true);
    setShowProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      const analysisId = Date.now().toString();
      const newAnalysis = generateMockAnalysis(analysisId, data);
      
      setCurrentAnalysis(newAnalysis);
      setAnalysisHistory(prev => [newAnalysis, ...prev]);
      setIsLoading(false);
      setShowProcessing(false);
    }, 3000);
  };

  const handleViewResult = (analysisId: string) => {
    const analysis = analysisHistory.find(a => a.id === analysisId);
    if (analysis) {
      setCurrentAnalysis(analysis);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <ReliabilityForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        
        {showProcessing && (
          <Card className="w-full max-w-2xl mx-auto backdrop-blur-glass bg-card/80 border-white/10">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <Clock className="h-12 w-12 mx-auto text-primary animate-pulse" />
                <div>
                  <h3 className="text-lg font-semibold">Processando análise...</h3>
                  <p className="text-muted-foreground">Receba os resultados em até 2 dias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentAnalysis && !showProcessing && (
          <div className="space-y-6">
            <Card className="w-full max-w-2xl mx-auto backdrop-blur-glass bg-card/80 border-white/10">
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center space-y-4">
                  <CheckCircle className="h-12 w-12 mx-auto text-success" />
                  <div>
                    <h3 className="text-lg font-semibold">Análise Concluída</h3>
                    <p className="text-muted-foreground">
                      {currentAnalysis.formData.installation} - {currentAnalysis.formData.equipmentTag}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="lg:col-span-2 xl:col-span-1">
                <Timeline events={currentAnalysis.timeline || []} />
              </div>
              
              <div className="lg:col-span-2">
                <ParetoChart data={currentAnalysis.paretoData || []} />
              </div>

              <div className="lg:col-span-2 xl:col-span-3">
                <GRPTable data={currentAnalysis.grpData || []} />
              </div>

              <div className="lg:col-span-2 xl:col-span-3">
                <MTTRTable data={currentAnalysis.mttrData || []} />
              </div>

              <div className="lg:col-span-1 xl:col-span-2">
                <LDATable data={currentAnalysis.ldaData || []} />
              </div>

              <div className="lg:col-span-1">
                <LRUTable data={currentAnalysis.lruData || []} />
              </div>
            </div>
          </div>
        )}

        <AnalysisHistory 
          analyses={analysisHistory} 
          onViewResult={handleViewResult} 
        />
      </div>
    </div>
  );
}
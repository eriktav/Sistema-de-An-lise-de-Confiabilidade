import { AnalysisResult, TimelineEvent, ParetoData, GRPData, MTTRData, LDAData, LRUData } from '@/types/reliability';

export function generateMockAnalysis(id: string, formData: any): AnalysisResult {
  return {
    id,
    formData,
    createdAt: new Date(),
    status: 'completed',
    timeline: getMockTimelineData(),
    paretoData: getMockParetoData(),
    grpData: getMockGRPData(),
    mttrData: getMockMTTRData(),
    ldaData: getMockLDAData(),
    lruData: getMockLRUData(),
  };
}

export function getMockTimelineData(): TimelineEvent[] {
  return [
    {
      date: '2024-01-15',
      type: 'maintenance',
      description: 'Manutenção preventiva programada - Troca de filtros e lubrificação',
      duration: 4,
    },
    {
      date: '2024-02-03',
      type: 'failure',
      description: 'Falha no motor elétrico - Sobrecarga detectada',
      duration: 12,
    },
    {
      date: '2024-02-28',
      type: 'inspection',
      description: 'Inspeção de rotina - Verificação de vibrações',
    },
    {
      date: '2024-03-15',
      type: 'maintenance',
      description: 'Substituição de rolamentos danificados',
      duration: 8,
    },
    {
      date: '2024-04-02',
      type: 'failure',
      description: 'Vazamento no sistema hidráulico',
      duration: 6,
    },
    {
      date: '2024-04-20',
      type: 'inspection',
      description: 'Análise termográfica preventiva',
    },
  ];
}

export function getMockParetoData(): ParetoData[] {
  const data = [
    { tag: 'P-101A', failures: 15 },
    { tag: 'C-201B', failures: 12 },
    { tag: 'V-301C', failures: 8 },
    { tag: 'H-401D', failures: 6 },
    { tag: 'T-501E', failures: 4 },
    { tag: 'R-601F', failures: 3 },
    { tag: 'E-701G', failures: 2 },
    { tag: 'D-801H', failures: 1 },
  ];

  const totalFailures = data.reduce((sum, item) => sum + item.failures, 0);
  let cumulative = 0;

  return data.map(item => {
    const percentage = (item.failures / totalFailures) * 100;
    cumulative += percentage;
    return {
      ...item,
      percentage,
      cumulativePercentage: cumulative,
    };
  });
}

export function getMockGRPData(): GRPData[] {
  return [
    {
      component: 'Motor Elétrico Principal',
      mtbf: 8760,
      reliability: 92.5,
      confidence: '90%',
    },
    {
      component: 'Sistema Hidráulico',
      mtbf: 4380,
      reliability: 87.3,
      confidence: '85%',
    },
    {
      component: 'Rolamentos',
      mtbf: 12000,
      reliability: 95.1,
      confidence: '95%',
    },
    {
      component: 'Sensores de Temperatura',
      mtbf: 2190,
      reliability: 78.9,
      confidence: '80%',
    },
    {
      component: 'Válvulas de Controle',
      mtbf: 6570,
      reliability: 89.7,
      confidence: '88%',
    },
  ];
}

export function getMockMTTRData(): MTTRData[] {
  return [
    {
      equipmentType: 'Bombas Centrífugas',
      avgRepairTime: 6.2,
      minTime: 2.5,
      maxTime: 14.0,
      samples: 45,
    },
    {
      equipmentType: 'Compressores',
      avgRepairTime: 18.7,
      minTime: 8.0,
      maxTime: 48.5,
      samples: 23,
    },
    {
      equipmentType: 'Válvulas',
      avgRepairTime: 3.1,
      minTime: 1.0,
      maxTime: 8.5,
      samples: 67,
    },
    {
      equipmentType: 'Motores Elétricos',
      avgRepairTime: 12.4,
      minTime: 4.5,
      maxTime: 32.0,
      samples: 34,
    },
    {
      equipmentType: 'Instrumentação',
      avgRepairTime: 2.8,
      minTime: 0.5,
      maxTime: 6.2,
      samples: 89,
    },
  ];
}

export function getMockLDAData(): LDAData[] {
  return [
    {
      component: 'Rolamentos SKF',
      weibullBeta: 2.1,
      weibullEta: 9500,
      reliability90: 6800,
    },
    {
      component: 'Motor WEG 50cv',
      weibullBeta: 1.8,
      weibullEta: 12000,
      reliability90: 8500,
    },
    {
      component: 'Selo Mecânico',
      weibullBeta: 0.9,
      weibullEta: 4200,
      reliability90: 4200,
    },
    {
      component: 'Acoplamento',
      weibullBeta: 3.2,
      weibullEta: 15000,
      reliability90: 11200,
    },
    {
      component: 'Sensor PT100',
      weibullBeta: 1.0,
      weibullEta: 8760,
      reliability90: 8760,
    },
  ];
}

export function getMockLRUData(): LRUData[] {
  return [
    {
      lru: 'Motor Elétrico 50CV',
      mtbf: 8760,
      replacementCost: 25000,
      priority: 'high',
    },
    {
      lru: 'Bomba Centrífuga',
      mtbf: 4380,
      replacementCost: 15000,
      priority: 'high',
    },
    {
      lru: 'Variador de Frequência',
      mtbf: 6570,
      replacementCost: 8500,
      priority: 'medium',
    },
    {
      lru: 'Sensor de Pressão',
      mtbf: 2190,
      replacementCost: 1200,
      priority: 'low',
    },
    {
      lru: 'Válvula Reguladora',
      mtbf: 5250,
      replacementCost: 3500,
      priority: 'medium',
    },
  ];
}
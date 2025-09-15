export interface AnalysisFormData {
  localPrincipal: string;
  tagPI: string;
  dataInicial: string;
  dataFinal: string;
  centroPlanejamento: string;
  sinal: '<' | '>' | '=';
  referencia: string;
  horimetroRef: string;
}

export interface AnalysisResult {
  id: string;
  formData: AnalysisFormData;
  createdAt: Date;
  status: 'completed' | 'processing';
  timeline?: TimelineEvent[];
  paretoData?: ParetoData[];
  grpData?: GRPData[];
  mttrData?: MTTRData[];
  ldaData?: LDAData[];
  lruData?: LRUData[];
}

export interface TimelineEvent {
  date: string;
  type: 'maintenance' | 'failure' | 'inspection';
  description: string;
  duration?: number;
}

export interface ParetoData {
  tag: string;
  failures: number;
  percentage: number;
  cumulativePercentage: number;
}

export interface GRPData {
  component: string;
  mtbf: number;
  reliability: number;
  confidence: string;
}

export interface MTTRData {
  equipmentType: string;
  avgRepairTime: number;
  minTime: number;
  maxTime: number;
  samples: number;
}

export interface LDAData {
  component: string;
  weibullBeta: number;
  weibullEta: number;
  reliability90: number;
}

export interface LRUData {
  lru: string;
  mtbf: number;
  replacementCost: number;
  priority: 'high' | 'medium' | 'low';
}
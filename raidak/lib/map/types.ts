export interface District {
  id: string;
  name_ar: string;
  base_price_sqm: number;
  demand_index: number;
  roi_annual_percent: number;
  sustainability_baseline: number;
}

export type EstedamaTier = 'high' | 'medium' | 'blank';

export type ActiveFilter = 'all' | 'high' | 'medium' | 'future';

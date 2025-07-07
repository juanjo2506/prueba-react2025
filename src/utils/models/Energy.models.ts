
export interface Energy {
  line: string;
  date: string;
  comercial: string;
  industrial: string;
  residential: string;
  [key: string]: string; 
}


export interface LineData {
  color: string;
  values: Array<{ date: Date; value: number }>;
}


export interface LossPercentage {
  line: string;
  date: string;
  residential: number;
  comercial: number;
  industrial: number;
}


export interface UnifiedDataRow {
  line: string;
  date: string;
  consume_residential: number;
  consume_comercial: number;
  consume_industrial: number;
  cost_residential: number;
  cost_comercial: number;
  cost_industrial: number;
  loss_residential_percent: number;
  loss_comercial_percent: number;
  loss_industrial_percent: number;
}

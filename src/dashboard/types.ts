export type PondId = 'pond-a' | 'pond-b' | 'pond-c' | 'pond-d';

export interface PondInfo {
  id: PondId;
  name: string;
  status: 'excellent' | 'warning' | 'critical';
  overallScore: number;
  shrimpType: string;
  shrimpAgeDays: number;
  estimatedCount: number;
  density: number;
  estimatedSurvival: number;
  temperature: number;
  dissolvedOxygen: number;
  pH: number;
  salinity: number;
  orp: number;
  ec: number;
  nh3n: number;
}

export interface WeatherData {
  temp: number;
  windDirection: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  rainAccumulated: number;
  statusStr: string;
}

export interface MarketTicker {
  id: string;
  name: string;
  code: string;
  price: number;
  change: number;
  volume24h: number;
  highest: number;
  lowest: number;
  yesterdayBase: number;
  openGuide: number;
  details: string;
  history24h: number[];
}

export interface EquipmentState {
  aerator1: 'on' | 'off';
  aerator2: 'on' | 'off';
  aerator3: 'on' | 'off';
  aeratorPowerLevel: number;
  autoFeeder: boolean;
  feederInterval: number;
  feederWeight: number;
  waterPump: 'on' | 'off' | 'auto';
  thermalControl: 'auto' | 'off';
  targetTemp: number;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  pondId: PondId;
  type: 'info' | 'warning' | 'critical' | 'success';
  message: string;
  category: 'water' | 'equipment' | 'ai' | 'market';
}

export interface FeedingSchedule {
  id: string;
  time: string;
  pondId: PondId;
  amountKg: number;
  status: 'completed' | 'pending' | 'skipped';
}

export interface ReportData {
  sourceID: number;
  TimestampUTC: string;
  sourceName: string;
  quantityID: number;
  quantityName: string;
  Value: number;
  energiaActivaInicialPT577:number;
  energiaActivaFinalPT577:number;
  diferenciaEnergiaActivaPT577:number;
  energiaReactivaInicialPT577:number;
  energiaReactivaFinalPT577:number;
  diferenciaEnergiaReactivaPT577:number;
  energiaActivaInicialRT577:number;
  energiaActivaFinalRT577:number;
  diferenciaEnergiaActivaRT577:Number
  energiaReactivaInicialRT577:Number;
  energiaReactivaFinalRT577:Number;
  diferenciaEnergiaReactivaRT577:Number;
  activaInicialPT578:Number;
  activaFinalPT578: Number;
  diferenciaActivaPT578: Number;
  reactivaInicialPT578:Number;
  reactivaFinalPT578:Number;
  diferenciaReactivaPT578:Number;
  activaInicialRT578:Number;
  activaFinalRT578: Number;
  diferenciaActivaRT578: Number;
  reactivaInicialRT578:Number;
  reactivaFinalRT578:Number;
  diferenciaReactivaRT578:Number;

  demandaT577P:Number;
  demandaT577R:Number;
  demandaT578P:Number;
  demandaT578R:Number;

  energiaActivaBG:Number;
  energiaReactivaBG:Number;
  factorPotenciaBG:Number;
  demandaBG:Number;

  energiaActivaEG:Number;
  energiaReactivaEG:Number;
  factorPotenciaEG:Number;
  demandaEG:Number;

  mes:Number;
  anio:Number;
  fechaInicio:String;
  fechaFin:String;

  energiaActivaBecoT577: number;
  lecturaReactiva:number;
  factorPotencia:number;

  rolloverActivaT577P: boolean;
  rolloverActivaT577R: boolean;
  rolloverActivaT578P: boolean;
  rolloverActivaT578R: boolean;
  rolloverReactivaT577P: boolean;
  rolloverReactivaT577R: boolean;
  rolloverReactivaT578P: boolean;
  rolloverReactivaT578R: boolean;
}

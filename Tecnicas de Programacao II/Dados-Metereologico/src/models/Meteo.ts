export interface RawMeteoData {
  Date: number;
  Time: number;
  Temp_C: number;
  'Hum_%': number;
  Press_Bar: number;
  TempCabine_C: number;
  'Charge ': number;
  SR_Wm2: number;
  WindPeak_ms: number;
  'WindSpeed_Inst ': number;
  'WindSpeed_Avg ': number;
  'WindDir_Inst ': number;
  WindDir_Avg: number;
}

export class Meteo {
  public dateTime: Date;
  public tempC: number;
  public humidity: number;
  public pressure: number;
  public windSpeedAvg: number;

  constructor(data: RawMeteoData) {
    this.dateTime = this.convertExcelDateTime(data.Date, data.Time);

    this.tempC = data.Temp_C;
    this.humidity = data['Hum_%'];
    this.pressure = data.Press_Bar;
    this.windSpeedAvg = data['WindSpeed_Avg '];
  }

  /**
   * Converte o número de série de data e hora do Excel para um objeto Date.
   * @param excelDate - O número de dias desde 1900.
   * @param excelTime - A fração de um dia de 24 horas, como 0.5 para meio-dia.
   * @returns - Um objeto Date.
   */

  private convertExcelDateTime(excelDate: number, excelTime: number): Date {
    // Excel trata a data como local, não usar UTC aqui para evitar conversões de fuso horário.
    const baseDate = new Date(1899, 11, 30);

    // Adiciona os dias e a fração de tempo em milissegundos
    const totalMilliseconds = (excelDate + excelTime) * 24 * 60 * 60 * 1000;

    // Cria a data final somando os milissegundos à data base
    return new Date(baseDate.getTime() + totalMilliseconds);
  }
}
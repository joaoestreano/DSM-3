import * as xlsx from 'xlsx';
import * as path from 'path';
import { Meteo, RawMeteoData } from './models/Meteo';

// Função para ler o Excel e converter os dados para a classe Meteo
function loadMeteorologicalData(): Meteo[] {
    const filePath = path.resolve(__dirname, '..', 'Desafio 3DSM - Dados meteorológicos.xlsx');

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
        throw new Error("Nenhuma planilha encontrada no arquivo Excel.");
    }

    const worksheet = workbook.Sheets[sheetName];
    const rawData = xlsx.utils.sheet_to_json<RawMeteoData>(worksheet, { raw: true });
    const meteoData = rawData.map(row => new Meteo(row));

    return meteoData;
}

function resolucaoMeteo() {
    const data = loadMeteorologicalData();

    if (data.length === 0) {
        console.log("Nenhum dado encontrado no arquivo.");
        return;
    }

    // c) Informar quais os 5 dias que tiveram as mais altas temperaturas.
    console.log("Os 5 dias com as temperaturas mais altas são:");
    const sortedByTemp = [...data].sort((a, b) => {
        if (b.tempC === a.tempC) {
            return a.dateTime.getTime() - b.dateTime.getTime();
        }
        return b.tempC - a.tempC;
    });

    sortedByTemp.slice(0, 5).forEach(item => {
        console.log(`- Data: ${item.dateTime.toLocaleDateString('pt-BR')} ${item.dateTime.toLocaleTimeString('pt-BR')}, Temperatura: ${item.tempC.toFixed(2)}°C`);
    });
    console.log('\n');

    // d) Informar a média de todas as temperaturas cadastradas;
    const totalTemp = data.reduce((sum, item) => sum + item.tempC, 0);
    const avgTemp = totalTemp / data.length;
    console.log(`Média de todas as temperaturas: ${avgTemp.toFixed(2)}°C\n`);

    // e) Informar a média geral das médias de vento cadastradas;
    const totalWindAvg = data.reduce((sum, item) => sum + item.windSpeedAvg, 0);
    const avgWindAvg = totalWindAvg / data.length;
    console.log(`Média geral da velocidade média do vento: ${avgWindAvg.toFixed(2)} m/s\n`);

    // f) Informar os três dias com as maiores medições de pressão atmosférica.
    console.log("Os 3 dias com as maiores medições de pressão atmosférica foram:");
    const sortedByPressure = [...data].sort((a, b) => {
        if (b.pressure === a.pressure) {
            return a.dateTime.getTime() - b.dateTime.getTime();
        }
        return b.pressure - a.pressure;
    });

    sortedByPressure.slice(0, 3).forEach(item => {
        console.log(`- Data: ${item.dateTime.toLocaleDateString('pt-BR')} ${item.dateTime.toLocaleTimeString('pt-BR')}, Pressão: ${item.pressure.toFixed(4)} Bar`);
    });
    console.log("\n");

    // g) Informar a média geral da medição do percentual de umidade do ar
    const totalHumidity = data.reduce((sum, item) => sum + item.humidity, 0);
    const avgHumidity = totalHumidity / data.length;
    console.log(`Média geral da umidade do ar: ${avgHumidity.toFixed(2)}%\n`);
}

resolucaoMeteo();
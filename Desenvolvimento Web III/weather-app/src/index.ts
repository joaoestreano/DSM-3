import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('Faltando API_KEY no .env');
  process.exit(1);
}

app.use('/public', express.static(path.join(process.cwd(), 'public')));

// Serve a página principal (views/index.html)
app.get('/', (_req, res) => {
  res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});

type WeatherResult = {
  city: string;
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
};

app.get('/api/weather', async (req, res) => {
  const city = String(req.query.city || '').trim();
  if (!city) {
    return res.status(400).json({ error: 'Informe o nome da cidade.' });
  }

  const lat = req.query.lat as string;
const lon = req.query.lon as string;

if (lat && lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
  const apiRes = await axios.get(url);
  const d = apiRes.data;
  const result = {
    city: `${d.name}, ${d.sys.country}`,
    temp: d.main.temp,
    feels_like: d.main.feels_like,
    humidity: d.main.humidity,
    description: d.weather?.[0]?.description || '',
    icon: `https://openweathermap.org/img/wn/${d.weather?.[0]?.icon}@2x.png`
  };
  return res.json(result);
}

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const apiRes = await axios.get(url);

    const d = apiRes.data;
    const result: WeatherResult = {
      city: `${d.name}, ${d.sys.country}`,
      temp: d.main.temp,
      feels_like: d.main.feels_like,
      humidity: d.main.humidity,
      description: d.weather?.[0]?.description || '',
      icon: `https://openweathermap.org/img/wn/${d.weather?.[0]?.icon}@2x.png`
    };

    return res.json(result);
  } catch (error: any) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Cidade não encontrada.' });
    }
    console.error(error?.message || error);
    return res.status(500).json({ error: 'Erro ao consultar a API de clima.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


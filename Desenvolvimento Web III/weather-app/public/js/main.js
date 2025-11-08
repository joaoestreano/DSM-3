const form = document.getElementById('search-form');
const input = document.getElementById('city-input');
const resultDiv = document.getElementById('result');
const locBtn = document.getElementById('loc-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) {
    resultDiv.innerHTML = '<p class="error">Por favor, informe uma cidade.</p>';
    return;
  }
  await fetchWeather(`/api/weather?city=${encodeURIComponent(city)}`);
  localStorage.setItem('lastCity', city);
});

locBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocalização não suportada no seu navegador.');
    return;
  }

  resultDiv.innerHTML = '<p>🔍 Buscando sua localização...</p>';

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    await fetchWeather(`/api/weather?lat=${latitude}&lon=${longitude}`);
  }, () => {
    resultDiv.innerHTML = '<p class="error">Não foi possível acessar sua localização.</p>';
  });
});

async function fetchWeather(url) {
  resultDiv.innerHTML = '<p>Carregando...</p>';
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      resultDiv.innerHTML = `<p class="error">${data.error || 'Erro ao buscar dados.'}</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <div class="card">
        <h2>${data.city}</h2>
        <img src="${data.icon}" alt="${data.description}" />
        <p class="temp">${data.temp}°C</p>
        <p class="desc">${data.description}</p>
        <div class="details">
          <p>Sensação: ${data.feels_like}°C</p>
          <p>Umidade: ${data.humidity}%</p>
        </div>
      </div>
    `;
  } catch {
    resultDiv.innerHTML = '<p class="error">Erro de rede. Tente novamente.</p>';
  }
}

// Mostrar última cidade buscada automaticamente
window.addEventListener('DOMContentLoaded', () => {
  const last = localStorage.getItem('lastCity');
  if (last) {
    input.value = last;
    fetchWeather(`/api/weather?city=${encodeURIComponent(last)}`);
  }
});

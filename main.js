import { get } from 'https://cdn.jsdelivr.net/gh/jontor/croot/api/api.js';

// Inisialisasi peta berpusat di daerah Pajagalan, Bandung
const map = L.map('map').setView([-6.923, 107.603], 15);

// Memuat tile layer OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Mengambil data GeoJSON menggunakan modul croot.js
get('./rute.geojson', (data) => {
  L.geoJSON(data, {
    style: {
      color: '#e74c3c',
      weight: 5,
      opacity: 0.8
    },
    onEachFeature: (feature, layer) => {
      if (feature.properties) {
        const p = feature.properties;
        layer.bindPopup(`
          <div style="padding: 4px;">
            <h4 style="margin: 0 0 6px 0; color: #2c3e50;">${p.nama_rute}</h4>
            <p style="margin: 2px 0;"><b>Asal:</b> ${p.asal}</p>
            <p style="margin: 2px 0;"><b>Tujuan:</b> ${p.tujuan}</p>
            <p style="margin: 2px 0;"><b>Jarak:</b> ${p.jarak_km}</p>
            <p style="margin: 2px 0;"><b>Ongkos:</b> <span style="color: #27ae60; font-weight: bold;">${p.ongkos_gojek}</span></p>
          </div>
        `);
      }
    }
  }).addTo(map);
});
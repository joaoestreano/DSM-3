import React, { useEffect, useState } from 'react';
import { getTables, getReservations } from '../api';
import ReservationModal from './ReservationModal';

const colorMap: any = {
  available: '#2ecc71',
  reserved: '#f1c40f',
  occupied: '#e74c3c'
};

export default function TableMap() {
  const [tables, setTables] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  async function load() {
    const t = await getTables();
    setTables(t.tables || []);
    const r = await getReservations();
    setReservations(r.reservations || []);
  }

  useEffect(() => {
    load();
    const iv = setInterval(load, 30 * 1000);
    return () => clearInterval(iv);
  }, []);

  function statusForTable(tableNumber: number) {
    const now = new Date();
    const tableRes = reservations.filter((r:any) => r.tableNumber === tableNumber && r.status !== 'cancelado');
    const occ = tableRes.find((r:any) => new Date(r.start) <= now && new Date(r.end) > now);
    if (occ) return 'occupied';
    const future = tableRes.find((r:any) => new Date(r.start) > now);
    if (future) return 'reserved';
    return 'available';
  }

  return (
    <div>
      <h3>Mapa de Mesas</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {tables.map(t => {
          const s = statusForTable(t.number);
          return (
            <div key={t.number}
              onClick={() => { setSelectedTable(t.number); setModalOpen(true); }}
              style={{
                borderRadius: 8, padding: 12, cursor: 'pointer', minHeight: 80,
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                background: colorMap[s === 'available' ? 'available' : (s === 'reserved' ? 'reserved' : 'occupied')] || 'lightgray',
                color: '#fff'
              }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Mesa {t.number}</div>
              <div style={{ fontSize: 13 }}>{t.capacity} pessoas</div>
              <div style={{ fontSize: 12 }}>{t.location}</div>
            </div>
          );
        })}
      </div>

      {modalOpen && selectedTable !== null &&
        <ReservationModal tableNumber={selectedTable} onClose={() => { setModalOpen(false); setSelectedTable(null); load(); }} />
      }
    </div>
  );
}

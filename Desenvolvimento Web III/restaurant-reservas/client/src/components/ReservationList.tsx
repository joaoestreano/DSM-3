import React, { useEffect, useState } from 'react';
import { getReservations, cancelReservation } from '../api';
import dayjs from 'dayjs';

export default function ReservationList() {
  const [res, setRes] = useState<any[]>([]);

  async function load() {
    const r = await getReservations();
    setRes(r.reservations || []);
  }

  useEffect(() => { load(); const iv = setInterval(load, 30*1000); return ()=>clearInterval(iv); }, []);

  return (
    <div>
      <h3>Reservas</h3>
      <div>
        {res.map(r => (
          <div key={r._id} style={{ borderBottom: '1px solid #eee', padding: 6 }}>
            <div><strong>{r.customerName}</strong> ({r.customerContact})</div>
            <div>Mesa: {r.tableNumber} — {r.people} pessoas</div>
            <div>Início: {dayjs(r.start).format('YYYY-MM-DD HH:mm')} — Fim: {dayjs(r.end).format('YYYY-MM-DD HH:mm')}</div>
            <div>Status: {r.status}</div>
            <div>
              {r.status !== 'cancelado' && <button onClick={async ()=>{ await cancelReservation(r._id); load(); }}>Cancelar</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

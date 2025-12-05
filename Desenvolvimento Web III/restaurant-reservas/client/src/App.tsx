import React from 'react';
import TableMap from './components/TableMap';
import ReservationList from './components/ReservationList';

export default function App() {
  return (
    <div style={{ maxWidth: 1000, margin: '20px auto', padding: 12 }}>
      <h1>Sistema de Reservas</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div>
          <TableMap />
        </div>
        <div>
          <ReservationList />
        </div>
      </div>
    </div>
  );
}

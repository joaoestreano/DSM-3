import React, { useState } from 'react';
import dayjs from 'dayjs';
import { createReservation } from '../api';

export default function ReservationModal({ tableNumber, onClose }: any) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [people, setPeople] = useState(2);
  const [start, setStart] = useState(dayjs().add(2, 'hour').format('YYYY-MM-DDTHH:mm'));
  const [notes, setNotes] = useState('');
  const [msg, setMsg] = useState('');

  async function submit() {
    const payload = {
      customerName: name,
      customerContact: contact,
      tableNumber,
      people,
      start,
      notes
    };
    const res = await createReservation(payload);
    if (res.message) setMsg(res.message);
    if (res.reservation) {
      setMsg('Reserva criada com sucesso.');
      setTimeout(onClose, 800);
    }
  }

  return (
    <div style={{
      position:'fixed', left:0, right:0, top:0, bottom:0,
      background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center'
    }}>
      <div style={{ background:'#fff', padding:20, borderRadius:8, minWidth:360 }}>
        <h4>Reservar Mesa {tableNumber}</h4>
        <div>
          <label>Nome</label>
          <input value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label>Contato</label>
          <input value={contact} onChange={e=>setContact(e.target.value)} />
        </div>
        <div>
          <label>Pessoas</label>
          <input type="number" value={people} onChange={e=>setPeople(Number(e.target.value))} />
        </div>
        <div>
          <label>Início</label>
          <input type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} />
        </div>
        <div>
          <label>Observações</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <button onClick={submit}>Reservar</button>
          <button onClick={onClose} style={{ marginLeft: 8 }}>Fechar</button>
        </div>
        {msg && <div style={{ marginTop:8 }}>{msg}</div>}
      </div>
    </div>
  );
}

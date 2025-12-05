const base = '/api';

export async function getTables() {
  const res = await fetch(`${base}/tables`);
  return res.json();
}

export async function getReservations(query = '') {
  const res = await fetch(`${base}/reservations${query}`);
  return res.json();
}

export async function createReservation(payload: any) {
  const res = await fetch(`${base}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function cancelReservation(id: string) {
  const res = await fetch(`${base}/reservations/${id}`, { method: 'DELETE' });
  return res.json();
}

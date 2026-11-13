// Rezervasyon verisi. Şimdilik tarayıcıda (localStorage) saklanır: portföy demosu.
// Gerçek kullanımda load/save yerine bir sunucu API'si çağrılır; arayüz değişmez.
(function () {
  const KEY = "kor-reservations-v1";
  const SEATS_PER_SLOT = 24;
  const OPEN = 11 * 60;        // 11:00
  const LAST_SLOT = 21 * 60 + 30; // 21:30 (kapanış 22:00)

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch (e) { return false; }
  }

  const pad = (n) => String(n).padStart(2, "0");
  const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const toTime = (m) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

  function slots() {
    const out = [];
    for (let m = OPEN; m <= LAST_SLOT; m += 30) out.push(toTime(m));
    return out;
  }

  // Demo doluluğu: her gün/saat için sabit, akşam ve öğlen daha kalabalık.
  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0);
  }
  function demoOccupied(date, time) {
    const hour = parseInt(time, 10);
    const base = hour >= 19 && hour <= 20 ? 19 : hour >= 12 && hour <= 13 ? 13 : 3;
    return Math.min(SEATS_PER_SLOT, base + (hash(date + time) % 9));
  }

  function seatsLeft(date, time) {
    const booked = load()
      .filter((r) => r.date === date && r.time === time && r.status !== "cancelled")
      .reduce((sum, r) => sum + r.party, 0);
    return Math.max(0, SEATS_PER_SLOT - demoOccupied(date, time) - booked);
  }

  function makeCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let c = "";
    for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)];
    return "KOR-" + c;
  }

  function add(r) {
    const list = load();
    const item = { ...r, id: makeCode(), status: "pending", createdAt: new Date().toISOString() };
    list.push(item);
    return save(list) ? item : null;
  }

  function update(id, patch) {
    const list = load();
    const i = list.findIndex((r) => r.id === id);
    if (i < 0) return null;
    list[i] = { ...list[i], ...patch };
    save(list);
    return list[i];
  }

  window.KorStore = { load, add, update, seatsLeft, slots, isoDate, SEATS_PER_SLOT };
})();

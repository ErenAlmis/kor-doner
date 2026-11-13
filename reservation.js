// Masa rezervasyonu: kişi, gün ve saat seçimi, sağda canlı dolan özet.
(function () {
  const S = window.KorStore;
  const form = document.getElementById("bookForm");
  if (!S || !form) return;

  const partyBox = document.getElementById("partyPills");
  const dayBox = document.getElementById("dayPills");
  const timeBox = document.getElementById("timePills");
  const err = document.getElementById("bookError");
  const done = document.getElementById("bookDone");
  const sum = {
    party: document.getElementById("sumParty"),
    day: document.getElementById("sumDay"),
    time: document.getElementById("sumTime"),
  };

  const DAYS_AHEAD = 14;
  const MAX_PARTY = 8;
  const fmtDay = new Intl.DateTimeFormat("tr-TR", { weekday: "long", day: "numeric", month: "long" });
  const fmtWeek = new Intl.DateTimeFormat("tr-TR", { weekday: "short" });
  const fmtMonth = new Intl.DateTimeFormat("tr-TR", { month: "short" });

  const state = { party: null, date: null, time: null };

  const pill = (name, value, html, extra = "") =>
    `<label class="pill ${extra}"><input type="radio" name="${name}" value="${value}"><span>${html}</span></label>`;

  // Kişi sayısı
  partyBox.innerHTML = Array.from({ length: MAX_PARTY }, (_, i) => pill("party", i + 1, i + 1)).join("");

  // Günler: bugünden itibaren iki hafta
  const days = [];
  const today = new Date(); today.setHours(0, 0, 0, 0);
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    days.push(d);
  }
  dayBox.innerHTML = days.map((d, i) => {
    const top = i === 0 ? "Bugün" : i === 1 ? "Yarın" : fmtWeek.format(d);
    return pill("day", S.isoDate(d),
      `<small>${top}</small><b>${d.getDate()}</b><small>${fmtMonth.format(d)}</small>`, "pill-day");
  }).join("");

  function minutesNow() {
    const n = new Date();
    return n.getHours() * 60 + n.getMinutes();
  }

  function renderTimes() {
    if (!state.party || !state.date) return;
    const isToday = state.date === S.isoDate(today);
    const cutoff = minutesNow() + 30; // bugünse en erken yarım saat sonrası
    let anyFree = false;
    timeBox.innerHTML = S.slots().map((t) => {
      const [h, m] = t.split(":").map(Number);
      const past = isToday && h * 60 + m < cutoff;
      const left = past ? 0 : S.seatsLeft(state.date, t);
      const full = !past && left < state.party;
      // Bu gruptan sonra en fazla bir masalık (6 kişi) yer kalıyorsa "az yer"
      const low = !past && !full && left - state.party <= 6;
      if (!past && !full) anyFree = true;
      const off = past || full;
      const aria = off ? `${t}, ${past ? "geçti" : "dolu"}` : low ? `${t}, az yer kaldı` : "";
      const label = `<span${aria ? ` aria-label="${aria}"` : ""}>${t}${low ? "<small>az yer</small>" : ""}</span>`;
      const cls = off ? " is-off" : low ? " is-low" : "";
      return `<label class="pill${cls}"><input type="radio" name="time" value="${t}"${off ? " disabled" : ""}>${label}</label>`;
    }).join("");
    if (!anyFree) {
      timeBox.innerHTML = `<p class="book-empty">Bu gün için ${state.party} kişilik boş masa kalmadı. Başka bir gün seçin.</p>`;
    }
    // Önceki saat hâlâ uygunsa seçili kalsın
    const keep = state.time && timeBox.querySelector(`input[value="${state.time}"]:not(:disabled)`);
    if (keep) keep.checked = true; else state.time = null;
    renderSummary();
  }

  function line(el, value) {
    el.innerHTML = value ? `<span class="sum-value">${value}</span>` : el.dataset.empty;
    el.classList.toggle("is-set", !!value);
  }
  Object.values(sum).forEach((el) => { el.dataset.empty = el.innerHTML; });

  function renderSummary() {
    line(sum.party, state.party ? `${state.party} kişi` : "");
    line(sum.day, state.date ? fmtDay.format(new Date(state.date + "T12:00")) : "");
    line(sum.time, state.time || "");
  }

  form.addEventListener("change", (e) => {
    const t = e.target;
    if (t.name === "party") { state.party = Number(t.value); renderTimes(); }
    else if (t.name === "day") { state.date = t.value; renderTimes(); }
    else if (t.name === "time") { state.time = t.value; renderSummary(); }
    if (["party", "day", "time"].includes(t.name)) err.textContent = "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // form.name formun kendi adını verir, bu yüzden alanlara id ile erişiyoruz
    const nameEl = document.getElementById("bkName");
    const phoneEl = document.getElementById("bkPhone");
    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const note = document.getElementById("bkNote").value.trim();
    let msg = "", focus = null;
    if (!state.party) { msg = "Kaç kişi geleceğinizi seçin."; focus = partyBox.querySelector("input"); }
    else if (!state.date) { msg = "Hangi gün geleceğinizi seçin."; focus = dayBox.querySelector("input"); }
    else if (!state.time) { msg = "Boş saatlerden birini seçin."; focus = timeBox.querySelector("input:not(:disabled)"); }
    else if (name.length < 2) { msg = "Adınızı yazın, masayı bu adla ayırtacağız."; focus = nameEl; }
    else if ((phone.match(/\d/g) || []).length < 6) { msg = "Size ulaşabilmemiz için telefon numaranızı yazın."; focus = phoneEl; }
    if (msg) { err.textContent = msg; focus && focus.focus(); return; }

    // Aynı telefonla aynı gün ve saate ikinci rezervasyon olmasın
    const digits = (s) => s.replace(/\D/g, "");
    const dup = S.load().find((r) =>
      r.date === state.date && r.time === state.time && r.status !== "cancelled" &&
      digits(r.phone) === digits(phone));
    if (dup) {
      err.textContent = `Bu saat için zaten bir rezervasyonunuz var (${dup.id}). Değiştirmek isterseniz başka bir saat seçin.`;
      return;
    }

    // Seçim ile gönderim arasında saat dolduysa yakala
    if (S.seatsLeft(state.date, state.time) < state.party) {
      err.textContent = "Bu saat az önce doldu. Başka bir saat seçin.";
      renderTimes();
      return;
    }

    const saved = S.add({ party: state.party, date: state.date, time: state.time, name, phone, note });
    if (!saved) {
      err.textContent = "Rezervasyon kaydedilemedi. Tarayıcınız kayıtlara izin vermiyor olabilir; bizi arayın.";
      return;
    }
    document.getElementById("doneWhen").textContent =
      `${fmtDay.format(new Date(state.date + "T12:00"))}, ${state.time}`;
    const meta = document.getElementById("doneMeta");
    meta.textContent = `${state.party} kişilik masa ${name} adına ayrıldı. Rezervasyon kodunuz: `;
    const code = document.createElement("span");
    code.className = "done-code";
    code.textContent = saved.id;
    meta.append(code);
    form.hidden = true;
    done.hidden = false;
    done.focus();
  });

  document.getElementById("bookAgain").addEventListener("click", () => {
    form.reset();
    state.party = state.date = state.time = null;
    timeBox.innerHTML = '<p class="book-empty">Önce kişi sayısını ve günü seçin, boş saatler burada görünecek.</p>';
    err.textContent = "";
    renderSummary();
    done.hidden = true;
    form.hidden = false;
    partyBox.querySelector("input").focus();
  });
})();

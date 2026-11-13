// Restoran paneli: rezervasyonları güne göre listeler, onaylatır ya da iptal ettirir.
(function () {
  const S = window.KorStore;
  const list = document.getElementById("panelList");
  const summary = document.getElementById("panelSummary");
  const filterBox = document.querySelector(".panel-filter");
  let filter = "upcoming";

  const fmtDay = new Intl.DateTimeFormat("tr-TR", { weekday: "long", day: "numeric", month: "long" });
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const today = S.isoDate(new Date());
  const tomorrow = (() => { const d = new Date(); d.setDate(d.getDate() + 1); return S.isoDate(d); })();

  const STATUS = {
    pending: { label: "Bekliyor", actions: [["confirmed", "Onayla"], ["cancelled", "İptal et"]] },
    confirmed: { label: "Onaylandı", actions: [["cancelled", "İptal et"]] },
    cancelled: { label: "İptal edildi", actions: [["pending", "Geri al"]] },
  };

  function dayTitle(date) {
    const base = fmtDay.format(new Date(date + "T12:00"));
    if (date === today) return `Bugün, ${base}`;
    if (date === tomorrow) return `Yarın, ${base}`;
    return base;
  }

  function render() {
    const all = S.load().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    const shown = filter === "upcoming" ? all.filter((r) => r.date >= today) : all;

    const todays = all.filter((r) => r.date === today && r.status !== "cancelled");
    const guests = todays.reduce((n, r) => n + r.party, 0);
    summary.textContent = todays.length
      ? `Bugün ${todays.length} rezervasyon, toplam ${guests} misafir.`
      : "Bugün için rezervasyon yok.";

    if (!shown.length) {
      list.innerHTML = `<div class="panel-empty">
        <p>${filter === "upcoming" ? "Yaklaşan rezervasyon yok." : "Henüz hiç rezervasyon yok."}</p>
        <a class="link-cta" href="index.html#rezervasyon">Sitede bir masa ayırtıp deneyin <span aria-hidden="true">↗</span></a>
      </div>`;
      return;
    }

    const byDay = {};
    shown.forEach((r) => (byDay[r.date] = byDay[r.date] || []).push(r));
    list.innerHTML = Object.entries(byDay).map(([date, rows]) => `
      <section class="panel-day" aria-label="${esc(dayTitle(date))}">
        <h2 class="panel-day-title">${esc(dayTitle(date))}</h2>
        ${rows.map((r) => {
          const st = STATUS[r.status] || STATUS.pending;
          return `<article class="res res-${r.status}">
            <p class="res-time">${esc(r.time)}</p>
            <div class="res-who">
              <p class="res-name">${esc(r.name)} <span class="res-party">${r.party} kişi</span></p>
              <p class="res-contact"><a href="tel:${esc(r.phone.replace(/[^\d+]/g, ""))}">${esc(r.phone)}</a> <span class="res-code">${esc(r.id)}</span></p>
              ${r.note ? `<p class="res-note">${esc(r.note)}</p>` : ""}
            </div>
            <p class="res-status">${st.label}</p>
            <div class="res-actions">
              ${st.actions.map(([to, label]) =>
                `<button type="button" class="res-btn${to === "confirmed" ? " is-primary" : ""}" data-id="${esc(r.id)}" data-to="${to}">${label}</button>`
              ).join("")}
            </div>
          </article>`;
        }).join("")}
      </section>`).join("");
  }

  list.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-to]");
    if (!b) return;
    S.update(b.dataset.id, { status: b.dataset.to });
    render();
    // Odak kaybolmasın: aynı rezervasyonun ilk butonuna dön
    const again = list.querySelector(`button[data-id="${b.dataset.id}"]`);
    if (again) again.focus();
  });

  filterBox.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    filter = b.dataset.filter;
    filterBox.querySelectorAll("button").forEach((x) => {
      const on = x === b;
      x.setAttribute("aria-selected", on);
      x.tabIndex = on ? 0 : -1;
    });
    render();
  });

  // Başka sekmede yeni rezervasyon gelirse listeyi tazele
  window.addEventListener("storage", render);
  render();
})();

// ▼ index.html 用：入力行生成
if (location.pathname.includes("index.html") || location.pathname.endsWith("/")) {

  window.onload = () => {
    const tbody = document.getElementById("detailRows");
    if (!tbody) return;

    for (let i = 1; i <= 10; i++) {
      tbody.innerHTML += `
        <tr>
          <td><input id="item${i}"></td>
          <td><input id="qty${i}" type="number"></td>
          <td>
            <select id="unit${i}">
              <option value=""></option>
              <option value="個">個</option>
              <option value="台">台</option>
              <option value="式">式</option>
              <option value="m">m</option>
              <option value="セット">セット</option>
              <option value="時間">時間</option>
              <option value="日">日</option>
            </select>
          </td>
          <td><input id="price${i}" type="number"></td>
        </tr>
      `;
    }
  };

  // プレビューへ遷移
  function goPreview() {
    const params = new URLSearchParams();

    params.append("clientName", document.getElementById("clientName").value);
    params.append("subject", document.getElementById("subject").value);
    params.append("workDate", document.getElementById("workDate").value);
    params.append("invoiceNo", document.getElementById("invoiceNo").value);
    params.append("invoiceDate", document.getElementById("invoiceDate").value);

    for (let i = 1; i <= 10; i++) {
      params.append(`item${i}`,  document.getElementById(`item${i}`).value);
      params.append(`qty${i}`,   document.getElementById(`qty${i}`).value);
      params.append(`unit${i}`,  document.getElementById(`unit${i}`).value);
      params.append(`price${i}`, document.getElementById(`price${i}`).value);
    }

    location.href = "invoice_layout.html?" + params.toString();
  }

  window.goPreview = goPreview;
}



// ▼ invoice_layout.html 用：値の反映
if (location.pathname.includes("invoice_layout.html")) {

  window.onload = () => {
    const url = new URL(window.location.href);
    const p = url.searchParams;

    document.getElementById("inv-no").textContent     = p.get("invoiceNo");
    document.getElementById("inv-date").textContent   = p.get("invoiceDate");
    document.getElementById("client-name").textContent= p.get("clientName");
    document.getElementById("subject").textContent    = p.get("subject");
    document.getElementById("work-date").textContent  = p.get("workDate");

    let total = 0;
    const tbody = document.getElementById("details-body");

    for (let i = 1; i <= 10; i++) {

      const item  = p.get(`item${i}`) || "";
      const qty   = Number(p.get(`qty${i}`) || 0);
      const unit  = p.get(`unit${i}`) || "";
      const price = Number(p.get(`price${i}`) || 0);

      const amount = qty * price;
      if (amount > 0) total += amount;

      tbody.innerHTML += `
        <tr>
          <td>${item}</td>
          <td>${qty || ""}</td>
          <td>${unit}</td>
          <td>${price ? price.toLocaleString() : ""}</td>
          <td>${amount ? amount.toLocaleString() : ""}</td>
        </tr>
      `;
    }

    document.getElementById("total").textContent = total.toLocaleString();
  };
}

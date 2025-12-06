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

window.onload = () => {
  if (!location.pathname.includes("invoice_layout.html")) return;

  const url = new URL(window.location.href);
  const p = url.searchParams;

  document.getElementById("inv-no").textContent     = p.get("invoiceNo");
  document.getElementById("inv-date").textContent   = p.get("invoiceDate");
  document.getElementById("client-name").textContent= p.get("clientName");
  document.getElementById("subject").textContent    = p.get("subject");
  document.getElementById("work-date").textContent  = p.get("workDate");

  let total = 0;
  let tbody = document.getElementById("details-body");

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

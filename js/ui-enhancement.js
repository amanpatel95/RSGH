$(document).ready(function () {

  /* -----------------------------
   * 1) Hardcoded Dummy Data (simulate API response by TID)
   * ----------------------------- */
  const dummyTidDB = {
    "12345": {
      transactionId: "12345",
      patientname: "Harihara Sudhan Sundarararaj",
      memberId: "MBR-99201-IND-KA-000001",
      mobile: "9876543210",
      age: "31",
      gender: "Male",
      rghsNo: "RGHS-2026-0000123456",
      doctorName: "Dr. Arvind R. Krishnamurthy (MD, Internal Medicine)",
      janadharNo: "JD-09-22-334455667788",
      crLimit: "₹ 1,25,000.00",
      balance: "₹ 4,500.00",
      prevBalance: "₹ 500.00",
      opdNo: "OPD/BLR/2026/00012983",
      rmcNo: "RMC-1122334455",
      hospitalType: "1", // 0=GOVT, 1=PVT
      hosname: "Sri Venkateshwara Multispeciality Hospital & Research Centre, Bengaluru - 560076",
      prescriptionDate: "06-Feb-2026",
      prescriptionDuration: "15 days",
      gstType: "0", // 0=Regular, 1=Composite
      prescription: "Tab. Azithromycin 500mg OD x 3 days; Tab. Pantoprazole 40mg OD x 7 days; ORS 2 sachets"
    },

    "99999": {
      transactionId: "99999",
      patientname: "Ananya R.",
      memberId: "MBR-45012-IND-KA-000045",
      mobile: "9012345678",
      age: "45",
      gender: "Female",
      rghsNo: "RGHS-2026-0000008899",
      doctorName: "Dr. Kumar",
      janadharNo: "JD-11-33-998877665544",
      crLimit: "₹ 50,000.00",
      balance: "₹ 1,200.00",
      prevBalance: "₹ 0.00",
      opdNo: "OPD/BLR/2026/00000456",
      rmcNo: "RMC-5566778899",
      hospitalType: "0",
      hosname: "Govt District Hospital, Bengaluru",
      prescriptionDate: "05-Feb-2026",
      prescriptionDuration: "7 days",
      gstType: "1",
      prescription: "Tab. Paracetamol 650mg SOS; Steam inhalation BD"
    }
  };

  /* -----------------------------
   * 2) Thresholds to quickly check fitting
   *    Tune these according to your UI space.
   * ----------------------------- */
  const maxLen = {
    transactionId: 12,
    patientname: 25,
    memberId: 20,
    mobile: 10,
    age: 3,
    gender: 10,
    rghsNo: 18,
    doctorName: 28,
    janadharNo: 22,
    crLimit: 14,
    balance: 14,
    prevBalance: 14,
    opdNo: 22,
    rmcNo: 16,
    hosname: 35,
    prescriptionDate: 12,
    prescriptionDuration: 12,
    prescription: 45
  };

  const fieldIds = [
    "transactionId", "patientname", "memberId",
    "mobile", "age", "gender",
    "rghsNo", "doctorName", "janadharNo",
    "crLimit", "balance", "prevBalance",
    "opdNo", "rmcNo", "hosname",
    "prescriptionDate", "prescriptionDuration", "prescription"
  ];

  /* -----------------------------
   * 3) Helper: Set field value + length
   *    Adds: len=XX and warns if exceeds maxLen.
   * ----------------------------- */
  function setField(id, value) {
    const text = (value ?? "").toString();
    const len = text.length;
    const limit = maxLen[id] ?? null;

    const warnClass = (limit && len > limit) ? "len-warn" : "";
    const display = text ? text : "-";

    // Insert HTML with length badge
    $("#" + id).html(`
      <span class="valueText">${escapeHtml(display)}</span>
      <span class="lenBadge ${warnClass}">len=${len}${limit ? ` / max=${limit}` : ""}</span>
    `);
  }

  // Escape to avoid HTML injection issues in dummy data
  function escapeHtml(str) {
    return str.replace(/[&<>"'`=\/]/g, function (s) {
      return ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "`": "&#x60;",
        "=": "&#x3D;",
        "/": "&#x2F;"
      })[s];
    });
  }

  /* -----------------------------
   * 4) Helper: Set radios
   * ----------------------------- */
  function setRadio(name, value) {
    $(`input[name="${name}"]`).prop("checked", false);
    $(`input[name="${name}"][value="${value}"]`).prop("checked", true);
  }

  /* -----------------------------
   * 5) Populate all fields on UI
   * ----------------------------- */
  function populateTidDetails(data) {
    fieldIds.forEach(id => setField(id, data[id]));

    // Radios
    setRadio("hospitalType", data.hospitalType);
    setRadio("gstType", data.gstType);
  }

  /* -----------------------------
   * 6) Fake "fetch" to mimic API delay
   * ----------------------------- */
  function fetchTidDetails(tid) {
    return new Promise(resolve => {
      setTimeout(() => resolve(dummyTidDB[tid] || null), 250);
    });
  }

  /* -----------------------------
   * 7) GET DETAILS button click
   * ----------------------------- */
  $("#btnGetDetails").on("click", async function () {
    const tid = ($("#tidInput").val() || "").trim();

    if (!tid) {
      alert("Please enter a TID");
      return;
    }

    // Simulate fetch (replace with your real ajax later)
    const data = await fetchTidDetails(tid);

    if (!data) {
      // clear fields if not found
      fieldIds.forEach(id => $("#" + id).text(""));
      alert("No record found for TID: " + tid + "\nTry 12345 or 99999");
      return;
    }

    populateTidDetails(data);
  });

  // Auto-load default TID on page load (optional)
  $("#btnGetDetails").click();

});
$(document).ready(function () {

  let medRowCount = 0;

  // Dummy data (replace with API later)
  const products = [
    { id: "P001", name: "Paracetamol 650", company: "ABC Pharma", weight: "10 Tab", hsn: "3004", gst: 5, mrp: 35.00 },
    { id: "P002", name: "Azithromycin 500", company: "XYZ Labs", weight: "3 Tab", hsn: "3004", gst: 12, mrp: 95.00 },
    { id: "P003", name: "Pantoprazole 40", company: "Sunshine", weight: "15 Tab", hsn: "3004", gst: 12, mrp: 120.00 }
  ];

  const batches = {
    "P001": ["B001-A", "B001-B"],
    "P002": ["B002-A"],
    "P003": ["B003-A", "B003-B", "B003-C"]
  };

  function productOptions() {
    let html = `<option value="">Select Product</option>`;
    products.forEach(p => html += `<option value="${p.id}">${p.name}</option>`);
    return html;
  }

  function batchOptions(productId) {
    let html = `<option value="">Select Batch</option>`;
    (batches[productId] || []).forEach(b => html += `<option value="${b}">${b}</option>`);
    return html;
  }

  function createMedicineRow(sn) {
    return `
      <div class="med-row" data-sn="${sn}">
        <div class="med-row-head">
          <div class="med-sn">S.No: <span class="sn">${sn}</span></div>

          <div class="med-actions">
            <button type="button" class="btn-light copyRow">Copy</button>
            <button type="button" class="btn-danger deleteRow">🗑 Delete</button>
          </div>
        </div>

        <div class="med-panels">

          <!-- LEFT PANEL -->
          <div class="med-panel">
            <div class="med-panel-title">Product / Batch</div>
            <div class="med-grid">
              <label>Product</label>
              <select class="product">${productOptions()}</select>

              <label>Company Name</label>
              <input type="text" class="company" placeholder="Auto/Manual" />

              <label>Weight</label>
              <input type="text" class="weight" placeholder="e.g. 10 Tab" />

              <label>HSN (GST%)</label>
              <input type="text" class="hsnGst" placeholder="HSN (GST%)" />

              <label>Batch</label>
              <select class="batch"><option value="">Select Batch</option></select>

              <label>Exp Date</label>
              <input type="text" class="exp" placeholder="MM/YY" />
            </div>
          </div>

          <!-- RIGHT PANEL -->
          <div class="med-panel">
            <div class="med-panel-title">Pricing / Quantity</div>
            <div class="med-grid">
              <label>MRP (PKT)</label>
              <input type="number" class="mrp" step="0.01" placeholder="0.00" />

              <label>Sale Rate (PKT)</label>
              <input type="number" class="saleRate" step="0.01" placeholder="0.00" />

              <label>Discount (%)</label>
              <input type="number" class="disc" step="0.01" placeholder="0" />

              <label>Quantity</label>
              <input type="number" class="qty" step="1" placeholder="0" />

              <label>GST Amount</label>
              <div class="med-readonly gstAmt">0.00</div>

              <label>Total Price (₹)</label>
              <div class="med-readonly totalPrice">0.00</div>

              <label>Total Amt</label>
              <div class="med-readonly totalAmt">0.00</div>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  function renumberRows() {
    $("#medicineContainer .med-row").each(function (i) {
      $(this).attr("data-sn", i + 1);
      $(this).find(".sn").text(i + 1);
    });
    medRowCount = $("#medicineContainer .med-row").length;
  }

  function recalcRow($row) {
    const qty = parseFloat($row.find(".qty").val() || 0);
    const saleRate = parseFloat($row.find(".saleRate").val() || 0);
    const disc = parseFloat($row.find(".disc").val() || 0);

    // Discounted amount
    const gross = qty * saleRate;
    const discountAmt = gross * (disc / 100);
    const afterDisc = Math.max(gross - discountAmt, 0);

    // GST from HSN (GST%) field if available, else try parsing like "3004 (12%)"
    let gstPercent = 0;
    const hsnText = ($row.find(".hsnGst").val() || "").toString();
    const match = hsnText.match(/(\d+)\s*%/);
    if (match) gstPercent = parseFloat(match[1] || 0);

    const gstAmt = afterDisc * (gstPercent / 100);
    const total = afterDisc + gstAmt;

    $row.find(".gstAmt").text(gstAmt.toFixed(2));
    $row.find(".totalPrice").text(afterDisc.toFixed(2));
    $row.find(".totalAmt").text(total.toFixed(2));
  }

  function recalcNet() {
    let net = 0;
    $("#medicineContainer .med-row").each(function () {
      const total = parseFloat($(this).find(".totalAmt").text() || 0);
      net += total;
    });
    $(".footer-bar .total").text(`Net Amount: ₹${net.toFixed(2)}`);
  }

  // Add medicine
  $("#addMedicine").on("click", function () {
    medRowCount++;
    $("#medicineContainer").append(createMedicineRow(medRowCount));
    renumberRows();
  });

  // Delete medicine
  $("#medicineContainer").on("click", ".deleteRow", function () {
    $(this).closest(".med-row").remove();
    renumberRows();
    recalcNet();
  });

  // Copy row (duplicates same selections/inputs)
  $("#medicineContainer").on("click", ".copyRow", function () {
    const $src = $(this).closest(".med-row");
    medRowCount++;
    const $new = $(createMedicineRow(medRowCount));

    // Copy values
    $new.find(".product").val($src.find(".product").val()).trigger("change");
    $new.find(".company").val($src.find(".company").val());
    $new.find(".weight").val($src.find(".weight").val());
    $new.find(".hsnGst").val($src.find(".hsnGst").val());
    $new.find(".batch").html($src.find(".batch").html()).val($src.find(".batch").val());
    $new.find(".exp").val($src.find(".exp").val());
    $new.find(".mrp").val($src.find(".mrp").val());
    $new.find(".saleRate").val($src.find(".saleRate").val());
    $new.find(".disc").val($src.find(".disc").val());
    $new.find(".qty").val($src.find(".qty").val());

    $("#medicineContainer").append($new);
    renumberRows();
    recalcRow($new);
    recalcNet();
  });

  // On product change: autofill company/weight/hsn and batches
  $("#medicineContainer").on("change", ".product", function () {
    const $row = $(this).closest(".med-row");
    const pid = $(this).val();
    const p = products.find(x => x.id === pid);

    $row.find(".batch").html(batchOptions(pid));

    if (p) {
      $row.find(".company").val(p.company);
      $row.find(".weight").val(p.weight);
      $row.find(".hsnGst").val(`${p.hsn} (${p.gst}%)`);
      $row.find(".mrp").val(p.mrp.toFixed(2));

      // If saleRate empty, start with mrp
      if (!($row.find(".saleRate").val())) {
        $row.find(".saleRate").val(p.mrp.toFixed(2));
      }
    } else {
      $row.find(".company,.weight,.hsnGst,.mrp,.saleRate").val("");
    }

    recalcRow($row);
    recalcNet();
  });

  // Recalc on pricing changes
  $("#medicineContainer").on("input", ".qty,.saleRate,.disc,.hsnGst", function () {
    const $row = $(this).closest(".med-row");
    recalcRow($row);
    recalcNet();
  });

});
$(document).ready(function () {

  /* -----------------------------------------
   * Last 5 Transactions Store (in memory + optional localStorage)
   * ----------------------------------------- */
  const STORAGE_KEY = "last5MedicineTxns";

  function loadTxns() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveTxns(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  let lastTxns = loadTxns();

  /* -----------------------------------------
   * Helpers
   * ----------------------------------------- */

  function nowDateTimeString() {
    const d = new Date();
    // Example: 06-Feb-2026 12:15 PM
    const dd = String(d.getDate()).padStart(2, "0");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const mon = months[d.getMonth()];
    const yyyy = d.getFullYear();

    let hh = d.getHours();
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ampm = hh >= 12 ? "PM" : "AM";
    hh = hh % 12; hh = hh ? hh : 12;

    return `${dd}-${mon}-${yyyy} ${hh}:${mm} ${ampm}`;
  }

  function parseNetAmount() {
    // expects: "Net Amount: ₹123.45"
    const txt = $(".footer-bar .total").text() || "";
    const num = txt.replace(/[^0-9.]/g, "");
    return parseFloat(num || "0");
  }

  function safeText(selector, fallback="-") {
    const t = $(selector).text().trim();
    return t ? t : fallback;
  }

  function generateInvoiceNo() {
    // Simple unique invoice: INV-YYYYMMDD-HHMMSS
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `INV-${y}${m}${day}-${hh}${mm}${ss}`;
  }

  function getStoreName() {
    // If you have store name in UI somewhere, read it from there.
    // For now hardcode:
    return "RGHS Pharmacy";
  }

  function renderLast5Table() {
    const $tbody = $("#preMedTableBody");
    $tbody.empty();

    lastTxns.slice(0, 5).forEach((t, idx) => {
      const tr = `
        <tr>
          <td>${idx + 1}</td>
          <td>${t.storeName}</td>
          <td>${t.invoiceNo}</td>
          <td>${t.dateTime}</td>
          <td>₹${t.amount.toFixed(2)}</td>
          <td>${t.rghsCardNo}</td>
          <td>${t.patientName}</td>
          <td>${t.mobileNo}</td>
          <td>
            <button class="btn small primary viewInvoice" data-invoice="${t.invoiceNo}">
              View
            </button>
          </td>
        </tr>
      `;
      $tbody.append(tr);
    });
  }

  /* -----------------------------------------
   * CONFIRM SALE -> Add to Last 5 Transactions
   * ----------------------------------------- */
  $("#btnConfirmSale").on("click", function () {

    // 1) Validate at least 1 medicine row exists
    const medicineRowsCount =
      $("#medicineContainer .med-row").length || // for two-panel layout
      $("#medicineTbody tr").length ||           // if table layout
      0;

    if (medicineRowsCount === 0) {
      alert("Please add at least one medicine before confirming sale.");
      return;
    }

    // 2) Collect required details
    const amount = parseNetAmount();
    if (!amount || amount <= 0) {
      alert("Net Amount is 0. Please enter Quantity and Sale Rate.");
      return;
    }

    const txn = {
      storeName: getStoreName(),
      invoiceNo: generateInvoiceNo(),
      dateTime: nowDateTimeString(),
      amount: amount,
      rghsCardNo: safeText("#rghsNo", "-"),
      patientName: safeText("#patientname", "-"),
      mobileNo: safeText("#mobile", "-"),
      tid: ($("#tidInput").val() || "").trim()
    };

    // 3) Insert into top and keep last 5
    lastTxns.unshift(txn);
    lastTxns = lastTxns.slice(0, 5);

    // 4) Persist + render
    saveTxns(lastTxns);
    renderLast5Table();

    // 5) Optional: clear medicine rows after sale
    // Uncomment if you want to reset:
    // $("#medicineContainer").empty();
    // $("#medicineTbody").empty();
    // $(".footer-bar .total").text("Net Amount: ₹0.00");

    alert(`Sale Confirmed!\nInvoice: ${txn.invoiceNo}`);
  });

  /* -----------------------------------------
   * View Invoice action (demo)
   * Replace with your real invoice page/modal
   * ----------------------------------------- */
  $("#preMedTableBody").on("click", ".viewInvoice", function () {
    const inv = $(this).data("invoice");
    const found = lastTxns.find(x => x.invoiceNo === inv);

    if (!found) return;

    alert(
      `Invoice: ${found.invoiceNo}\n` +
      `Store: ${found.storeName}\n` +
      `Date: ${found.dateTime}\n` +
      `Amount: ₹${found.amount.toFixed(2)}\n` +
      `RGHS: ${found.rghsCardNo}\n` +
      `Patient: ${found.patientName}\n` +
      `Mobile: ${found.mobileNo}\n` +
      `TID: ${found.tid}`
    );
  });

  // Render existing txns on load (from localStorage)
  renderLast5Table();

});
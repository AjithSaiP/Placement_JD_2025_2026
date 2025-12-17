<script>
let ctcAsc = false;

function parseCTC(text) {
  text = text.toLowerCase();
  if (text.includes("not")) return -1;

  // extract numeric value (e.g., 15.0 from "15.0 LPA")
  let m = text.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : -1;
}

function sortCTC() {
  const tbody = document.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const aVal = parseCTC(a.children[2].innerText);
    const bVal = parseCTC(b.children[2].innerText);

    // push "Not specified" to bottom
    if (aVal === -1 && bVal === -1) return 0;
    if (aVal === -1) return 1;
    if (bVal === -1) return -1;

    return ctcAsc ? aVal - bVal : bVal - aVal;
  });

  ctcAsc = !ctcAsc;
  rows.forEach(r => tbody.appendChild(r));
}
</script>

async function fetchAPIs() {
  const res = await fetch("/api");
  const data = await res.json();
  return Object.keys(data.endpoints || {});
}

document.addEventListener("DOMContentLoaded", async () => {
  const search = document.getElementById("search");
  const results = document.getElementById("results");
  const endpoints = await fetchAPIs();

  function render(list) {
    results.innerHTML = "";
    list.forEach(ep => {
      const li = document.createElement("li");
      li.textContent = ep;
      li.onclick = () => window.open(ep, "_blank");
      results.appendChild(li);
    });
  }

  render(endpoints);

  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();
    const filtered = endpoints.filter(ep => ep.toLowerCase().includes(term));
    render(filtered);
  });
});

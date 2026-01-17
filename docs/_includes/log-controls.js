<script>
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const logEntries = document.querySelectorAll('.log-entry');
  const activeSection = document.querySelector('h2:first-of-type').parentElement;
  const plannedSection = document.querySelector('h2:last-of-type').parentElement;

  function filterEntries() {
    const query = searchInput.value.toLowerCase();
    logEntries.forEach(entry => {
      const text = entry.textContent.toLowerCase();
      entry.style.display = text.includes(query) ? '' : 'none';
    });
  }

  function sortEntries() {
    const sortBy = sortSelect.value;
    const entriesArray = Array.from(logEntries);

    entriesArray.sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
      } else if (sortBy === 'date-asc') {
        return new Date(a.dataset.date) - new Date(b.dataset.date);
      } else if (sortBy === 'status') {
        return a.dataset.status.localeCompare(b.dataset.status);
      }
      return 0;
    });

    // Clear sections and re-append sorted entries
    const activeHeader = activeSection.querySelector('h2');
    const plannedHeader = plannedSection.querySelector('h2');

    // Clear existing entries but keep headers
    activeSection.innerHTML = '';
    activeSection.appendChild(activeHeader);
    activeSection.innerHTML += '<hr>';

    plannedSection.innerHTML = '';
    plannedSection.appendChild(plannedHeader);
    plannedSection.innerHTML += '<hr>';

    entriesArray.forEach(entry => {
      if (entry.dataset.status === 'resolved') {
        activeSection.appendChild(entry);
      } else {
        plannedSection.appendChild(entry);
      }
    });
  }

  if (searchInput && sortSelect) {
    searchInput.addEventListener('input', filterEntries);
    sortSelect.addEventListener('change', sortEntries);

    // Initial sort
    sortEntries();
  } else {
    console.error('Search or sort controls not found');
  }
});
</script>
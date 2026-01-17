[← Back to Home](index.md)

# Maintenance Log

This page documents issues, problems, and maintenance activities that occur during the operation of the home lab. Each entry includes the date, problem description, diagnosis steps, resolution, and any follow-up notes.

**Sorting:** Entries are maintained in reverse chronological order (newest first) to keep recent issues and activities at the top for quick reference.

<!-- Interactive Controls -->
<div id="log-controls" style="margin: 20px 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
  <input type="text" id="search-input" placeholder="Search logs..." style="margin-right: 10px; padding: 8px; border: 1px solid #ccc; border-radius: 3px; width: 200px;">
  <select id="sort-select" style="padding: 8px; border: 1px solid #ccc; border-radius: 3px;">
    <option value="date-desc">Newest First</option>
    <option value="date-asc">Oldest First</option>
    <option value="status">By Status</option>
  </select>
</div>

## Active Issues & Recent Resolutions

---

{% assign active_logs = site.data.maintenance-logs | where: "category", "active" %}
{% for log in active_logs %}
<div class="log-entry" data-date="{{ log.date }}" data-status="{{ log.status }}">
## {{ log.date | date: "%B %d, %Y" }} - {{ log.title }}

{% if log.problem_description %}
### Problem Description
{{ log.problem_description }}
{% endif %}

{% if log.diagnosis_steps %}
### Diagnosis Steps
{{ log.diagnosis_steps | markdownify }}
{% endif %}

{% if log.resolution %}
### Resolution
{{ log.resolution | markdownify }}
{% endif %}

{% if log.follow_up_notes %}
### Follow-up Notes
{{ log.follow_up_notes | markdownify }}
{% endif %}
</div>
{% endfor %}

## Planned Maintenance & Setups

---

{% assign planned_logs = site.data.maintenance-logs | where: "category", "planned" %}
{% for log in planned_logs %}
<div class="log-entry" data-date="{{ log.date }}" data-status="{{ log.status }}">
## {{ log.date | date: "%B %d, %Y" }} - {{ log.title }}

{% if log.description %}
### Description
{{ log.description }}
{% endif %}

{% if log.planned_setup_steps %}
### Planned Setup Steps
{{ log.planned_setup_steps | markdownify }}
{% endif %}

{% if log.status_detail %}
### Status
{{ log.status_detail }}
{% endif %}

{% if log.notes %}
### Notes
{{ log.notes | markdownify }}
{% endif %}
</div>
{% endfor %}

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
    activeSection.innerHTML = '<h2>Active Issues & Recent Resolutions</h2><hr>';
    plannedSection.innerHTML = '<h2>Planned Maintenance & Setups</h2><hr>';
    
    entriesArray.forEach(entry => {
      if (entry.dataset.status === 'resolved') {
        activeSection.appendChild(entry);
      } else {
        plannedSection.appendChild(entry);
      }
    });
  }

  searchInput.addEventListener('input', filterEntries);
  sortSelect.addEventListener('change', sortEntries);
  
  // Initial sort
  sortEntries();
});
</script>
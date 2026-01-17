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

<style>
.markdown-content code {
  background-color: #f4f4f4;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}

.markdown-content pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 3px;
  overflow-x: auto;
  margin: 10px 0;
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
}
</style>

## Active Issues & Recent Resolutions

---

{% assign active_logs = site.data.maintenance-logs | where: "category", "active" %}
{% for log in active_logs %}
<div class="log-entry" data-date="{{ log.date }}" data-status="{{ log.status }}">
<h2>{{ log.date | date: "%B %d, %Y" }} - {{ log.title }}</h2>

{% if log.problem_description %}
<h3>Problem Description</h3>
<p>{{ log.problem_description }}</p>
{% endif %}

{% if log.diagnosis_steps %}
<h3>Diagnosis Steps</h3>
<div class="markdown-content">{{ log.diagnosis_steps }}</div>
{% endif %}

{% if log.resolution %}
<h3>Resolution</h3>
<div class="markdown-content">{{ log.resolution }}</div>
{% endif %}

{% if log.follow_up_notes %}
<h3>Follow-up Notes</h3>
<div class="markdown-content">{{ log.follow_up_notes }}</div>
{% endif %}
</div>
{% endfor %}

## Planned Maintenance & Setups

---

{% assign planned_logs = site.data.maintenance-logs | where: "category", "planned" %}
{% for log in planned_logs %}
<div class="log-entry" data-date="{{ log.date }}" data-status="{{ log.status }}">
<h2>{{ log.date | date: "%B %d, %Y" }} - {{ log.title }}</h2>

{% if log.description %}
<h3>Description</h3>
<p>{{ log.description }}</p>
{% endif %}

{% if log.planned_setup_steps %}
<h3>Planned Setup Steps</h3>
<div class="markdown-content">{{ log.planned_setup_steps }}</div>
{% endif %}

{% if log.status_detail %}
<h3>Status</h3>
<p>{{ log.status_detail }}</p>
{% endif %}

{% if log.notes %}
<h3>Notes</h3>
<div class="markdown-content">{{ log.notes }}</div>
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

  // Debug: Check if elements exist
  console.log('Search input:', searchInput);
  console.log('Sort select:', sortSelect);
  console.log('Log entries:', logEntries.length);

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
    
    // Process markdown content
    processMarkdownContent();
  } else {
    console.error('Search or sort controls not found');
  }
});

// Simple markdown processor for code blocks and basic formatting
function processMarkdownContent() {
  const markdownElements = document.querySelectorAll('.markdown-content');
  markdownElements.forEach(element => {
    let html = element.textContent;
    
    // Convert code blocks
    html = html.replace(/```bash\n([\s\S]*?)\n```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/```([\s\S]*?)\n```/g, '<pre><code>$1</code></pre>');
    
    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Convert bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Convert line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    
    // Wrap in paragraph if not already
    if (!html.startsWith('<p>') && !html.startsWith('<pre>')) {
      html = '<p>' + html + '</p>';
    }
    
    element.innerHTML = html;
  });
}
</script>
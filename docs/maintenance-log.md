[← Back to Home](index.md)

# Maintenance Log

This page documents issues, problems, and maintenance activities that occur during the operation of the home lab. Each entry includes the date, problem description, diagnosis steps, resolution, and any follow-up notes.

**Sorting:** Entries are maintained in reverse chronological order (newest first) to keep recent issues and activities at the top for quick reference.

{% include log-controls.html %}
{% include log-controls.js %}

<style>
.log-entry div {
  white-space: pre-line;
  line-height: 1.6;
}

.log-entry div code {
  background-color: #f4f4f4;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}

.log-entry div pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 3px;
  overflow-x: auto;
  margin: 10px 0;
  white-space: pre;
}

.log-entry div pre code {
  background-color: transparent;
  padding: 0;
}

.log-entry div strong {
  font-weight: bold;
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
<div>{{ log.problem_description }}</div>
{% endif %}

{% if log.diagnosis_steps %}
<h3>Diagnosis Steps</h3>
<div>{{ log.diagnosis_steps }}</div>
{% endif %}

{% if log.resolution %}
<h3>Resolution</h3>
<div>{{ log.resolution }}</div>
{% endif %}

{% if log.follow_up_notes %}
<h3>Follow-up Notes</h3>
<div>{{ log.follow_up_notes }}</div>
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
<div>{{ log.planned_setup_steps }}</div>
{% endif %}

{% if log.status_detail %}
<h3>Status</h3>
<div>{{ log.status_detail }}</div>
{% endif %}

{% if log.notes %}
<h3>Notes</h3>
<div>{{ log.notes | markdownify }}</div>
{% endif %}
</div>
{% endfor %}

{% include log-controls.js %}
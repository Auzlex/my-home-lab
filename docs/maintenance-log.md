---
layout: default
title: Maintenance Log
---

<style>
.log-entry {
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.log-entry h2 {
  margin-top: 0;
}

.log-entry pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 3px;
  overflow-x: auto;
}

.log-entry code {
  background-color: #f4f4f4;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}

.log-entry strong {
  font-weight: bold;
}
</style>

[← Back to Home](index.md)

# Maintenance Log

This page documents issues, problems, and maintenance activities that occur during the operation of the home lab. Each entry includes the date, problem description, diagnosis steps, resolution, and follow-up notes.

**Sorting:** Entries are maintained in reverse chronological order (newest first).

{% include log-controls.html %}
{% include log-controls.js %}

## Active Issues & Recent Resolutions

---

{% assign active_logs = site.data.maintenance-logs | where: "category", "active" %}
{% for log in active_logs %}
<div class="log-entry" data-date="{{ log.date }}" data-status="{{ log.status }}">
  <h2>{{ log.date | date: "%B %d, %Y" }} - {{ log.title }}</h2>

  {% if log.problem_description %}
  <h3>Problem Description</h3>
  <div>{{ log.problem_description | markdownify }}</div>
  {% endif %}

  {% if log.diagnosis_steps %}
  <h3>Diagnosis Steps</h3>
  <div>{{ log.diagnosis_steps | markdownify }}</div>
  {% endif %}

  {% if log.resolution %}
  <h3>Resolution</h3>
  <div>{{ log.resolution | markdownify }}</div>
  {% endif %}

  {% if log.follow_up_notes %}
  <h3>Follow-up Notes</h3>
  <ul>
    {% for note in log.follow_up_notes | split: "\n" %}
    <li>{{ note }}</li>
    {% endfor %}
  </ul>
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
  <div>{{ log.description | markdownify }}</div>
  {% endif %}

  {% if log.planned_setup_steps %}
  <h3>Planned Setup Steps</h3>
  <div>{{ log.planned_setup_steps | markdownify }}</div>
  {% endif %}

  {% if log.status_detail %}
  <h3>Status</h3>
  <div>{{ log.status_detail | markdownify }}</div>
  {% endif %}

  {% if log.notes %}
  <h3>Notes</h3>
  <ul>
    {% for note in log.notes | split: "\n" %}
    <li>{{ note }}</li>
    {% endfor %}
  </ul>
  {% endif %}
</div>
{% endfor %}

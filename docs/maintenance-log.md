
{% include maintenance-log.html %}

[← Back to Home](index.md)

# Maintenance Log

This page documents issues, problems, and maintenance activities that occur during the operation of the home lab. Each entry includes the date, problem description, diagnosis steps, resolution, and follow-up notes.

---

{% assign all_logs = site.data.maintenance-logs | sort: "date" | reverse %}
{% for log in all_logs %}
<div class="log-entry">
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

  {% if log.follow_up_notes %}
<h3>Follow-up Notes</h3>
<ul>
  {% for note in log.follow_up_notes %}
    <li>{{ note }}</li>
  {% endfor %}
</ul>
{% endif %}

  
</div>
{% endfor %}

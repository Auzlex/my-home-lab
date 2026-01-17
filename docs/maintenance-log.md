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

<div class="log-entry" data-date="2026-01-17" data-status="resolved">
## January 17, 2026 - LORIC WiFi Connection Issue

### Problem Description
LORIC (Raspberry Pi 3 B+ orchestration node) did not respond after a reboot this morning. The device was unreachable over the network.

### Diagnosis Steps
Connected Ethernet cable directly to LORIC to establish connectivity and investigate:

1. Checked network interfaces:
   ```bash
   ip a
   ```

2. Examined wireless interface status:
   ```bash
   ifconfig wlan0
   ```

**Findings:** The Raspberry Pi configuration had forgotten the WiFi network SSID and had no active wireless connection.

### Resolution
Reconfigured WiFi settings using the Raspberry Pi configuration tool:
```bash
sudo raspi-config
```

Navigation steps:
- Select **System Options** > **Wireless LAN**
- Enter the correct SSID and passphrase
- Save and exit raspi-config
- Reboot the device

LORIC successfully reconnected to the network and resumed normal operation.

### Follow-up Notes
- Monitor LORIC's WiFi stability in the coming weeks
- Check if this issue affects other Raspberry Pi devices (CASPER, AUREL)
- Consider implementing more robust WiFi configuration or fallback to Ethernet for critical nodes
- Investigate potential causes: power fluctuations, configuration corruption, or hardware issues
</div>

## Planned Maintenance & Setups

---

<div class="log-entry" data-date="2026-01-17" data-status="planned">
## January 17, 2026 - ENLIL Pi-hole Setup (Planned)

### Description
ENLIL is a dedicated Raspberry Pi device intended to run Pi-hole, a network-wide ad blocker and DNS sinkhole. This will provide network-level ad blocking and improve privacy across all devices in the home lab network.

### Planned Setup Steps
1. **Initial Setup**
   - Flash Raspberry Pi OS Lite to SD card
   - Configure hostname as "ENLIL"
   - Set static IP address in home network range
   - Enable SSH and update system

2. **Pi-hole Installation**
   ```bash
   curl -sSL https://install.pi-hole.net | bash
   ```

3. **Configuration**
   - Set upstream DNS servers (Cloudflare, Google, or local)
   - Configure DHCP settings if needed
   - Set up admin interface password
   - Enable web interface

4. **Network Integration**
   - Update router DNS settings to point to ENLIL's IP
   - Test ad blocking functionality
   - Configure device whitelisting if needed

### Status
**TODO** - Setup not yet completed. Hardware prepared but software installation pending.

### Notes
- ENLIL will serve as the primary DNS server for the home lab
- Consider backup DNS configuration for redundancy
- Monitor network performance impact after deployment
</div>

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
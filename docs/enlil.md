[← Back to Home](index.md)

## ENLIL – Network Services Node (Pi-hole)

* **Hostname:** ENLIL
* **IP Address:** 192.168.1.125 **(STATIC)**
* **Architecture:** ARMv6 (Raspberry Pi 1 Model B)

### Purpose

**ENLIL** acts as a dedicated **network services node** within the home-lab infrastructure.
It runs Pi-hole, providing network-wide ad blocking, DNS sinkholing, and improved privacy
across all devices on the home network.

### Current Status

Pi-hole is **up and running** and actively filtering traffic.

* **Total domains on blocklists:** 261,914
* **Total queries:** 6,563
* **Blocked queries:** 1,420
* **Percentage blocked:** 21.6%

### Blocklists Configuration

Blocklists were sourced from **Firebog**:
https://firebog.net/

For each category, **two lists** were selected and applied, followed by a manual **Gravity Update**
via the Pi-hole web interface.

Categories in use:

* Suspicious Lists
* Advertising Lists
* Tracking and Telemetry Lists
* Malicious Lists

Additional manual blocking:

* Facebook domains

General guidance followed: **less is better**. Lists were kept minimal to reduce false positives
while maintaining effective filtering, based on community recommendations from other Pi-hole users.

### DNS Configuration

* **Primary upstream DNS:** Cloudflare (temporary)

### Role in the Home Lab System

* Provides network-wide ad blocking and DNS services
* Acts as primary DNS server for the home network
* Hosts web interface for Pi-hole administration
* Improves privacy and reduces unnecessary network traffic
* Serves as centralized network filtering solution

---

## Next Steps

- Long-term DNS strategy review
- Ongoing monitoring and tuning
- Security hardening

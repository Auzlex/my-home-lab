[← Back to Home](index.md)

# ENLIL – Local DNS Resolver (Pi-hole)

* **Hostname:** ENLIL
* **IP Address:** 192.168.1.125 **(STATIC)**
* **Architecture:** ARMv6 (Raspberry Pi 1 Model B)

## Purpose

**ENLIL** acts as a dedicated **network services node** within the home-lab infrastructure.
It runs Pi-hole, providing network-wide ad blocking, DNS sinkholing, and improved privacy
across all devices on the home network.

---

## System Information

### Kernel / OS

* Kernel: 6.12.62+rpt-rpi-v6
* Build: #1 SMP PREEMPT Debian 1:6.12.62-1+rpt1 (2025-12-18)
* Architecture: armv6l
* Distro: Debian (Raspberry Pi variant)

### SSH Stack

* OpenSSH: OpenSSH_10.0p2 Raspbian-7
* OpenSSL: 3.5.4 (30 Sep 2025)

### Pi-hole

* Pi-Hole: v6.3

---

## Role In The Lab

* Provides network-wide ad blocking and DNS services
* Acts as primary DNS server for the home network
* Hosts web interface for Pi-hole administration
* Improves privacy and reduces unnecessary network traffic
* Serves as centralized network filtering solution

---

## Current Status

Pi-hole is up and running and actively filtering traffic.

Information here is from **2026-01-18** to **2026-01-19**:

* **Total domains on blocklists:** 261,914
* **Total queries:** 6,563
* **Blocked queries:** 1,420
* **Percentage blocked:** 21.6%

---

## Blocklists Configuration

Blocklists were sourced from [Firebog](https://firebog.net/).

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

---

## DNS Configuration

* **Primary upstream DNS:** Cloudflare

---

## Notes

* Long-term DNS strategy review
* Ongoing monitoring and tuning
* Security hardening

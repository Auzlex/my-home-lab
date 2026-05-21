
[← Back to Home](index.md)

# CASPER - Gitea Server & Network Attached Storage

* **Hostname:** CASPER
* **IPv4 Address:** 192.168.1.124 **(STATIC)**
* **IPv6 Address:** 2a00:23c7:593:6501:ba27:ebff:fe0f:e3f2 **(STATIC)**
* **Assigned IPv4 DNS:** 192.168.1.124 (**Itself - Pi-hole**)
* **Assigned IPv6 DNS:** 2a00:23c7:593:6501:ba27:ebff:fe0f:e3f2 (**Itself - Pi-hole**)
* **Architecture:** x86-64 (OpenMediaVault Server)

## Purpose

**CASPER** serves as the central **Gitea server** within the home-lab and CI/CD infrastructure. It hosts all repositories, manages user authentication, and provides the web interface for code collaboration. Additionally, it tracks job status and logs through Gitea's integration with CI/CD runners, and now handles its own tasks via a local runner (`casper-runner`).

**CASPER** is running [OpenMediaVault](https://www.openmediavault.org/) which is a networked attached storage solution based on Debian linux, it contains useful services that I require such as SMB and docker. A docker compose is setup and includes Pi-hole for DNS, Gitea for Git hosting, Navidrome for music streaming, and PostgreSQL as the database backend. It also runs Tailscale to securely connect to the Headscale control plane on my VPS. The system utilizes a main ZFS pool consisting of two 4TB HDDs for data storage and a secondary ZFS pool (`casper-buffer`) with two 1TB HDDs, while the OS runs on a 256GB NVMe SSD for optimal performance.

* Hosts Git repositories for all projects.
* Provides web UI for repository management and collaboration.
* Tracks CI/CD job statuses and logs via Gitea Actions.
* Manages user authentication and access control.
* Serves as the central hub for workflow orchestration.

---

## System Information

### Hardware

* **CPU:** AMD Ryzen 1700 on AM4 (Upgraded from AMD A10-7700K, repurposed old hardware)
* **RAM:** 16GB DDR4 (Upgraded from 8GB DDR3)

### Kernel / OS

* **OS:** OpenMediaVault 8 (Upgraded from OMV7)
* **Kernel:** Linux 6.17.13-10-pve (Proxmox Kernel) — used for robust, native ZFS support.

### Storage Configuration

* **OS Drive:** 256GB NVMe SSD (Upgraded from 128GB SATA SSD).
* **Data Pool (Main):** ZFS RAID-1 with 2x 4TB HDDs.
* **Data Pool (casper-buffer):** ZFS pool with 2x 1TB HDDs.
* **Docker Volumes:** Persistent storage for Gitea and PostgreSQL data.

---

## Services & Packages Running

* **Pi-hole** – Network-wide ad blocking and local DNS.
* **Navidrome** – Self-hosted music streaming server.
* **Gitea** – Self-hosted Git service with CI/CD capabilities.
* **Gitea Runner (casper-runner)** – Handles all CI/CD tasks locally, leveraging the new hardware.
* **Tailscale** – Secure mesh VPN connecting CASPER to the Headscale VPS.
* **PostgreSQL** – Database for Gitea data persistence.
* **Docker Engine** – Container runtime for service isolation.
* **OpenMediaVault** – NAS management interface.
* **ZFS** – Filesystem for data storage and redundancy.

---

## Network Role

* Accessible on the local network via HTTP/HTTPS.
* Provides API endpoints for its local CI/CD runner (casper-runner).
* Hosts the main web interface for repository access.
* Internal-facing service with secure authentication.

---

## Notes

* Nothing to note.

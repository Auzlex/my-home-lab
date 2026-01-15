<link rel="icon" href="favicon.ico">

[← Back to Home](index.md)

# CASPER - Central Gitea Server

* **Hostname:** CASPER
* **IP Address:** 192.168.1.124 **(STATIC)**
* **Architecture:** x86-64 (OpenMediaVault Server)

### Purpose

**CASPER** serves as the central **Gitea server** within the home-lab CI/CD infrastructure. It hosts all repositories, manages user authentication, and provides the web interface for code collaboration. Additionally, it tracks job status and logs through Gitea's integration with CI/CD runners.

CASPER is built on an OpenMediaVault-based system running a Docker Compose setup that includes Traefik as a reverse proxy, Gitea for Git hosting, and PostgreSQL as the database backend. The system utilizes a ZFS pool consisting of two 4TB HDDs for data storage, while the OS runs on a 128GB SATA SSD for optimal performance.

### Role in the CI/CD System

* Hosts Git repositories for all projects
* Provides web UI for repository management and collaboration
* Tracks CI/CD job statuses and logs via Gitea Actions
* Manages user authentication and access control
* Serves as the central hub for workflow orchestration

### Services & Packages Running

* **Traefik** – Reverse proxy and load balancer for secure access
* **Gitea** – Self-hosted Git service with CI/CD capabilities
* **PostgreSQL** – Database for Gitea data persistence
* **Docker Engine** – Container runtime for service isolation
* **OpenMediaVault** – NAS management interface
* **ZFS** – Filesystem for data storage and redundancy

### Network Role

* Accessible on the local network via HTTP/HTTPS (through Traefik)
* Provides API endpoints for CI/CD runners (LORIC)
* Hosts the main web interface for repository access
* Internal-facing service with secure authentication

### Storage Configuration

* **OS Drive:** 128GB SATA SSD
* **Data Pool:** ZFS RAID-1 with 2x 4TB HDDs
* **Docker Volumes:** Persistent storage for Gitea and PostgreSQL data
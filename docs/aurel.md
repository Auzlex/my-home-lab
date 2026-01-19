
[← Back to Home](index.md)

# AUREL – Worker Node

* **Hostname:** AUREL
* **IP Address:** 192.168.1.123 **(STATIC)**
* **Architecture:** ARMv7 (Raspberry Pi 3 B+)

## Purpose

**AUREL** acts as a dedicated **worker** within the home-lab CI/CD infrastructure.
It is responsible for executing all heavy build and test workloads, keeping orchestration
and scheduling separate using docker context or manually setup SSH commands.

---

## System Information

### Kernel / OS

* Kernel: 6.12.62+rpt-rpi-v8
* Build: #1 SMP PREEMPT Debian 1:6.12.62-1+rpt1 (2025-12-18)
* Architecture: aarch64
* Distro: Debian (Raspberry Pi variant)

### SSH Stack

* OpenSSH: OpenSSH_10.0p2 Debian-7
* OpenSSL: 3.5.4 (30 Sep 2025)

### Docker

* Docker Engine: 26.1.5+dfsg1
* Build: a72d7cd

---

## Role In The Lab

* Executes Docker builds and test jobs.
* Runs ARM-native workloads.
* Acts as a remote Docker host.
* Receives jobs indirectly from LORIC via SSH or Docker context over SSH.

---

## Services & Packages Running

* **Docker Engine** – container builds and test execution.
* **OpenSSH Server** – secure remote job execution.
* **Git** – source code checkout.
* **Build tools** – `build-essential` for native compilation.
* **System utilities** – `curl`, `jq`, `ca-certificates`.

---

## Setup Steps

We will create a user ci which will be used for build related workloads and for isolation. This user will recieve remote jobs or commands via SSH from LORIC.

**AUREL** was setup using the following steps and instructions:

### 1. Install Docker

```bash
auzlex@LORIC:~ $ sudo apt update && sudo apt install -y docker.io docker-compose && sudo systemctl enable docker --now
```

* Docker is used to run any containerized jobs dispatched from **LORIC**.

### 2. Setup SSH For Isolated CI user

This user account will be used to run ssh commands dispatched by **LORIC**. To maintain isolation.

1. Create user with password and set shell (choose a strong password, record it for SSH key setup):

```bash
sudo useradd -m -s /bin/bash ci
sudo passwd ci
```

2. Add user to Docker group:

```bash
sudo usermod -aG docker ci
```

3. Verify membership:

```bash
getent group docker | grep ci
```

4. Enable SSH access:

```bash
sudo systemctl enable ssh && sudo systemctl start ssh
```

5. Generate SSH key for passwordless login from LORIC:

```bash
sudo -u ci ssh-keygen -t ed25519 -C "ci@AUREL" -f /home/ci/.ssh/id_ed25519
```

* Copy the public key to LORIC runner or other orchestrator nodes for secure job execution.

6. Test SSH login (password initially, then test key-based auth):

```bash
ssh ci@192.168.1.123
```

7. Verify home directory ownership:

```bash
ls -ld /home/ci
```

---

## Notes

* Accessible on the local network via SSH.
* Does not expose public services.
* Docker is the main execution environment for all workloads, ensure it remains updated.
* All jobs are executed under `ci` to maintain isolation.
* For troubleshooting, check logs in `/var/log/syslog` or use `journalctl -u ssh` for SSH issues.
* Any workspace directories must remain owned by `ci` for correct job permissions.

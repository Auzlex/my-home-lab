[← Back to Home](index.md)

## AUREL – Execution Node (Docker)

**Hostname:** AUREL
**IP Address:** 192.168.1.123 **(STATIC)**
**Architecture:** ARMv7 (Raspberry Pi 3 B+)

### Purpose

**AUREL** acts as a dedicated **CI build worker** within the home-lab CI/CD infrastructure.
It is responsible for executing all heavy build and test workloads, keeping orchestration
and scheduling separate from execution.

---

### Role in the CI/CD System

* Executes Docker builds and test jobs
* Runs ARM-native workloads
* Acts as a remote Docker host
* Receives jobs indirectly from the CI runner on LORIC via SSH or Docker context
* Provides build isolation from the CI orchestrator

---

### Services & Packages Running

* **Docker Engine** – container builds and test execution
* **OpenSSH Server** – secure remote job execution
* **Git** – source code checkout
* **Build tools** – `build-essential` for native compilation
* **System utilities** – `curl`, `jq`, `ca-certificates`

---

### Network Role

* Accessible on the local network via SSH
* Used as a remote Docker context by LORIC
* Does not expose public services
* Internal-only build execution node

---

## AUREL – CI User Setup Notes

**User:** ci

### Purpose

* Dedicated CI user for build/workload isolation
* Runs Docker commands
* Receives remote jobs via SSH from LORIC

### Setup Steps Verified for Raspberry Pi OS

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

* Copy the public key to LORIC runner or other orchestrator nodes for secure job execution

6. Test SSH login (password initially, then test key-based auth):

```bash
ssh ci@192.168.1.123
```

7. Verify home directory ownership:

```bash
ls -ld /home/ci
```

8. Prepare CI workspace ownership:

```bash
sudo mkdir -p /srv/ci && sudo chown -R ci:ci /srv/ci
```

### Notes

* Ensure SSH key is generated for `ci` to allow LORIC to execute jobs without prompting for a password
* Password must be set initially for key setup
* Workspace `/srv/ci` should be owned by `ci` for proper job isolation
* No sudo access is required unless a workflow explicitly needs it

---

### Summary

AUREL is a locked-down, ARM-based Docker worker node designed for CI workloads.
It performs all compute-heavy tasks while remaining fully controlled by the CI runner on LORIC,
demonstrating clean separation of responsibilities in a distributed CI/CD architecture.
Proper SSH key setup and password management ensure secure, passwordless job execution.

---

## AUREL – Additional Setup Notes

* Docker is the main execution environment for all workloads, ensure it remains updated.
* SSH access must be tested after every OS update.
* All jobs are executed under `ci` to maintain isolation.
* For troubleshooting, check logs in `/var/log/syslog` or use `journalctl -u ssh` for SSH issues.
* Any workspace directories must remain owned by `ci` for correct job permissions.

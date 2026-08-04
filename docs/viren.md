
[← Back to Home](index.md)

# VIREN – OVH VPS / Reverse Proxy & Web Frontend Host

* **Hostname:** VIREN
* **Provider:** OVH
* **IPv4 Address:** `[REDACTED]` **(STATIC)**
* **IPv6 Address:** `[REDACTED]` **(STATIC)**
* **Architecture:** x86-64
* **OS:** Linux (x86-64)

## Purpose

**VIREN** is a cloud-hosted VPS provided by OVH, serving as the public-facing entry point into the home-lab infrastructure. It acts as the **reverse proxy and authorization gateway** for services hosted on the internal **CASPER** machine, forwarding authenticated traffic over the secure **Tailscale/Headscale** mesh network.

In addition to proxying, VIREN hosts **web-based frontends and portfolio services** directly, making them accessible on the public internet without exposing the home network's IP or infrastructure.

* Acts as the **Headscale** control plane, managing the Tailscale mesh that connects VIREN to CASPER and other nodes.
* Provides reverse proxy routing to services running on CASPER via the Tailscale tunnel.
* Handles **authorization / authentication** at the edge before traffic reaches internal services (ACRO integration layer).
* Hosts **public-facing web frontends** and portfolio projects directly on the VPS.
* Acts as the secure bridge between the public internet and the private home-lab network.

---

## System Information

### Kernel / OS

* **OS:** Linux x86-64
* **Provider:** OVH VPS

### SSH Stack

* SSH port: Non-default (custom port configured for security hardening)

---

## Services & Packages Running

* **Headscale** – Self-hosted Tailscale control plane; manages mesh VPN node registration and key exchange for the home-lab network.
* **Tailscale** – Mesh VPN client; connects VIREN to CASPER and other home-lab nodes over an encrypted tunnel.
* **Reverse Proxy** – Routes public requests through to CASPER-hosted services via the Tailscale interface.
* **ACRO (Authorization Layer)** – Provides edge-level authentication and authorization before traffic reaches internal services.
* **Web Frontends / Portfolio Services** – Static and dynamic web projects hosted directly on the VPS, publicly accessible via domain.

---

## Network Role

* Public-facing node — reachable via the internet on its OVH-assigned static IPv4 and IPv6 addresses.
* Terminates public HTTPS connections and proxies authenticated traffic to CASPER over Tailscale.
* Serves portfolio and frontend projects directly to end users.
* Does **not** expose CASPER's home network IP to the public internet.

---

## Security Posture

* SSH running on a non-default port.
* VPS firewall configured to restrict unnecessary inbound traffic.
* All internal service traffic tunnelled through Tailscale (encrypted, authenticated).
* Edge authorization via ACRO prevents unauthorized access to proxied services.
* `nofail` mount policy enforced in `/etc/fstab` for any optional/removable mounts — see incident log for context.

---

## Notes

* VIREN acts as the single public entry point; CASPER remains fully internal and is only reachable through Tailscale or the local home network.
* Any future temporary or removable mounts added to `/etc/fstab` **must** include the `nofail` option (and optionally `x-systemd.device-timeout=`) to prevent boot failure if a device is later removed:
  ```
  UUID=... /mnt/example ext4 defaults,nofail 0 2
  ```
  See the [Maintenance Log](maintenance-log.md) for the VPS Boot Failure incident (2026-08-03/04) that prompted this policy.
* Persistent journald logging (`/var/log/journal`) is enabled and retains boot history across reboots.
* `dnf-automatic` is configured for **security-only** updates with `apply_updates = yes`. Manual `dnf update` runs should be noted in the maintenance log.
* The OVH KVM/serial console is the primary diagnostic tool for any future "unreachable, boots but no network" scenario — rescue-mode chroot alone is insufficient for live boot diagnosis.

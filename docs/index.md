# My Home Lab Documentation

This project documents my home lab infrastructure dedicated to **data privacy** and **digital autonomy**. The core purpose is to escape reliance on detached mainstream corporations and reclaim control over my personal data and services by hosting them myself.

## Current Setup (MK-2)

The home lab has been reformed into a **cleaner, unified architecture** built around a single high-performance computer that runs core services. Access to services is provided through:

- **Tailscale** - Secure mesh networking to access services remotely
- **Headscale** - Self-hosted Tailscale control server on my VPS
- **ACRO** - Authorization and authentication system (similar to Authentik but with greater code-level control)
- **Domain Protection** - Services delivered through my domain with ACRO-protected access

This approach provides granular control, privacy, and security while maintaining ease of access.

## Architecture Diagram (MK-2 - Current)

{% include image-modal-mk2.html %}

{% include image-viewer-mk2.js %}

This diagram shows the current MK-2 architecture with the unified compute node, Tailscale mesh networking, Headscale control plane, and ACRO authorization layer.

## Architecture Diagram (MK-1 - Retired)

{% include image-modal.html %}

{% include image-viewer.js %}

**Note:** The diagram below shows the original MK-1 architecture and is no longer active. See the retired nodes section below.

### Retired Systems (MK-1)

The original setup consisted of multiple distributed nodes:
- ~~**ENLIL**~~ - **RETIRED** - Was a local DNS resolver running Pi-hole
- **CASPER** - Still active as NAS storage
- ~~**LORIC**~~ - **RETIRED** - Was the orchestrator/CI/CD runner node
- ~~**AUREL**~~ - **RETIRED** - Was the worker node for heavy builds
- **LABRYS** - Workstation

The MK-1 architecture was a valuable learning experience for understanding distributed CI/CD infrastructure, but has been consolidated into the cleaner MK-2 single-computer design focused on privacy and control.

## Notes

- The setup above will need to have their static ips migrated to a much lower ipv4 range, this is so I can tell the router to avoid assigning any future devices on the network to be accidentally assigned to one of these critical ips. There are many ways to go about this so for the moment it will be on my **TODO**.

## Documentation Pages

### Active Systems
- [CASPER - Gitea Server & Network Attached Storage](casper.md)
- [Maintenance Log](maintenance-log.md)

### Retired Systems (MK-1 Archive)
- [LORIC - Orchestrator Node (Retired)](loric.md)
- [AUREL - Worker Node (Retired)](aurel.md)
- [ENLIL - Local DNS Resolver (Retired)](enlil.md)

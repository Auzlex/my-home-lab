# My Home Lab
## Introduction

Welcome to the My Home Lab repository. This documents my infrastructure dedicated to **data privacy** and **digital autonomy**—escaping reliance on mainstream corporations and reclaiming control over my personal data by hosting services myself.

## Current Architecture (MK-2)

The home lab has been reformed into a **unified, privacy-focused architecture** built around a single high-performance computer:

- **Services** run on a dedicated compute system
- **Access** is provided securely through **Tailscale** mesh networking
- **Control plane** is self-hosted via **Headscale** on my VPS
- **Authorization** is managed by **ACRO** (similar to Authentik, with deeper code-level control)
- **Domain protection** via my domain with ACRO-secured access

This approach provides granular control, privacy, and security while maintaining ease and reliability.

## Legacy Architecture (MK-1 - Archived)

### Original Setup

![alt text](docs/resources/myhomelab.png)

**Note:** This diagram shows the original MK-1 setup and is no longer active.

The original setup featured multiple distributed nodes for learning purposes:
- ~~**ENLIL**~~ - **RETIRED** - Local DNS resolver with Pi-hole
- **CASPER** - NAS storage (still active)
- ~~**LORIC**~~ - **RETIRED** - Orchestrator node and CI/CD runner
- ~~**AUREL**~~ - **RETIRED** - Worker node for heavy builds
- **LABRYS** - Storage device

MK-1 was valuable for understanding distributed CI/CD infrastructure, but has been consolidated into the cleaner MK-2 design.

## Notes

- The setup above will need to have their static ips migrated to a much lower ipv4 range, this is so I can tell the router to avoid assigning any future devices on the network to be accidentally assigned to one of these critical ips. There are many ways to go about this so for the moment it will be on my **TODO**.

## Website Link
### For detailed documentation, please visit the [GitHub Pages site](https://auzlex.github.io/my-home-lab/).


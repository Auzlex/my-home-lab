# Home Lab CI/CD

This project documents a multi-node CI/CD lab using:

- Gitea
- Docker
- Raspberry Pi
- ARM + x86 separation

The goal is to mirror real-world CI infrastructure on low-cost hardware.

## Architecture Diagram

![Home Lab Architecture](resources/myhomelab.png)

In the image above you can see a diagram or layout of the software and systems I have mapped out to the best of my ability to show how each device and service is communicating with each other.

## Documentation Pages

- [CASPER - Central Gitea Server](casper.md)
- [LORIC - Orchestration Node](loric.md)
- [AUREL - Execution Node](aurel.md)


[← Back to Home](index.md)

# LORIC - Orchestrator Node (Gitea)

* **Hostname:** LORIC  
* **Type:** Raspberry Pi 3 B+
* **IP Address:** 192.168.1.122 **(STATIC)**
* **Architecture:** ARMv7 (Raspberry Pi 3 B+)  

## Purpose

**LORIC** acts as the dedicated **orchestrator node** within the home-lab CI/CD infrastructure.
It is responsible for polling the Gitea server on **CASPER**, orchestrating workflow execution,
and dispatching jobs to worker nodes like **AUREL** while maintaining workflow scheduling and coordination. It is also capable of handling building and running docker related tasks however those are offloaded to **AUREL**.

---

## System Information

### Kernel / OS

* Kernel: 6.12.62+rpt-rpi-v8.
* Build: #1 SMP PREEMPT Debian 1:6.12.62-1+rpt1 (2025-12-18).
* Architecture: aarch64.
* Distro: Debian (Raspberry Pi variant).

### SSH Stack

* OpenSSH: OpenSSH_10.0p2 Debian-7.
* OpenSSL: 3.5.4 (30 Sep 2025).

### Docker

* Docker Engine: 26.1.5+dfsg1.
* Build: a72d7cd.

---

### Role In The Lab

* **Gitea Actions Runner:** Polls **CASPER** for workflows and receives jobs.
* **Primary Execution Node:** Executes all workflow steps locally by default.
* **Docker Orchestrator:** Runs Docker builds on **AUREL** or **LORIC** unless a remote context or SSH is explicitly used.
* **Persistent Service:** Runs as a systemd service and auto-starts on boot.
* **Job Scheduling:** Single-runner execution; jobs queue in Gitea on **CASPER** if **LORIC** is busy or offline.
* **Labels:** `pi3`, `armv7` (used only to select which workflows this runner can accept).

---

## Setup Steps

**LORIC** was setup using the following steps and instructions:

### 1. Install Docker

```bash
auzlex@LORIC:~ $ sudo apt update && sudo apt install -y docker.io docker-compose && sudo systemctl enable docker --now
```

* Docker is used to run any containerized jobs dispatched from **CASPER** which is given via Gitea actions upon this runner node.

### 2. Create Runner Directory

```bash
auzlex@LORIC:~ $ mkdir ~/gitea-runner && cd ~/gitea-runner
```

### 3. Download Gitea Actions Runner

```bash
auzlex@LORIC:~/gitea-runner $ curl -LO https://dl.gitea.com/act_runner/0.2.13/act_runner-0.2.13-linux-arm-7.xz
```

* Version **0.2.13**, architecture **arm-7** matches Raspberry Pi 3 B+

### 4. Extract and Prepare Runner

```bash
auzlex@LORIC:~/gitea-runner $ unxz act_runner-0.2.13-linux-arm-7.xz
auzlex@LORIC:~/gitea-runner $ mv act_runner-0.2.13-linux-arm-7 act_runner
auzlex@LORIC:~/gitea-runner $ chmod +x act_runner
```

<!-- ### 5. Fix DNS Resolution for CASPER

* Since `/etc/hosts` is managed by cloud-init and changes won't persist on reboot, we need to modify the cloud-init configuration and template instead.
* First, disable cloud-init management of `/etc/hosts` by editing `/etc/cloud/cloud.cfg`:

```bash
auzlex@LORIC:~ $ sudo nano /etc/cloud/cloud.cfg
```

* Set `manage_etc_hosts: false` in the configuration.

* Then, edit `/etc/cloud/templates/hosts.debian.tmpl` to allow LORIC to resolve `192.168.1.124`:
(This one is important because I have gitea working under reverse proxy via traefik so I need `http://192.168.1.124:8083`).

```bash
auzlex@LORIC:~ $ sudo nano /etc/cloud/templates/hosts.debian.tmpl
```

* Add:

```
192.168.1.124 192.168.1.124
``` -->

### 6. Register Runner with Gitea

* Obtain the **registration token** from CASPER (Gitea UI: Settings → Actions → Runners → Add Runner).

```bash
auzlex@LORIC:~/gitea-runner $ ./act_runner register --instance http://192.168.1.124:8083 --token <TOKEN> --name loric-runner --labels pi3,armv7 --no-interactive
```

* `<TOKEN>`: token obtained from CASPER.
* `--labels` can be customized for workflow targeting.

### 7. Start Runner (Manual)

```bash
auzlex@LORIC:~/gitea-runner $ ./act_runner daemon
```

* Runner will poll CASPER and appear online in Gitea.

### 8. Make Runner Persistent with systemd

1. Create service file:

    ```bash
    auzlex@LORIC:~ $ sudo nano /etc/systemd/system/gitea-runner.service
    ```

2. Paste:

    ```ini
    [Unit]
    Description=Gitea Actions Runner
    After=network.target

    [Service]
    Type=simple
    User=auzlex
    WorkingDirectory=/home/auzlex/gitea-runner
    ExecStart=/home/auzlex/gitea-runner/act_runner daemon
    Restart=always

    [Install]
    WantedBy=multi-user.target
    ```

3. Enable and start the service:

    ```bash
    auzlex@LORIC:~ $ sudo systemctl daemon-reload
    auzlex@LORIC:~ $ sudo systemctl enable gitea-runner
    auzlex@LORIC:~ $ sudo systemctl start gitea-runner
    ```

4. Check status:

    ```bash
    auzlex@LORIC:~ $ sudo systemctl status gitea-runner
    ```

### 9. Testing Gitea Runner and worker simple via SSH

We will test running a task on **LORIC** to `echo "Hello from AUREL!"`

An SSH has also been setup between **AUREL** and **LORIC** so that **LORIC** can issue commands to the isolated user account called **CI**, at the moment we can manually configure out Gitea workflow runner to issue commands carefully.

![alt text](resources/image.png)
In the example image above, you can see the worker is successfully running my gitea workflow test.yml within my CICD-Test repo. The test.yml is to instruct commands under the ssh.

```yml
name: Test Worker Connectivity

on:
  push:
    branches:
      - main

jobs:
  ping-worker:
    runs-on: pi3  # label matches LORIC and AUREL worker
    steps:
      - name: Echo from Worker
        run: ssh ci@192.168.1.123 'echo "Hello from AUREL!"'

```

### 10. Setting Up Docker Context

These commands will setup docker context for **LORIC**. **LORIC** also has docker installed and running which can perform builds and other tasks, however their role is to simply only handle requests from **CASPER** and tell other devices within my setup to do more of the heavy lifting.

When a workflow runs:

1. **CASPER** has a job that **LORIC** runs.
2. **LORIC** prepares workflow.
3. Docker commands execute using active context.
4. Workloads run locally or remotely.
5. Containers clean up normally after job.

If the runner is busy:

* Jobs queue in Gitea upon **CASPER**

We use this command below to ensure what types of context is available.

```bash
docker context ls
```

```bash
NAME      DESCRIPTION                               DOCKER ENDPOINT               ERROR
aurel *                                             ssh://ci@192.168.1.123        
default   Current DOCKER_HOST based configuration   unix:///var/run/docker.sock  
```

Docker contexts can be created with the following command:

```bash
docker context create aurel \
  --docker "host=ssh://ci@192.168.1.123"
```

Next we tell **LORIC** to use **AUREL** for docker usage.

```bash
docker context use aurel
```

After this:

* `docker build` runs on **AUREL**.
* `docker run` runs on **AUREL**.
* Images and containers live on **AUREL**.

---

## Notes

* **CASPER** never talks to workers directly; all execution flows through **LORIC**.
<!-- * Ensure `/etc/hosts` entry for `192.168.1.124` remains in place for DNS resolution. -->
* Runner binary located at: `~/gitea-runner/act_runner`.
* Docker must remain installed and updated for workflows that use containerized jobs.
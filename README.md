# Bootstrapper server for P2p networks by DeBeem, Team.


## ☀︎ Installation
```shell
$ git clone https://github.com/debeem/js-debeem-p2p-boot.git
$ cd js-debeem-p2p-boot
$ npm i
```


## ❤︎ Help
```shell
$ npm run help
```


## ⌘ Configuration

### 1, Set up a default configuration file from the template
```shell
$ cp .env.default .env
```

### 2, Edit configuration file
```shell
$ vim .env
```

```shell
#   listening port of the p2p network bootstrapper service
LISTEN_PORT=8011

#   binding IP address of the p2p network bootstrapper service
LISTEN_ADDRESS=0.0.0.0

#   configure the full peerId filename
FILE_PEER_ID=/etc/debeem/.peerId

#   configure the full swarmKey filename
FILE_SWARM_KEY=/etc/debeem/.swarmKey

#   announced multiaddrs to the entire p2p network
ANNOUNCE_MULTIADDRS=
```



## ◉ Run

### 1, run in development mode
```shell
$ npm run dev -- --port {port} --file_peer_id {file_peer_id} --file_swarm_key {file_swarm_key}
```
| arg name         | type   | remark                                      |
|------------------|--------|---------------------------------------------|
| --port           | number |                                             |
| --file_peer_id   | string | Full filename where peerId data is stored   |
| --file_swarm_key | string | Full filename where swarmKey data is stored |


### 2, run in production mode
```shell
$ npm run start -- --port {port} --file_peer_id {file_peer_id} --file_swarm_key {file_swarm_key}
```
| arg name         | type   | remark                                      |
|------------------|--------|---------------------------------------------|
| --port           | number |                                             |
| --file_peer_id   | string | Full filename where peerId data is stored   |
| --file_swarm_key | string | Full filename where swarmKey data is stored |


## ☕︎ Tools
### generate a new p2p peerId
```shell
$ npm run gen-peer-id -- --output {filename}
```
| arg name         | type   | remark                                          |
|------------------|--------|-------------------------------------------------|
| --output   | string | Full filename to save peerId data   |

### generate a new p2p swarmKey
```shell
$ npm run gen-swarm-key -- --output {filename}
```
| arg name         | type   | remark                              |
|------------------|--------|-------------------------------------|
| --output   | string | Full filename to save swarmKey data |


## ⎈ Docker
### 1, Run in foreground mode
```shell
$ docker-compose build
$ docker-compose up
```

### 2, Run in background daemon mode
```shell
$ docker-compose build
$ docker-compose up -d
```
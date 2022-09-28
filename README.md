# geekle-sre
A small project to showcase integration of a js prober with prometheus

## project structure
1) `js/` - the application server + prober example
2) `prom-conf/` - the prometheus configuration

## requirements
- Docker
- Nodejs

## run the project
- run `npm install` in js/ folder
- commands to start the prober and application server are available in js/package.json
- download the Prometheus Docker image by running `docker pull prom/prometheus`
- to start the prometheus image run 
```docker run \
    -p 9090:9090 \
    -v /Users/thomas.gualino/projects/prometheus-conf:/etc/prometheus \
    prom/prometheus
```

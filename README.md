# geekle-sre
A small project to showcase integration of a js prober with prometheus

## project structure
1) js - the application server + prober example
2) the prometheus configuration

## run the project
- commands to start the prober and application server are available in js/package.json
- to start the prometheus image run 
```docker run \
    -p 9090:9090 \
    -v /Users/thomas.gualino/projects/prometheus-conf:/etc/prometheus \
    prom/prometheus
```

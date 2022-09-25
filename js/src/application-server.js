const express = require("express");
const Prometheus = require("prom-client");

const app = express();
const port = 3000;

const register = new Prometheus.Registry();
const counter = new Prometheus.Counter({
  name: "counter",
  help: "example counter",
  collect() {
    this.inc(3);
  },
});

register.registerMetric(counter);
register.setDefaultLabels({
  app: "custom metrics",
});

app.get("/metrics", async (req, res) => {
  res.set("Content-type", Prometheus.register.contentType);
  const data = await Prometheus.register.metrics();
  res.send(data);
});

app.get("/potato", async (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send("potato!");
});

app.listen(port, () => {
  Prometheus.collectDefaultMetrics({ register });
  console.log(`Example app listening on port ${port}`);
});

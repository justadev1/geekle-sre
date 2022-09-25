const express = require("express");
const Prometheus = require("prom-client");
const fetch = require("node-fetch");

const app = express();
const port = 3001;

let interval;

const register = new Prometheus.Registry();
const successCounter = new Prometheus.Counter({
  name: "success_counter",
  help: "Counter for successful requests",
});

const errorCounter = new Prometheus.Counter({
  name: "error_counter",
  help: "Counter for unsuccessful requests",
});

// availability_ratio = success / total = success_counter / (success_counter + error_counter)

register.registerMetric(successCounter);
register.registerMetric(errorCounter);
register.setDefaultLabels({
  app: "prober",
});

const collectMetrics = async () => {
  const response = await fetch("http://localhost:3000/potato");
  if (response.status === 200) successCounter.inc();
  else errorCounter.inc();
};

app.get("/metrics", async (req, res) => {
  res.set("Content-type", register.contentType);
  const data = await register.metrics();
  res.send(data);
});

app.listen(port, () => {
  interval = setInterval(collectMetrics, 5000);
  console.log(`Example app listening on port ${port}`);
});

process.on("SIGTERM", () => {
  clearInterval(interval);
});

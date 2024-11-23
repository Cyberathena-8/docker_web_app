const express = require("express");
const Docker = require("dockerode");
const path = require("path");

const app = express();
const docker = new Docker();
app.use(express.json());

app.post("/run-container", async (req, res) => {
  const { language, filePath } = req.body;
  const image = getLanguageImage(language);

  if (!image) return res.status(400).send("Unsupported language");

  try {
    const container = await docker.createContainer({
      Image: image,
      Cmd: ["bash", "-c", `cd /mnt && ${image.split(":")[0]} ${path.basename(filePath)}`],
      HostConfig: { Binds: [`${path.dirname(filePath)}:/mnt`] },
    });
    await container.start();
    res.json({ containerId: container.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/stop/:id", async (req, res) => {
  const container = docker.getContainer(req.params.id);
  await container.stop();
  res.send("Container stopped");
});

app.get("/logs/:id", async (req, res) => {
  const container = docker.getContainer(req.params.id);
  const logs = await container.logs({ stdout: true, stderr: true });
  res.send(logs.toString());
});

function getLanguageImage(language) {
  const images = {
    python: "python:latest",
    node: "node:latest",
    java: "openjdk:latest",
    ruby: "ruby:latest",
    go: "golang:latest",
    php: "php:latest",
  };
  return images[language];
}

app.listen(3000, () => console.log("Server running on http://localhost:3000"));


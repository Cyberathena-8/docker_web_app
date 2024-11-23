<template>
  <div class="w-full max-w-xl bg-gray-800 rounded-lg shadow p-6 mt-6">
    <h2 class="text-xl font-bold">Container Management</h2>
    <p class="text-gray-400 mt-2">Container ID: {{ containerId }}</p>

    <div class="mt-4 space-y-4">
      <button
        @click="fetchLogs"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        View Logs
      </button>
      <button
        @click="openShell"
        class="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Open Shell
      </button>
      <button
        @click="stopContainer"
        class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Stop Container
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["containerId"],
  emits: ["stopContainer"],
  methods: {
    async fetchLogs() {
      try {
        const response = await fetch(`http://localhost:3000/logs/${this.containerId}`);
        const logs = await response.text();
        alert("Container Logs:\n" + logs);
      } catch (error) {
        alert("Failed to fetch logs: " + error.message);
      }
    },
    async openShell() {
      alert("Opening shell is not implemented in the frontend. Use a terminal for now.");
    },
    async stopContainer() {
      try {
        await fetch(`http://localhost:3000/stop/${this.containerId}`, { method: "POST" });
        alert("Container stopped.");
        this.$emit("stopContainer");
      } catch (error) {
        alert("Failed to stop container: " + error.message);
      }
    },
  },
};
</script>


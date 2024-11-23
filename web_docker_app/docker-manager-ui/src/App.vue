<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
    <h1 class="text-3xl font-bold mb-6">Docker Container Manager</h1>

    <div class="w-full max-w-xl bg-gray-800 rounded-lg shadow p-6">
      <FileSelector @fileSelected="onFileSelected" />

      <div class="mt-4">
        <label for="language" class="block text-sm font-medium">Programming Language:</label>
        <select
          id="language"
          v-model="language"
          class="mt-2 block w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-sm"
        >
          <option value="python">Python</option>
          <option value="node">Node</option>
          <option value="java">Java</option>
          <option value="ruby">Ruby</option>
          <option value="go">Go</option>
          <option value="php">PHP</option>
        </select>
      </div>

      <button
        @click="runContainer"
        class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Create Container
      </button>
    </div>

    <ContainerManager
      v-if="containerId"
      :containerId="containerId"
      @stopContainer="containerId = null"
    />
  </div>
</template>

<script>
import FileSelector from "./components/ContainerManager.vue";
import ContainerManager from "./components/FileSelector.vue";

export default {
  components: { FileSelector, ContainerManager },
  data() {
    return {
      language: "python",
      filePath: null,
      containerId: null,
    };
  },
  methods: {
    onFileSelected(filePath) {
      this.filePath = filePath;
    },
    async runContainer() {
      if (!this.filePath) {
        alert("Please select a file.");
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/run-container", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language: this.language, filePath: this.filePath }),
        });
        const result = await response.json();
        this.containerId = result.containerId;
      } catch (error) {
        alert("Failed to create container: " + error.message);
      }
    },
  },
};
</script>

<style>
body {
  @apply bg-gray-900 text-white;
}
</style>


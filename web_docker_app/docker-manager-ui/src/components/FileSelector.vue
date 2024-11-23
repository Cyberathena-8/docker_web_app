<template>
  <div
    class="border-2 border-dashed border-gray-600 p-6 rounded-lg flex flex-col items-center justify-center"
    @drop.prevent="handleDrop"
    @dragover.prevent
  >
    <p class="text-gray-400 mb-2">Drag and drop a file here, or click to select</p>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      class="hidden"
    />
    <button
      @click="triggerFileInput"
      class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
    >
      Select File
    </button>
  </div>
</template>

<script>
export default {
  emits: ["fileSelected"],
  methods: {
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file) {
        this.$emit("fileSelected", file.path);
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.$emit("fileSelected", file.path);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
};
</script>


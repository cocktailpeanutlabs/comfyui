const path = require("path")
module.exports = {
  title: "ComfyUI",
  description: "Stable Diffusion & Stable Video Diffusion GUI",
  icon: "icon.png",
  pinokiod: ">=0.0.443",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "ComfyUI", "env")
    let installing = kernel.running(__dirname, "install.json") || kernel.running(__dirname, "insatll_mac.json") || kernel.running(__dirname, "install_without_models.json")
    if (installing) {
      return [{ icon: "fa-solid fa-plug", text: "Installing", href: "install.json" }]
    } else if (installed) {
      let gpu_running = kernel.running(__dirname, "start.json")
      let cpu_running = kernel.running(__dirname, "start_cpu.json")
      let running = cpu_running || gpu_running
      let arr
      if (running) {
        let memory = kernel.memory.local[path.resolve(__dirname, "start.json")]
        arr = [
          { icon: "fa-solid fa-terminal", text: "Terminal", href: (gpu_running ? "start.json" : "start_cpu.json") }
        ]
        if (memory && memory.url) {
          arr.push({ icon: "fa-solid fa-rocket", text: "Web UI", href: memory.url })
        }
      } else {
        arr = [
          { icon: "fa-solid fa-power-off", text: "Start", href: "start.json" },
          { icon: "fa-solid fa-power-off", text: "Launch CPU Mode (Slow)", href: "start_cpu.json", }
        ]
      }
      arr = arr.concat([
        { icon: "fa-solid fa-rotate", text: "Update", href: "update.json", },
        { text: "Download SDXL Turbo Model", icon: "fa-solid fa-download", href: "download-turbo.json", },
        { text: "Download Stable Video XT Model", icon: "fa-solid fa-download", href: "download-svd-xt.json", },
        { text: "Download Stable Video Model", icon: "fa-solid fa-download", href: "download-svd.json", },
        { text: "Download LCM LoRA", icon: "fa-solid fa-download", href: "download-lcm-lora.json", }
      ])
      return arr
    } else {
      if (kernel.platform === "darwin" && kernel.arch === "arm64") {
        return [
          { icon: "fa-solid fa-plug", text: "Install with Stable Video Support (Takes around 20 minutes)", href: "install_mac.json" },
          { icon: "fa-solid fa-plug", text: "Install without Stable Video (Quick)", href: "install.json" }
        ]
      } else {
        return [{ icon: "fa-solid fa-plug", text: "Install", href: "install.json" }]
      }
    }
  }
}

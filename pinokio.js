const path = require('path')
module.exports = {
  title: "ComfyUI",
  description: "Stable Diffusion & Stable Video Diffusion GUI",
  icon: "icon.png",
  pinokiod: ">=0.1.49",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "app", "env")
    let installing = kernel.running(__dirname, "install.json") || kernel.running(__dirname, "insatll_mac.json") || kernel.running(__dirname, "install_without_models.json")
    if (installing) {
      return [{ icon: "fa-solid fa-plug", text: "Installing", href: "install.json" }]
    } else if (installed) {
      let memory = {
        start: kernel.memory.local[path.resolve(__dirname, "start.json")],
        start_cpu: kernel.memory.local[path.resolve(__dirname, "start_cpu.json")],
      }
      console.log("MEMORY", memory)
      let gpu_running = kernel.running(__dirname, "start.json")
      let cpu_running = kernel.running(__dirname, "start_cpu.json")
      let running = cpu_running || gpu_running
      let arr
      if (running) {
        arr = [
          { icon: "fa-solid fa-terminal", text: "Terminal", href: (gpu_running ? "start.json" : "start_cpu.json") }
        ]
        if (memory.start && memory.start.url) {
          arr.push({ icon: "fa-solid fa-rocket", text: "Web UI", href: memory.start.url })
        } else if (memory.start_cpu && memory.start_cpu.url) {
          arr.push({ icon: "fa-solid fa-rocket", text: "Web UI", href: memory.start_cpu.url })
        }
      } else {
        arr = [
          { icon: "fa-solid fa-power-off", text: "Start", href: "start.json" },
          { icon: "fa-solid fa-power-off", text: "Start CPU Mode (Slow)", href: "start_cpu.json", }
        ]
      }
      arr = arr.concat([{
        icon: "fa-solid fa-download",
        text: "Download Models",
        menu: [
          { text: "Download by URL", icon: "fa-solid fa-download", href: "download.html?raw=true", mode: "refresh" },
          { text: "SDXL", icon: "fa-solid fa-download", href: "download-sdxl.json", mode: "refresh" },
          { text: "SDXL Turbo", icon: "fa-solid fa-download", href: "download-turbo.json", mode: "refresh" },
          { text: "Stable Video XT", icon: "fa-solid fa-download", href: "download-svd-xt.json", mode: "refresh" },
          { text: "Stable Video", icon: "fa-solid fa-download", href: "download-svd.json", mode: "refresh" },
          { text: "LCM LoRA", icon: "fa-solid fa-download", href: "download-lcm-lora.json", mode: "refresh" }
        ]
      }, {
        icon: "fa-solid fa-rotate", text: "Update", href: "update.json"
      }, {
        icon: "fa-solid fa-plug", text: "Reinstall", href: "install.json"
      }, {
        icon: "fa-solid fa-broom", text: "Factory Reset", href: "reset.json"
      }])
      return arr
    } else {
      return [
        { icon: "fa-solid fa-plug", text: "Install", href: "install.json" },
        { icon: "fa-solid fa-rotate", text: "Update", href: "update.json" }
      ]
    }
  }
}

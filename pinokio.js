const path = require('path')
module.exports = {
  version: "1.3",
  title: "ComfyUI",
  description: "Stable Diffusion & Stable Video Diffusion GUI",
  icon: "icon.png",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "app", "env")
    let installing = kernel.running(__dirname, "install.json") || kernel.running(__dirname, "insatll_mac.json") || kernel.running(__dirname, "install_without_models.json")
    if (installing) {
      return [{ default: true, icon: "fa-solid fa-plug", text: "Installing", href: "install.json" }]
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
          arr.push({ default: true, icon: "fa-solid fa-rocket", text: "Web UI", href: memory.start.url })
        } else if (memory.start_cpu && memory.start_cpu.url) {
          arr.push({ default: true, icon: "fa-solid fa-rocket", text: "Web UI", href: memory.start_cpu.url })
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
          { text: "Download by URL", icon: "fa-solid fa-download", href: "download.html?raw=true" },
          { text: "SD 3", icon: "fa-solid fa-download", href: "download-sd3.json", mode: "refresh" },
          { text: "SDXL", icon: "fa-solid fa-download", href: "download-sdxl.json", mode: "refresh" },
          { text: "SDXL Turbo", icon: "fa-solid fa-download", href: "download-turbo.json", mode: "refresh" },
          { text: "Stable Video XT", icon: "fa-solid fa-download", href: "download-svd-xt.json", mode: "refresh" },
          { text: "Stable Video", icon: "fa-solid fa-download", href: "download-svd.json", mode: "refresh" },
          { text: "Stable Video XT 1.1", icon: "fa-solid fa-download", href: "download-svd-xt-1.1.json", mode: "refresh" },
          { text: "LCM LoRA", icon: "fa-solid fa-download", href: "download-lcm-lora.json", mode: "refresh" },
          { text: "SD 1.5", icon: "fa-solid fa-download", href: "download-sd15.json", mode: "refresh" },
          { text: "SD 2.1", icon: "fa-solid fa-download", href: "download-sd21.json", mode: "refresh" },
          { text: "Playground2.5 fp16", icon: "fa-solid fa-download", href: "download-playground-fp16.json", mode: "refresh" },
          { text: "Playground2.5", icon: "fa-solid fa-download", href: "download-playground.json", mode: "refresh" },
        ]
      }, {
        icon: "fa-solid fa-link", text: "ComfyWorkflows", href: "https://comfyworkflows.com/" 
      }, {
        icon: "fa-solid fa-link", text: "CivitAI", href: "https://civitai.com"
      }, {
        icon: "fa-solid fa-rotate", text: "Update", href: "update.json"
      }, {
        icon: "fa-solid fa-plug", text: "Reinstall", href: "install.json"
      }, {
        icon: "fa-solid fa-circle-xmark", text: "Reset", href: "reset.json", confirm: "Are you sure you wish to reset the app?"
      }])
      return arr
    } else {
      return [
        { default: true, icon: "fa-solid fa-plug", text: "Install", href: "install.json" },
        { icon: "fa-solid fa-rotate", text: "Update", href: "update.json" }
      ]
    }
  }
}

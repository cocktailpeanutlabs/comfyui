module.exports = {
  title: "ComfyUI",
  description: "Stable Diffusion & Stable Video Diffusion GUI",
  icon: "icon.png",
  pinokiod: ">=0.0.443",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "app", "env")
    let installing = kernel.running(__dirname, "install.json") || kernel.running(__dirname, "insatll_mac.json") || kernel.running(__dirname, "install_without_models.json")
    if (installing) {
      return [{ icon: "fa-solid fa-plug", text: "Installing", href: "install.json" }]
    } else if (installed) {
      let memory = {
        start: kernel.local(__dirname, "start.json"),
        start_cpu: kernel.local(__dirname, "start_cpu.json")
      }
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
          { icon: "fa-solid fa-power-off", text: "Launch CPU Mode (Slow)", href: "start_cpu.json", }
        ]
      }
      arr = arr.concat([{
        icon: "fa-solid fa-download",
        text: "Download Models",
        menu: [
          { text: "Download SDXL Turbo Model", icon: "fa-solid fa-download", href: "download-turbo.json", },
          { text: "Download Stable Video XT Model", icon: "fa-solid fa-download", href: "download-svd-xt.json", },
          { text: "Download Stable Video Model", icon: "fa-solid fa-download", href: "download-svd.json", },
          { text: "Download LCM LoRA", icon: "fa-solid fa-download", href: "download-lcm-lora.json", }
        ]
      }, {
        icon: "fa-solid fa-rotate", text: "Update", href: "update.json"
      }])
      return arr
    } else {
      return [{ icon: "fa-solid fa-plug", text: "Install", href: "install.json" }]
    }
  }
}

const memory = require("memoryjs")

const process = {
  coreProcess: null,
  ModuleBase: null,
}

console.log("01.exe를 기다리는 중...")

if (isRunning("01.exe")) {
  main();
}

function isRunning (processName) {
  try {
    process.coreProcess = memory.openProcess(processName);
    process.ModuleBase = memory.findModule("01.exe", process.coreProcess.th32ProcessID)
    return true;
  } catch (e) {
    return false;
  }
}

async function main () {
  const value = memory.readMemory(process.coreProcess.handle, process.ModuleBase + "0x1026", "int")
  console.log("value: " + value);
  console.log("jne => jmp\nWriteMemory")
  memory.writeMemory(process.coreProcess.handle, process.ModuleBase + "0x1026", 6952427, "int");
  console.log("value: " + value);
  console.log("Yes! success memory edit!")
}

import { addPath } from '@actions/core'
import { exec } from '@actions/exec'
import { Inputs } from './inputs'
import os from 'os'
import path from 'path'

export async function installRefter(inputs: Inputs): Promise<void> {
  // Run refter installation script
  let refterDep = 'refter-cli'
  if (inputs.version) {
    refterDep = `refter-cli==${inputs.version}`
  }

  await exec('pip', ['install', refterDep])

  // Add refter executable to the PATH
  const refterPath = path.join(os.homedir(), ...getRefterPathArgs())
  addPath(refterPath)
}

function getRefterPathArgs(): string[] {
  switch (os.platform()) {
    case 'win32':
      return ['AppData', 'Roaming', 'Python', 'Scripts']
    default:
      return ['.local', 'bin']
  }
}

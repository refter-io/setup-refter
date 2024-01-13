import { setFailed } from '@actions/core'
import { installRefter } from './install'
import { getInputs } from './inputs'

export async function run(): Promise<void> {
  try {
    const inputs = getInputs()

    await installRefter(inputs)
  } catch (error) {
    setFailed(errorAsMessage(error))
  }
}

function errorAsMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

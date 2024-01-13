import { getInput } from '@actions/core'
import semver from 'semver'

export interface Inputs {
  version: string | null
}

export function getInputs(): Inputs {
  return {
    version: getVersionInput('version')
  }
}

export function getBooleanInput(name: string, default_ = false): boolean {
  const value = getInput(name)
  if (!value) {
    return default_
  }

  return value === 'true'
}

function getVersionInput(name: string): string | null {
  const version = getInput(name)
  if (!version) {
    return null
  }

  const coerced = semver.coerce(version)
  if (!coerced) {
    throw new Error(`Passed refter version '${version}' is not a valid`)
  } else if (!semver.satisfies(coerced, '>=0.1.0')) {
    throw new Error(
      `Passed refter version '${coerced}' is not supported.
       Please use any other supported version >=0.1.0`
    )
  }

  return version.trim()
}

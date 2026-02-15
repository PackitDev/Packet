import { machineIdSync } from 'node-machine-id';

export function getMachineId(): string {
  try {
    return machineIdSync({ original: true });
  } catch (error) {
    // Fallback to a random ID if machine ID cannot be retrieved
    console.warn('Could not retrieve machine ID, using fallback');
    return 'fallback-' + Math.random().toString(36).substring(7);
  }
}

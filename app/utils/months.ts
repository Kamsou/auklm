export const MONTHS_FULL = [
  'janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre',
] as const

export const MONTHS_SHORT = [
  'jan.', 'fev.', 'mars', 'avr.', 'mai', 'juin',
  'juil.', 'aout', 'sept.', 'oct.', 'nov.', 'dec.',
] as const

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

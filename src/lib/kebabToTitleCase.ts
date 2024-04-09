export default function kebabToTitleCase(str: string) {
  return str
    .split('-') // Split the string by hyphens
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' ') // Join the words back with spaces
}

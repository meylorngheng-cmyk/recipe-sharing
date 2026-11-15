
const images = import.meta.glob(
  '../assets/images/*.{png,jpg,jpeg,webp}',
  {
    eager: true,
    import: 'default',
  },
) as Record<string, string>

export function getRecipeImage(filename: string): string {
  const imagePath = `../assets/images/${filename}`

  return images[imagePath] ?? ''
}

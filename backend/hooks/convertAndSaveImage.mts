import path from 'path'
import sharp from 'sharp'
import fs from 'fs'

export const convertAndSaveImage = async (imagePath: string) => {
  const webpPath = path.join(
    path.dirname(imagePath),
    `${path.parse(imagePath).name}.webp`
  )
  await sharp(imagePath).toFormat('webp').webp({ quality: 80 }).toFile(webpPath)
  fs.unlink(imagePath, err => {
    console.log(err)
  })
  return webpPath
}

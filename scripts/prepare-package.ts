import fs from 'node:fs'
import path from 'node:path'

const __dirname = path.resolve()

// Read the local Tailwind CSS file
const localCSS = fs.readFileSync(path.join(__dirname, './src/runtime/assets/main.css'), 'utf8')

// Remove all @source directives along with their line breaks
const packageCSS = localCSS.replace(/@source\s[^;]+;\n?/g, '')

// Remove any resulting multiple empty lines
const cleanedCSS = packageCSS.replace(/\n{3,}/g, '\n\n')

// Write back to the file
fs.writeFileSync(path.join(__dirname, './src/runtime/assets/main.css'), cleanedCSS)

console.log('✅ Package CSS prepared without @source directives')

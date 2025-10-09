
import * as fs from 'fs';
import * as path from 'path';

const __dirname = path.resolve();

const cssFilePath = path.join(__dirname, './src/runtime/assets/main.css');

// Define the @source directives to add back
const sourcesToAdd: string[] = [
  '@source "../components/**";',
  '@source "../shared/componentsMaps/**";',
];

// Read the current CSS file
let cssContent: string = fs.readFileSync(cssFilePath, 'utf8');

// Find the position after @import "tailwindcss";
const importMatch = cssContent.match(/@import\s+'tailwindcss';/);

if (!importMatch) {
  console.error('❌ Could not find @import \'tailwindcss\'; in the file');
  process.exit(1);
}

const importEndPosition = importMatch.index! + importMatch[0].length;

// Extract the part after the import to check for existing sources
const afterImport = cssContent.slice(importEndPosition);

// Filter out sources that already exist
const sourcesToInsert = sourcesToAdd.filter(source => {
  // Normalize the source line for comparison (remove spaces around quotes)
  const normalizedSource = source.replace(/\s+/g, ' ').trim();
  const normalizedAfterImport = afterImport.replace(/\s+/g, ' ');
  
  return !normalizedAfterImport.includes(normalizedSource);
});

if (sourcesToInsert.length === 0) {
  console.log('✅ All @source directives already exist');
  process.exit(0);
}

// Insert the missing sources after the @import line
const beforeImport = cssContent.slice(0, importEndPosition);
const sourcesBlock = '\n\n' + sourcesToInsert.join('\n');

cssContent = beforeImport + sourcesBlock + afterImport;

// Write back to the file
fs.writeFileSync(cssFilePath, cssContent);

console.log(`✅ Added ${sourcesToInsert.length} @source directive(s) back to tailwind.css`);
#!/usr/bin/env node
/**
 * Script to replace BpIcon with direct lucide-vue-next imports
 * Usage: node scripts/replace-bpicon.js <file-path>
 */

const fs = require('fs');
const path = require('path');

// Icon name mapping from kebab-case to PascalCase
function kebabToPascal(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Find all BpIcon usages in a file
function findBpIconUsages(content) {
  const regex = /<BpIcon\s+name="([^"]+)"[^>]*>/g;
  const matches = [];
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      iconName: match[1],
      pascalName: kebabToPascal(match[1])
    });
  }
  
  return matches;
}

// Replace BpIcon with direct component
function replaceBpIcon(content, usage) {
  // Replace the opening tag
  const newTag = usage.fullMatch.replace(
    /<BpIcon\s+name="[^"]+"([^>]*)>/,
    `<${usage.pascalName}$1>`
  );
  
  return content.replace(usage.fullMatch, newTag);
}

// Main function
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const usages = findBpIconUsages(content);
  
  if (usages.length === 0) {
    console.log(`No BpIcon usages found in ${filePath}`);
    return;
  }
  
  console.log(`Found ${usages.length} BpIcon usages in ${filePath}`);
  
  // Get unique icon names
  const uniqueIcons = [...new Set(usages.map(u => u.pascalName))];
  
  // Replace all usages
  let newContent = content;
  usages.forEach(usage => {
    newContent = replaceBpIcon(newContent, usage);
  });
  
  // Add imports if script section exists
  const scriptRegex = /(<script[^>]*>)/;
  if (scriptRegex.test(newContent)) {
    const importStatement = `import {\n    ${uniqueIcons.join(',\n    ')},\n} from 'lucide-vue-next'\n`;
    
    // Check if import already exists
    if (!newContent.includes("from 'lucide-vue-next'")) {
      newContent = newContent.replace(
        scriptRegex,
        `$1\nimport {\n    ${uniqueIcons.join(',\n    ')},\n} from 'lucide-vue-next'\n`
      );
    }
  }
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated ${filePath}`);
}

// Run if called directly
if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node replace-bpicon.js <file-path>');
    process.exit(1);
  }
  processFile(filePath);
}

module.exports = { processFile, findBpIconUsages, kebabToPascal };

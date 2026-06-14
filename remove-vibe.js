import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(process.cwd(), 'src'));

let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace bg-COLOR/X border-COLOR/Y or border-COLOR/Y bg-COLOR/X
  // with bg-base-200 border-base-300.
  // We match primary, secondary, accent, info, success, warning, error
  const colors = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'];
  
  colors.forEach(c => {
    const reg1 = new RegExp(`bg-${c}\\/\\d+\\s+border(-[a-z]+)?\\s+border-${c}\\/\\d+`, 'g');
    const reg2 = new RegExp(`border(-[a-z]+)?\\s+border-${c}\\/\\d+\\s+bg-${c}\\/\\d+`, 'g');
    const reg3 = new RegExp(`bg-${c}\\/\\d+\\s+border-${c}\\/\\d+`, 'g');
    
    content = content.replace(reg1, (match, p1) => `bg-base-200 border${p1 ? p1 : ''} border-base-300`);
    content = content.replace(reg2, (match, p1) => `border${p1 ? p1 : ''} border-base-300 bg-base-200`);
    content = content.replace(reg3, `bg-base-200 border-base-300`);
  });

  // Also replace within the StatCard object definition
  content = content.replace(/bg-(primary|secondary|accent|info|success|warning|error)\/\d+', border: 'border-\1\/\d+'/g, "bg-base-200', border: 'border-base-300'");

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Updated ${path.basename(file)}`);
  }
});

console.log(`Finished updating ${changedFiles} files to remove vibe coding.`);

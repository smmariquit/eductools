import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');

const primaryLocale = 'en';
const secondaryLocales = ['tl', 'ceb'];

// Helper to deeply merge and backfill missing keys
function backfillKeys(primary, secondary) {
  const result = { ...secondary };

  for (const key in primary) {
    if (typeof primary[key] === 'object' && primary[key] !== null) {
      if (!result[key] || typeof result[key] !== 'object') {
        result[key] = {};
      }
      result[key] = backfillKeys(primary[key], result[key]);
    } else {
      if (result[key] === undefined || result[key] === '') {
        // Fallback to primary locale's string
        result[key] = primary[key];
        console.log(`[sync-locales] Backfilled missing key: "${key}" with fallback text.`);
      }
    }
  }

  return result;
}

try {
  const primaryPath = path.join(messagesDir, `${primaryLocale}.json`);
  const primaryData = JSON.parse(fs.readFileSync(primaryPath, 'utf8'));

  secondaryLocales.forEach(locale => {
    const localePath = path.join(messagesDir, `${locale}.json`);
    let localeData = {};
    
    if (fs.existsSync(localePath)) {
      localeData = JSON.parse(fs.readFileSync(localePath, 'utf8'));
    }

    const updatedData = backfillKeys(primaryData, localeData);

    fs.writeFileSync(localePath, JSON.stringify(updatedData, null, 2), 'utf8');
    console.log(`[sync-locales] Synchronized ${locale}.json`);
  });

  console.log('[sync-locales] All secondary locales are synced and backfilled gracefully!');
} catch (error) {
  console.error('[sync-locales] Error synchronizing locales:', error);
  process.exit(1);
}

#!/usr/bin/env node

/**
 * Post Validation Script
 * Validates consistency between data.json and markdown files with front-matter
 * 
 * Usage: node scripts/validate-posts.js
 * 
 * Checks:
 * - Each post in data.json has a corresponding .md file
 * - Each post .md has valid YAML front-matter
 * - Required fields are present in front-matter
 * - IDs are unique in data.json
 * - Dates are in valid ISO format
 * - Categories in data.json match front-matter
 * - Thumbnails exist (optional)
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.join(__dirname, '..');
const DATA_JSON_PATH = path.join(WORKSPACE_ROOT, 'data.json');
const POSTS_DIR = path.join(WORKSPACE_ROOT, 'posts');
const ASSETS_DIR = path.join(WORKSPACE_ROOT, 'assets', 'img', 'posts');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

const logError = (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`);
const logSuccess = (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`);
const logWarning = (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`);
const logInfo = (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`);

let errorCount = 0;
let warningCount = 0;

/**
 * Simple YAML front-matter parser (mirrors app.js logic)
 */
function parseFrontMatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: null, content: content, error: 'No front-matter found' };
  }

  const yamlContent = match[1];
  const contentBody = match[2];
  const metadata = parseSimpleYAML(yamlContent);

  return { metadata, content: contentBody };
}

/**
 * Minimal YAML parser (mirrors app.js logic)
 */
function parseSimpleYAML(yamlStr) {
  const result = {};
  const lines = yamlStr.split('\n').filter(line => line.trim());

  let currentArray = null;
  let currentKey = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('- ')) {
      if (!currentArray) {
        currentArray = [];
        result[currentKey] = currentArray;
      }
      currentArray.push(trimmed.slice(2).trim());
      continue;
    }

    if (line.includes(':')) {
      currentArray = null;
      const [key, ...valueParts] = line.split(':');
      const keyTrimmed = key.trim();
      const value = valueParts.join(':').trim();

      if (value === 'true') result[keyTrimmed] = true;
      else if (value === 'false') result[keyTrimmed] = false;
      else if (!isNaN(value) && value !== '') result[keyTrimmed] = Number(value);
      else result[keyTrimmed] = value;

      currentKey = keyTrimmed;
    }
  }

  return result;
}

/**
 * Validate ISO date format
 */
function isValidISODate(dateStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr + 'T00:00:00Z');
  return !isNaN(date.getTime());
}

/**
 * Main validation
 */
async function validate() {
  console.log(`\n${colors.blue}=== POST VALIDATION REPORT ===${colors.reset}\n`);

  // 1. Load data.json
  let dataJson;
  try {
    const dataContent = fs.readFileSync(DATA_JSON_PATH, 'utf-8');
    dataJson = JSON.parse(dataContent);
    logSuccess(`data.json loaded (${dataJson.posts.length} posts)`);
  } catch (err) {
    logError(`Failed to load data.json: ${err.message}`);
    process.exit(1);
  }

  // 2. Check for duplicate IDs
  const ids = new Set();
  for (const post of dataJson.posts) {
    if (ids.has(post.id)) {
      logError(`Duplicate post ID: ${post.id}`);
      errorCount++;
    }
    ids.add(post.id);
  }

  // 3. Validate each post
  for (const post of dataJson.posts) {
    logInfo(`Validating post: ${post.id}`);

    // 3a. Check markdown file exists
    const mdPath = path.join(POSTS_DIR, `${post.id}.md`);
    if (!fs.existsSync(mdPath)) {
      logError(`  Missing markdown: ${post.id}.md`);
      errorCount++;
      continue;
    }

    // 3b. Check date format
    if (!isValidISODate(post.date)) {
      logError(`  Invalid date format: ${post.date} (expected YYYY-MM-DD)`);
      errorCount++;
    }

    // 3c. Parse front-matter
    try {
      const mdContent = fs.readFileSync(mdPath, 'utf-8');
      const { metadata, error } = parseFrontMatter(mdContent);

      if (error) {
        logWarning(`  Front-matter parsing issue: ${error}`);
        warningCount++;
      } else if (!metadata) {
        logError(`  Could not parse front-matter`);
        errorCount++;
      } else {
        // 3d. Check required front-matter fields
        const requiredFields = ['id', 'title', 'date', 'excerpt'];
        for (const field of requiredFields) {
          if (!metadata[field]) {
            logWarning(`  Missing front-matter field: ${field}`);
            warningCount++;
          }
        }

        // 3e. Check ID consistency
        if (metadata.id && metadata.id !== post.id) {
          logError(`  Front-matter ID mismatch: ${metadata.id} vs ${post.id}`);
          errorCount++;
        }

        // 3f. Check category consistency (if present)
        if (metadata.categories && post.categories) {
          const mdCats = metadata.categories.sort().join(',');
          const djCats = post.categories.sort().join(',');
          if (mdCats !== djCats) {
            logWarning(`  Categories mismatch: data.json=[${djCats}] vs front-matter=[${mdCats}]`);
            warningCount++;
          }
        }
      }
    } catch (err) {
      logError(`  Error reading markdown: ${err.message}`);
      errorCount++;
    }

    // 3g. Check thumbnail exists (optional but recommended)
    if (post.thumbnail) {
      const thumbPath = path.join(WORKSPACE_ROOT, post.thumbnail);
      if (!fs.existsSync(thumbPath)) {
        logWarning(`  Thumbnail not found: ${post.thumbnail}`);
        warningCount++;
      }
    }
  }

  // 4. Check for orphaned markdown files
  try {
    const mdFiles = fs.readdirSync(POSTS_DIR)
      .filter(f => f.endsWith('.md') && f !== 'TEMPLATE.md');

    for (const file of mdFiles) {
      const id = file.replace('.md', '');
      if (!ids.has(id)) {
        logWarning(`Orphaned markdown file: ${file} (not in data.json)`);
        warningCount++;
      }
    }
  } catch (err) {
    logError(`Error checking markdown directory: ${err.message}`);
  }

  // 5. Summary
  console.log(`\n${colors.blue}=== SUMMARY ===${colors.reset}`);
  console.log(`Total posts: ${dataJson.posts.length}`);
  logSuccess(`Errors: ${errorCount}`);
  logSuccess(`Warnings: ${warningCount}`);

  if (errorCount === 0 && warningCount === 0) {
    logSuccess('All validations passed! ✨');
    console.log('');
    process.exit(0);
  } else if (errorCount === 0) {
    logInfo('All critical checks passed, but review warnings above.');
    console.log('');
    process.exit(0);
  } else {
    logError('Validation failed! Please fix errors above.');
    console.log('');
    process.exit(1);
  }
}

// Run validation
validate().catch(err => {
  logError(`Unexpected error: ${err.message}`);
  process.exit(1);
});

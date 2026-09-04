#!/usr/bin/env node
/**
 * Test & validation harness for google-play-policy-review skill evals.
 */

const fs = require('fs');
const path = require('path');

const evalsDir = __dirname;
const skillDir = path.resolve(evalsDir, '..');
const evalsJsonPath = path.join(evalsDir, 'evals.json');
const evalMetadataPath = path.join(evalsDir, 'eval_metadata.json');

console.log('🔍 Running google-play-policy-review eval validation...\n');

let failed = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failed = true;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Verify evals.json structure
assert(fs.existsSync(evalsJsonPath), 'evals.json exists');
if (fs.existsSync(evalsJsonPath)) {
  try {
    const evalsData = JSON.parse(fs.readFileSync(evalsJsonPath, 'utf8'));
    assert(evalsData.skill_name === 'google-play-policy-review', 'skill_name is google-play-policy-review');
    assert(Array.isArray(evalsData.evals) && evalsData.evals.length > 0, `Contains ${evalsData.evals?.length || 0} eval cases`);
    
    evalsData.evals.forEach((ev) => {
      assert(ev.id && ev.prompt && ev.expected_output, `Eval case #${ev.id} has prompt and expected output`);
    });
  } catch (err) {
    assert(false, `evals.json is valid JSON: ${err.message}`);
  }
}

// 2. Verify eval_metadata.json structure
assert(fs.existsSync(evalMetadataPath), 'eval_metadata.json exists');

// 3. Verify core SKILL.md and references
const skillMdPath = path.join(skillDir, 'SKILL.md');
assert(fs.existsSync(skillMdPath), 'SKILL.md exists');

const requiredRefs = [
  'policy-core.md',
  'ads-monetization.md',
  'framework-guides.md',
  'native-checks.md',
  'cross-platform-checks.md',
  'recovery-appeals.md'
];

requiredRefs.forEach((ref) => {
  const refPath = path.join(skillDir, 'references', ref);
  assert(fs.existsSync(refPath), `Reference guide exists: references/${ref}`);
});

console.log('\n----------------------------------------');
if (failed) {
  console.error('❌ Some evaluations or integrity checks failed.');
  process.exit(1);
} else {
  console.log('🎉 All skill integrity and evaluation checks passed!');
  process.exit(0);
}

const fs = require('fs');
const path = require('path');

const lockPath = path.resolve(process.cwd(), '.next', 'dev', 'lock');

try {
  if (fs.existsSync(lockPath)) {
    fs.unlinkSync(lockPath);
    console.log('Removed Next dev lock:', lockPath);
  } else {
    console.log('No Next dev lock found at:', lockPath);
  }
} catch (err) {
  console.error('Failed to remove Next dev lock:', err);
  process.exitCode = 1;
}

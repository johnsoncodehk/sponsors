const sponsors = require('./sponsors.json');
const out = {}

for (const { sponsor, monthlyDollars } of sponsors) {
    if (sponsor.type !== 'Organization') {
        continue;
    }
    let cnt = 0
    if (monthlyDollars < 200) {
        cnt = Math.floor(monthlyDollars / 20)
    } else if (monthlyDollars < 1000) {
        cnt = Math.floor(monthlyDollars / 16.6)
    } else {
        cnt = Math.floor(monthlyDollars / 14.2)
    }
    if (cnt) {
        out[sponsor.login] = cnt;
    }
}

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'members.json');

fs.writeFile(filePath, JSON.stringify(out, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('File written successfully:', filePath);
    }
});

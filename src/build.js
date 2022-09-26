// Require libraries.
const exp = require('constants');
const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');
const klawSync = require('klaw-sync');

// Set constants.
const emojiCheck = '\u2714';
const emojiCross = '\u274C';
const emojiStar = '\u2728';
const emojiExclaim = '\u2757';
const emojiFolder = '\u{1F4C1}';
const emojiFile = '\u{1F4C4}';

// Print header.
console.log('[SYKEBEN.GITHUB.IO] BUILD SCRIPT');
console.log('(c)2022 - Benjamin Sykes.');
console.log('');

// 1A: Generate runtime configuration.
console.log('1A: Generating runtime configuration...');
const srcRoot = path.normalize(__dirname);                        // Source code root directory.
console.log(`${emojiStar}\tSrcRoot \t\t${srcRoot}`);
const blocksRoot = path.join(srcRoot, 'blocks');                  // EJS blocks root directory.
console.log(`${emojiStar}\tBlocksRoot\t\t${blocksRoot}`);
const pagesRoot = path.join(srcRoot, 'pages');                    // EJS pages root directory.
console.log(`${emojiStar}\tPagesRoot\t\t${pagesRoot}`);
const staticRoot = path.join(srcRoot, 'static');                  // Static root directory.
console.log(`${emojiStar}\tStaticRoot\t\t${staticRoot}`);
const resourcesRoot = path.join(srcRoot, 'resources');            // EJS resources root directory.
console.log(`${emojiStar}\tResourcesRoot\t\t${resourcesRoot}`);
const srcOutput = path.join(srcRoot, '..', 'docs');               // Source output root directory.
console.log(`${emojiStar}\tSrcOutput\t\t${srcOutput}`);
const pagesOutput = path.join(srcOutput, 'pages');                // EJS pages output root directory.
console.log(`${emojiStar}\tPagesOutput\t\t${pagesOutput}`);
const resourcesOutput = path.join(srcOutput, 'resources');        // EJS resources output root directory.
console.log(`${emojiStar}\tResourcesOutput\t\t${resourcesOutput}`);
let errors = new Array();                                         // Errors generated during build.
console.log('');

// 2A: Clear old resource(s).
if (fs.existsSync(resourcesOutput)) {
    console.log('2A: Clearing old resource(s)...');
    console.log(`${emojiCheck}\tRemoved ${klawSync(resourcesOutput).length} object(s).`);
    fs.removeSync(resourcesOutput);
    console.log('');
}

// 2B: Copy new resource(s).
console.log('2B: Copying new resource(s)...');
fs.copySync(resourcesRoot, resourcesOutput, {
    filter: (src, dest) => {

        // Get stats.
        let stats = fs.statSync(src);
        let isFile = stats.isFile();

        // Trim source.
        let srcTrimmed = src.substr(resourcesRoot.length + 1);

        // Print message.
        console.log(`${emojiCheck}\t${isFile ? emojiFile : emojiFolder}${srcTrimmed}${isFile ? '' : path.sep}`);

        // Return.
        return true;

    }
});
console.log('');

// 3A: Clear old page(s), if needed.
if (fs.existsSync(pagesOutput)) {
    console.log('3A: Clearing old page(s)...');
    console.log(`${emojiCheck}\tRemoved ${klawSync(pagesOutput).length} object(s).`);
    fs.removeSync(pagesOutput);
    console.log('');
}

// 3B: Copy new static page(s).
console.log('3B: Copying new static page(s)...');
fs.copySync(staticRoot, srcOutput, {
    filter: (src, dest) => {

        // Get stats.
        let stats = fs.statSync(src);
        let isFile = stats.isFile();

        // Trim source.
        let srcTrimmed = src.substr(staticRoot.length + 1);

        // Print message.
        console.log(`${emojiCheck}\t${isFile ? emojiFile : emojiFolder}${srcTrimmed}${isFile ? '' : path.sep}`);

        // Return.
        return true;

    }
});
console.log('');

// 3C: Render new dynamic page(s).
console.log('3C: Rendering new dynamic page(s)...');
klawSync(pagesRoot, { nodir: true }).forEach((object, index) => {

    // Get information.
    let src = object.path;
    let stats = object.stats;

    // Trim source.
    let srcTrimmed = src.substr(pagesRoot.length + 1);

    // Generate output path.
    let out = path.join(pagesOutput, srcTrimmed.substr(0, srcTrimmed.length - path.extname(srcTrimmed).length) + '.html');
    let outTrimmed = out.substr(pagesOutput.length + 1);

    // Create directory structure, if needed.
    fs.mkdirsSync(path.dirname(out));

    // Generate resource path.
    let res = '';
    for (let i = 0; i < outTrimmed.split(path.sep).length; i++) {
        res += '../'
    }
    res += 'resources'

    // Render page.
    ejs.renderFile(src, {

        // Resource root.
        res: res

    }, {

        // Root is source root.
        root: srcRoot,

        // Views includes blocks root.
        views: [
            blocksRoot
        ]

    }, (err, str) => {

        // Error override.
        if (err) {
            console.log(`${emojiCross}\t${srcTrimmed}`);
            errors.push({
                error: err,
                step: '3C',
                file: srcTrimmed
            });
            return;
        }

        // Write output.
        fs.writeFileSync(out, str);
        console.log(`${emojiCheck}\t${srcTrimmed} => ${outTrimmed}`);

    });

});
console.log('');

// Final.
console.log(`[COMPLETE] ${errors.length > 0 ? errors.length : 'No'} error(s).`)
if (errors.length > 0) {

    // Print errors.
    errors.forEach((object, index) => {
        console.log(`${emojiExclaim}\t${object.step} (${object.file}) - ${object.error}`);
    })

} else {

    // Print message.
    console.log(`${emojiStar}\tAll done!`);

}
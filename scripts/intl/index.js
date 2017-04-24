/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2017 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

/**
 * Import dependencies.
 */
const fs = require('fs');
const path = require('path');
const globSync = require('glob').sync;
const rimraf = require('rimraf');
const webpack = require('webpack');
const config = require('./webpack.config');
const R = require('ramda');

/**
 * Read already existing PO files.
 */
function readPO(filename) {
  const file = fs.readFileSync(filename, 'utf8');
  let lines = file.trim().match(/\S.*\r?\n?|[\r?\n].*?/g);
  if (!lines) {
    return {};
  }
  let translations = [{
    msgctxt: null,
    prevMsgctxt: null,
    lines: {
      translatorComments: [],
      extractedComments: [],
      reference: [],
      msgid: [],
      msgstr: [],
      prevMsgid: null
    }
  }];
  for (let i = 0, j = 0; i < lines.length; i++) {
    if (lines[i][0] === '\n') {
      j++;
      translations.push({
        msgctxt: null,
        prevMsgctxt: null,
        lines: {
          translatorComments: [],
          extractedComments: [],
          reference: [],
          msgid: [],
          msgstr: [],
          prevMsgid: null
        }
      });
      while (lines[++i][0] === '\n');
    }
    if (/^#\s\s?(\S.*)/g.test(lines[i])) {
      translations[j].lines.translatorComments.push(/^#\s\s?(\S.*)/g.exec(lines[i])[1]);
      continue;
    }
    if (/^#\. (\S.*)/g.test(lines[i])) {
      translations[j].lines.extractedComments.push(/^#\. (\S.*)/g.exec(lines[i])[1]);
      continue;
    }
    if (/^#: (\S.*)/g.test(lines[i])) {
      translations[j].lines.reference.push(/^#: (\S.*)/g.exec(lines[i])[1]);
      continue;
    }
    if (/^msgctxt "(\S.*)"/g.exec(lines[i])) {
      translations[j].msgctxt = /^msgctxt "(\S.*)"/g.exec(lines[i])[1];
      continue;
    }
    let msgid = /^msgid "(\S.*)?"/g.exec(lines[i]);
    if (msgid) {
      translations[j].lines.msgid.push(!msgid[1] ? "" : msgid[1]);
      while (/^\s*"(\S.*)"/g.test(lines[++i])) {
        translations[j].lines.msgid.push(/\s*"(\S.*)"/g.exec(lines[i])[1]);
      }
    }
    let msgstr = /^msgstr "(\S.*)?"/g.exec(lines[i]);
    if (msgstr) {
      translations[j].lines.msgstr.push(!msgstr[1] ? "" : msgstr[1]);
      while (/^\s*"(\S.*)"/g.test(lines[++i])) {
        translations[j].lines.msgstr.push(/\s*"(\S.*)"/g.exec(lines[i])[1]);
      }
      i--;
    }
  }
  let reducedTranslations = R.reduce((a, b) => {
    if(!b.lines.msgid.length || !b.lines.msgid[0].length) {
      console.log('Ignoring empty [msgid]. This was most likely generated as a comment from a translation tool.');
      return a;
    }
    if (b.msgctxt)
      a[b.msgctxt] = b;
    else
      console.error(`Error! Missing [msgctxt] for [msgid]: ${b.lines.msgid}`);
    return a;
  }, {}, translations);

  return reducedTranslations;
}

/**
 * Read the extracted translations.
 */
function readExtract() {
  let reducedTranslations = {};
  globSync(path.join(__dirname, './src/**/*.json'))
    .forEach(filename => {
      const reference = path.relative(path.join(__dirname, './src'), filename);
      const source = JSON.parse(fs.readFileSync(filename, 'utf8'));
      source.map(translation => {
        reducedTranslations[translation.id] = {
          msgctxt: translation.id,
          prevMsgctxt: null,
          lines: {
            translatorComments: [],
            extractedComments: translation.description.match(/\S.*\n?/g).map(m => m.replace('\n', '')),
            reference: [reference],
            msgid: translation.defaultMessage.match(/\S.*\n?/g).map(m => m.replace('\n', '\\n')),
            msgstr: [],
            prevMsgid: null,
          }
        };
        if (reducedTranslations[translation.id].lines.msgid.length > 1) {
          reducedTranslations[translation.id].lines.msgid.unshift("");
        }
      });
    });
  return reducedTranslations;
}

/**
 * Merge the extracted translations and the existing PO files.
 */
function mergeExtractAndPo(reducedExtract, reducedPo) {
  let merged = R.mergeWith((a, b) => {
    let m = R.assocPath(['lines', 'translatorComments'], b.lines.translatorComments, a);
    m = R.assocPath(['lines', 'msgstr'], b.lines.msgstr, m);
    if (!R.equals(m.lines.msgid, b.lines.msgid)) {
      // #| msgctxt previous-context
      // #| msgid previous-untranslated-string
      m = R.assocPath(['lines', 'prevMsgid'], b.lines.msgid, m);
      m = R.assoc('prevMsgctxt', b.msgctxt, m);
    }
    return m;
  }, reducedExtract, reducedPo);
  return merged;
}

/**
 * Write the merged result into new PO files.
 */
function writePO(merged, filename) {
  let output = '';
  output += R.values(merged).map(translation => {
    let t = '';
    t += translation.lines.translatorComments.length > 0 ? translation.lines.translatorComments.map(x => `# ${x}`).join('\n') + '\n' : '';
    t += translation.lines.extractedComments.length > 0 ? translation.lines.extractedComments.map(x => `#. ${x}`).join('\n') + '\n' : '';
    t += translation.lines.reference.length > 0 ? translation.lines.reference.map(x => `#: ${x}`).join('\n') + '\n' : '';
    t += translation.prevMsgctxt ? `#| msgctxt "${translation.prevMsgctxt}"\n` : '';
    t += translation.prevMsgctxt ? '#| msgid ' + translation.lines.prevMsgid.map((x, i) => `${i ? '#| ' : ''}"${x}"`).join('\n') + '\n' : '';
    t += `msgctxt "${translation.msgctxt}"\n`;
    t += translation.lines.msgid.length > 0 ? 'msgid ' + translation.lines.msgid.map(x => `"${x}"`).join('\n') + '\n' : '';
    t += translation.lines.msgstr.length > 0 ? 'msgstr ' + translation.lines.msgstr.map(x => `"${x}"`).join('\n') + '\n' : 'msgstr ""\n';
    return t;
  }).join('\n');
  fs.writeFileSync(filename, output);
}

/**
 * Update all existing PO files.
 */
function updateAllPOs() {
  let reducedExtract = readExtract();
  globSync(path.join(__dirname, '../../translations/**/*.po'))
    .forEach(filename => writePO(mergeExtractAndPo(reducedExtract, readPO(filename)), filename));
}

/**
 * Webpack callback.
 */
const callback = function (err, stats) {
  if (err) {
    console.error(err.toString());
  } else {
    updateAllPOs();
    rimraf(path.join(__dirname, './dist'), (err) => {
      if (err) {
        console.error(err);
      }
    });
    rimraf(path.join(__dirname, './src'), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

/**
 * Import new translations into the build files.
 */
function importTranslations(theme) {
  globSync(path.join(__dirname, `../../translations/${theme}/*.po`))
    .forEach(filename => {
      let po = readPO(filename);
      let output = R.reduce((a, b) => {
        a[b.msgctxt] = b.lines.msgstr.map(s => s.replace('\\n', '')).join('\n');
        return a;
      }, {}, R.values(po));
      fs.writeFileSync(path.join(__dirname, `../../public/assets/translations/${path.basename(filename).replace('.po', '.json')}`), JSON.stringify(output));
    });
}

/**
 * Import: npm run po:export
 * Export: npm run po:import visa
 */
if (process.argv.length === 3 && process.argv[2] === 'export') {
  webpack(config(), callback);
} else if (process.argv.length === 4 && process.argv[2] === 'import') {
  importTranslations(process.argv[3]);
} else {
  console.error(`Please specify [export] | [import theme]!`);
}

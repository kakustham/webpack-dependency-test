const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

module.exports = function(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      ImportDeclaration(path) {
        if (t.isStringLiteral(path.node.source)) {
          const result = readFileSync(require.resolve(path.node.source.value), 'utf-8');
          writeFileSync(join(__dirname, 'output.txt'), result);
          path.parentPath.addComment('trailing', ` dependency: ${path.node.source.value} `);
        }
      }
    }
  };
}

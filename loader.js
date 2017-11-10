const path = require('path');

module.exports = function(content) {
  this.cacheable();

  content.split('\n').forEach(line => {
    if (line.startsWith('/* dependency: ')) {
      this.addDependency(path.resolve(path.dirname(this.resourcePath), line.split(' ')[2]));
    }
  });

  // this.addDependency();
  return content;
};

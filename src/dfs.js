import {
  mkfile, mkdir, getChildren, getName, isFile,
} from '@hexlet/immutable-fs-trees';

/**
 * Depth-first search (dfs)
 *
 * recursive tree traversal
 *
 */

// Listing the names of all nodes
const tree = mkdir('home', [
  mkdir('etc', [
    mkfile('bashrc'),
    mkfile('consul.cfg'),
  ]),
  mkfile('hexletrc'),
  mkdir('bin', [
    mkfile('ls'),
    mkfile('cat'),
  ]),
]);

const dfs = (node) => {
  console.log(getName(node));
  if (isFile(node)) {
    return;
  }
  const children = getChildren(node);
  children.forEach(dfs);
};
console.dir(dfs(tree), { depth: null });
// home
// etc
// bashrc
// consul.cfg
// hexletrc
// bin
// ls
// cat

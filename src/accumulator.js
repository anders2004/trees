import {
  mkfile, mkdir, getChildren, getName, isFile, isDirectory,
} from '@hexlet/immutable-fs-trees';
import path from 'path';

/**
 * Data aggregation
 *
 * recursive data aggregation with a special parameter - accumulator
 * accumulator collects required data during tree traversal
 *
 */

// Find all empty directories in file system ( Basic example )
const tree = mkdir('home', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf'),
    ]),
    mkdir('consul', [
      mkfile('config.json'),
      mkdir('data'),
    ]),
  ]),
  mkdir('logs'),
  mkfile('hosts'),
]);

const findEmptyDirPaths = (node) => {
  const name = getName(node);
  const children = getChildren(node);
  if (children.length === 0) return name;

  const emptyDirNames = children
    .filter(isDirectory)
    .flatMap(findEmptyDirPaths);

  return emptyDirNames;
};
console.log(findEmptyDirPaths(tree)); // [ 'apache', 'data', 'logs' ]

// Find all empty directories in file system
// add the second parameter, it specifies the maximum depth
const findEmptyDirs = (node, maxDepth = Infinity) => {
  const iter = (iterNode, depth) => {
    const name = getName(iterNode);
    const children = getChildren(iterNode);
    if (children.length === 0) return name;
    if (depth === maxDepth) return [];
    return children.filter(isDirectory)
      .flatMap((child) => iter(child, depth + 1));
  };
  return iter(node, 0);
};
console.log(findEmptyDirs(tree, 2)); // [ 'apache', 'logs' ]

// The function takes two parameters: a tree and a substring
// returns a list of files whose names contain this substring.
// returns full paths to files
const tree2 = mkdir('home', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf', { size: 800 }),
    ]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

const findFilesByName = (node, substr) => {
  const iter = (iterNode, ancestry) => {
    const name = getName(iterNode);
    const newAncestry = path.join(ancestry, name);
    if (isFile(iterNode)) {
      return name.includes(substr) ? newAncestry : [];
    }
    const children = getChildren(iterNode);
    return children.flatMap((child) => iter(child, newAncestry));
  };
  return iter(tree, '');
};
console.log(findFilesByName(tree2, 'co'));
// [ 'home/etc/nginx/nginx.conf', 'home/etc/consul/config.json' ]

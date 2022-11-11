import _ from 'lodash';
import {
  mkfile, mkdir, getChildren, getName, isFile, isDirectory,
} from '@hexlet/immutable-fs-trees';

/**
 * Data aggregation
 *
 * recursive data aggregation
 *
 */

// Сounting the number of files and directories at all nesting levels
const tree = mkdir('/', [
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

const getNodesCount = (node) => {
  if (isFile(node)) return 1;

  const children = getChildren(node);
  const descendantCounts = children.map(getNodesCount);
  return 1 + _.sum(descendantCounts);
};
console.log(getNodesCount(tree)); // 8

// Сounting the number of hidden files at all nesting levels
// names of hidden files start with a '.', for example '.config.json'
const tree2 = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('.nginx.conf', { size: 800 }),
    ]),
    mkdir('.consul', [
      mkfile('.config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('.hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

const getHiddenFilesCount = (node) => {
  const name = getName(node);
  if (isFile(node)) return name.startsWith('.') ? 1 : 0;

  const children = getChildren(node);
  const hiddenFilesCount = children.map(getHiddenFilesCount);
  return _.sum(hiddenFilesCount);
};
console.log(getHiddenFilesCount(tree2)); // 3

// The function returns a list directories of the first level of nesting
// and the number of files inside each of them, including all subdirectories
const tree3 = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf'),
    ]),
  ]),
  mkdir('consul', [
    mkfile('config.json'),
    mkfile('file.tmp'),
    mkdir('data'),
  ]),
  mkfile('hosts'),
  mkfile('resolve'),
]);

const getFilesCount = (node) => {
  if (isFile(node)) return 1;
  const children = getChildren(node);
  const descendantCount = children.map(getFilesCount);
  return _.sum(descendantCount);
};

const getSubdirectoriesInfo = (node) => {
  const children = getChildren(node);
  const result = children
    .filter(isDirectory)
    .map((child) => [getName(child), getFilesCount(child)]);
  return result;
};

console.log(getSubdirectoriesInfo(tree3)); // [ [ 'etc', 1 ], [ 'consul', 2 ] ]

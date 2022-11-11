import _ from 'lodash';
import {
  mkfile, mkdir, getChildren, getName, isFile,
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

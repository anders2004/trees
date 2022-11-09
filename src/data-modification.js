import _ from 'lodash';
import {
  mkfile, mkdir, getChildren, getMeta, getName, isFile,
} from '@hexlet/immutable-fs-trees';

/**
 * Data modification
 *
 * recursive data modification
 *
 */

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

const changeOwner = (node, owner) => {
  const name = getName(node);
  const newMeta = _.cloneDeep(getMeta(node));
  newMeta.owner = owner;
  if (isFile(node)) {
    return mkfile(name, newMeta);
  }
  const children = getChildren(node);
  const newChildren = children.map((child) => changeOwner(child, owner));
  const newTree = mkdir(name, newChildren, newMeta);
  return newTree;
};

console.dir(changeOwner(tree, 'anders'), { depth: null });
// {
//   name: '/',
//     children: [
//   {
//     name: 'etc',
//     children: [
//       { name: 'bashrc', meta: { owner: 'anders' }, type: 'file' },
//       { name: 'consul.cfg', meta: { owner: 'anders' }, type: 'file' }
//     ],
//     meta: { owner: 'anders' },
//     type: 'directory'
//   },
//   { name: 'hexletrc', meta: { owner: 'anders' }, type: 'file' },
//   {
//     name: 'bin',
//     children: [
//       { name: 'ls', meta: { owner: 'anders' }, type: 'file' },
//       { name: 'cat', meta: { owner: 'anders' }, type: 'file' }
//     ],
//     meta: { owner: 'anders' },
//     type: 'directory'
//   }
// ],
//   meta: { owner: 'anders' },
//   type: 'directory'
// }

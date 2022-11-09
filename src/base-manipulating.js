import _ from 'lodash';
import {
  mkfile, mkdir, getChildren, getMeta, getName, isFile, isDirectory,
} from '@hexlet/immutable-fs-trees';

/**
 * Treatment
 *
 * processing in an immutable style is reduced to the
 * formation of new data based on old ones
 *
 */

// Change filename
const file = mkfile('one', { size: 35 });
const newMeta = _.cloneDeep(getMeta(file)); // important to save metadata
const newFile = mkfile('new name', newMeta);
console.log(newFile); // { name: 'new name', meta: { size: 35 }, type: 'file' }

// Sort the contents of a directory
const tree = mkdir('home', [
  mkfile('one'),
  mkfile('two'),
  mkdir('three'),
]);

const children = getChildren(tree);
const newDirMeta = _.cloneDeep(getMeta(tree));
const newChildren = [...children].reverse();
const newTree = mkdir(getName(tree), newChildren, newDirMeta);
console.log(newTree);
// {
//   name: 'home',
//     children: [
//   { name: 'three', children: [], meta: {}, type: 'directory' },
//   { name: 'two', meta: {}, type: 'file' },
//   { name: 'one', meta: {}, type: 'file' }
// ],
//   meta: {},
//   type: 'directory'
// }

// Lowercase directory and filenames
const tree2 = mkdir('home', [
  mkfile('oNe'),
  mkfile('Two'),
  mkdir('THREE'),
]);

const children2 = getChildren(tree2);
const newChildren2 = children2.map((child) => {
  const name2 = getName(child);
  const newMeta2 = _.cloneDeep(getMeta(child));
  if (isDirectory(child)) {
    return mkdir(name2.toLowerCase(), getChildren(child), newMeta2);
  }
  return mkfile(name2.toLowerCase(), newMeta2);
});
const newMeta2 = _.cloneDeep(getMeta(tree2));
const newTree2 = mkdir(getName(tree2), newChildren2, newMeta2);
console.dir(newTree2, { depth: null });
// {
//   name: 'home',
//     children: [
//   { name: 'one', meta: {}, type: 'file' },
//   { name: 'two', meta: {}, type: 'file' },
//   { name: 'three', children: [], meta: {}, type: 'directory' }
// ],
//   meta: {},
//   type: 'directory'
// }

// Deleting files inside a directory
const tree3 = mkdir('home', [
  mkfile('one'),
  mkfile('two'),
  mkdir('three'),
]);

const children3 = getChildren(tree3);
const newChildren3 = children3.filter(isDirectory);
const newMeta3 = _.cloneDeep(getMeta(tree3));
const newTree3 = mkdir(getName(tree3), newChildren3, newMeta3);
console.dir(newTree3, { depth: null });
// {
//   name: 'home',
//     children: [ { name: 'three', children: [], meta: {}, type: 'directory' } ],
//   meta: {},
//   type: 'directory'
// }

// Filter out graphic files and compress their size by half
const fileTree = mkdir('my documents', [
  mkfile('avatar.jpg', { size: 100 }),
  mkfile('passport.jpg', { size: 200 }),
  mkfile('family.jpg', { size: 150 }),
  mkfile('addresses', { size: 125 }),
  mkdir('presentations'),
]);

const compressImages = (imgTree) => {
  const treeChildren = getChildren(imgTree);
  const newTreeChildren = treeChildren.map((child) => {
    const childName = getName(child);
    if (!isFile(child) && !childName.endsWith('.jpg')) {
      return child;
    }
    const childMeta = getMeta(child);
    const newChildMeta = _.cloneDeep(childMeta);
    newChildMeta.size /= 2;
    return mkfile(childName, newChildMeta);
  });
  const newTreeMeta = _.cloneDeep(getMeta(imgTree));
  return mkdir(getName(tree), newTreeChildren, newTreeMeta);
};

console.dir(compressImages(fileTree), { depth: null });

/**
 * File representation
 *
 * @param {string} name
 * @returns Node
 * @example
 * mkfile('file-name.js');
 * // {
 * //   name: 'file-name.js',
 * //   meta: {}, // File properties
 * //   type: 'file',
 * // }
 *
 * mkfile('file-name.js', { size: 100 });
 * // {
 * //   name: 'file-name.js',
 * //   meta: { size: 100 },
 * //   type: 'file',
 * // }
 */

/**
 * Directory representation
 *
 * @param {string} name
 * @param {Object[]} children
 * @example
 * mkdir('dir-name');
 * // {
 * //   name: 'dir-name',
 * //   children: [], // Сhildren inside
 * //   meta: {},
 * //   type: 'directory',
 * // }
 *
 * mkdir('dir-name', [mkfile('file1'), mkfile('file2')], { owner: 'owner' });
 * // {
 * //   name: 'dir-name',
 * //   children: [
 * //     { name: 'file1', meta: {}, type: 'file' },
 * //     { name: 'file2', meta: {}, type: 'file' }
 * //   ],
 * //   meta: { owner: 'owner' },
 * //   type: 'directory',
 * // }
 */

/**
 * Сreating a simple tree
 *
 */

import {
  mkfile, mkdir, getName, getMeta, getChildren, isDirectory, isFile,
} from '@hexlet/immutable-fs-trees';

const createTree = () => {
  const tree = mkdir('nodejs-package', [
    mkfile('Makefile'),
    mkfile('README.md'),
    mkdir('dist'),
    mkdir('__tests__', [
      mkfile('half.test.js', { type: 'text/javascript' }),
    ]),
    mkfile('babel.config.js', { type: 'text/javascript' }),
    mkdir('node_modules', [
      mkdir('@babel', [
        mkdir('cli', [
          mkfile('LICENSE'),
        ]),
      ]),
    ], { owner: 'root', hidden: false }),
  ], { hidden: true });

  return tree;
};

console.dir(createTree(), { depth: null });

/**
 * Base operations
 *
 * extract data from already created files and directories
 *
 */

const tree = mkdir('home', [mkfile('hexlet.log')], { hidden: true });
console.log(getName(tree)); // 'home'
console.log(getMeta(tree).hidden); // true

const [file] = getChildren(tree);
console.log(getName(file)); // 'hexlet.log'

// The file has no metadata
console.log(getMeta(file).unknown); // undefined

// Files do not have children
console.log(getChildren(file)); // undefined

// Type checking
console.log(isDirectory(tree)); // true
console.log(isFile(tree)); // false

console.log(isFile(file)); // true
console.log(isDirectory(file)); // false

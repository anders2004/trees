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

import { mkfile, mkdir } from '@hexlet/immutable-fs-trees';

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

export default createTree;

console.dir(createTree(), { depth: null });

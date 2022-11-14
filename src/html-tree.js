import _ from 'lodash';

/**
 * HTML tree
 *
 * describe the html structure of the html tree
 * the elements of our tree have 4 properties: name, type, class, children
 *
 * tree nodes can be of three types:
 * tag-internal - tags that can have children, internal node
 * tag-leaf     - tags that cannot have children, leaf node
 * text         - plain text, leaf node
 *
 */
const htmlTree = {
  name: 'html',
  type: 'tag-internal',
  children: [
    {
      name: 'body',
      type: 'tag-internal',
      children: [
        {
          name: 'h1',
          type: 'tag-internal',
          children: [
            {
              type: 'text',
              content: 'Community',
            },
          ],
        },
        {
          name: 'p',
          type: 'tag-internal',
          children: [
            {
              type: 'text',
              content: 'Communication between users',
            },
          ],
        },
        {
          name: 'hr',
          type: 'tag-leaf',
        },
        {
          name: 'input',
          type: 'tag-leaf',
        },
        {
          name: 'div',
          type: 'tag-internal',
          className: 'community',
          children: [
            {
              name: 'div',
              type: 'tag-internal',
              className: 'text-xs-center',
              children: [],
            },
            {
              name: 'div',
              type: 'tag-internal',
              className: 'fa fa-spinner',
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

// Filter out all empty tags. Each node is filtered differently:
//
// tag-internal - if there are no children or all children are empty,
//                then the parent is also empty
// tag-leaf     - cannot have children, this tag is always displayed
// text         - text node cannot contain children, instead it can contain
//                text content, so filter it to empty content
const filterEmpty = (tree) => {
  const filtered = tree.children
    .map((node) => {
      if (node.type === 'tag-internal') {
        // before filtering, filter out all descendants
        return filterEmpty(node);
      }
      return node;
    })
    .filter((node) => {
      const { type } = node;
      switch (type) {
        case 'tag-internal': {
          const { children } = node;
          return children.length > 0;
        }
        case 'tag-leaf':
          return true;
        case 'text': {
          const { content } = node;
          return !!content;
        }
        default:
          return true;
      }
    });
  return { ...tree, children: filtered };
};
console.dir(filterEmpty(htmlTree), { depth: null });

// Сoncatenate the HTML-tree into a string
const buildClass = (node) => (node.className ? `class=${node.className}` : '');

const buildHtml = (node) => {
  const { type, name } = node;
  switch (type) {
    case 'tag-internal': {
      const childrenView = node.children.map(buildHtml).join('');
      return `<${name}${buildClass(node)}>${childrenView}</${name}>`;
    }
    case 'tag-leaf':
      return `<${name}${buildClass(node)}>`;
    case 'text':
      return node.content;
    default:
      return true;
  }
};
const filteredTree = filterEmpty(htmlTree);
console.log(buildHtml(filteredTree));
// <html><body><h1>Community</h1><p>Communication between users</p><hr><input></body></html>

// The function changes the class name in all nodes and returns a new html tree
const tree = {
  name: 'div',
  type: 'tag-internal',
  className: 'community',
  children: [
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
  ],
};

const changeClass = (node, classNameFrom, classNameTo) => {
  const iter = (iterNode) => {
    const updatedNode = { ...iterNode };
    if (_.has(iterNode, 'className')) {
      const newClassName = classNameFrom === iterNode.className ? classNameTo : iterNode.className;
      updatedNode.className = newClassName;
    }
    if (node.type === 'tag-internal') {
      const newChildren = iterNode.children.map(iter);
      updatedNode.children = newChildren;
    }
    return updatedNode;
  };
  return iter(tree);
};
console.dir(changeClass(tree, 'old-class', 'new-class'), { depth: null });

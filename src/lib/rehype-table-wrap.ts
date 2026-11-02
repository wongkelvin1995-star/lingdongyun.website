type El = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: El[];
};

/**
 * Rehype 插件：把文章里的每个 <table> 包进 <div class="table-wrap">，
 * 窄屏上表格在这个容器里左右滑动，不撑破页面。只改结构，不改文字。
 */
export default function rehypeTableWrap() {
  const walk = (node: El) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'table') {
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-wrap'], tabIndex: 0, role: 'region', ariaLabel: '表格' },
          children: [child],
        };
      }
      walk(child);
      return child;
    });
  };
  return (tree: El) => walk(tree);
}

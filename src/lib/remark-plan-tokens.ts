import { fillPlanTokens } from '../data/plans';

type Node = { type: string; value?: string; children?: Node[] };

/**
 * Remark 插件：把文章正文里的 {{price:chuanyun}} 等占位符替换为 plans.ts 中的实时数据。
 * 未知 id 会直接让构建失败，避免发布错误价格。
 */
export default function remarkPlanTokens() {
  const walk = (node: Node) => {
    if ((node.type === 'text' || node.type === 'html') && typeof node.value === 'string') {
      node.value = fillPlanTokens(node.value);
    }
    node.children?.forEach(walk);
  };
  return (tree: Node) => walk(tree);
}

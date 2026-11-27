import type { Category, CategoryColor } from '@/schemas/category';

export function getTagColor(
  categories: Category[],
  tagName: string,
): CategoryColor {
  let category = categories.find((c) => c.tags.includes(tagName));
  if (!category) category = categories.find((c) => c.name === 'other');
  return category?.color || 'stone';
}

import { format } from 'date-fns';
import { useState } from 'react';

import type { Category } from '../../domain/models/category';
import type { Project as ProjectModel } from '../../domain/models/project';
import Button from '../../shared/components/ui/Button';
import Tag from './Tag';
import { getTagColor } from './tag-helper';

interface Props {
  project: ProjectModel;
  categories: Category[];
  showAllTags?: boolean;
}

export default function Project({ project, categories, showAllTags }: Props) {
  const from = format(project.from, 'MMM yyyy');
  const to = project.to ? format(project.to, 'MMM yyyy') : 'Present';

  const [showAll, setShowAll] = useState(showAllTags);

  function toggleShowAll() {
    setShowAll(!showAll);
  }

  return (
    <div className="flex flex-col gap-4 rounded border border-stone-200 bg-stone-50 p-8 dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">{project.company}</span>
          <span className="text-sm font-bold">
            {from} - {to}
          </span>
        </div>

        <div className="text-sm text-pink-800 dark:text-teal-300">
          {project.title}
        </div>
      </div>

      <p>{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {(showAll ? project.tags : project.tags.slice(0, 5)).map(
          (tag: string) => (
            <Tag key={tag} label={tag} color={getTagColor(categories, tag)} />
          ),
        )}

        {!showAllTags && project.tags.length > 5 && (
          <Button
            text={showAll ? 'Show less' : 'Show all'}
            onClick={toggleShowAll}
          />
        )}
      </div>
    </div>
  );
}

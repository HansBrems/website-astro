import { format } from 'date-fns';
import { useState } from 'react';

import type { Category } from '../shared/models/category';
import type { Project } from '../shared/models/project';
import { getTagColor } from '../utils/tag-helper';
import Button from './Button';
import Tag from './Tag';

interface Props {
  project: Project;
  categories: Category[];
  showAllTags?: boolean;
}

export default function WorkExperience({
  project,
  categories,
  showAllTags,
}: Props) {
  const from = format(project.from, 'MMM yyyy');
  const to = format(project.to, 'MMM yyyy');

  const [showAll, setShowAll] = useState(showAllTags);

  function toggleShowAll() {
    setShowAll(!showAll);
  }

  return (
    <div className="flex flex-col gap-4 rounded border border-stone-200 bg-[#fdfdfd] p-8 dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">{project.company}</span>
          <span className="text-sm">
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
            <Tag name={tag} color={getTagColor(categories, tag)} />
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

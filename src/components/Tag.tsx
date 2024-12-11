export interface Props {
  color: string;
  name: string;
}

export default function Tag({ color, name}: Props) {
  return (
    <div
      className={`flex items-center border-solid p-2
      text-xs font-bold text-stone-700 dark:text-stone-100
      bg-stone-50 dark:bg-stone-800 rounded-md
      border-b-[1px] border-${color}-500  dark:border-${color}-500 `}
    >
      {name}
    </div>
  )
}

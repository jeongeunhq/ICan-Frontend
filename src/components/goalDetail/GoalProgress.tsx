import { motion } from 'framer-motion';

interface Props {
  doneItems: number;
  todoItems: number;
  color: {
    100: string;
    DEFAULT: string;
  };
}

export default function GoalProgress({ doneItems, todoItems, color }: Props) {
  const progress = (doneItems / (todoItems + doneItems)) * 100 || 0;

  return (
    <div className="relative px-6">
      <p className="mt-4 text-18SB text-gsBk">진행도</p>
      <div className="mt-5 flex justify-end">
        <h3 className="text-40L text-gsBk">{progress.toFixed(0)}%</h3>
      </div>

      <div className="relative mt-5">
        <div className="absolute top-0 -translate-y-7">
          <span className="text-14SB text-gs500">
            <span style={{ color: color.DEFAULT }}>{doneItems}</span>/
            {todoItems + doneItems}
          </span>
        </div>

        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-7">
          <span className="text-12SB text-gs300">50%</span>
        </div>

        <div className="relative h-5 w-full overflow-hidden rounded-full bg-gs200">
          <motion.div
            className="h-5 rounded-full"
            data-testid="progress-bar"
            style={{ backgroundColor: color.DEFAULT, width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          <div className="absolute left-1/2 top-0 h-full -translate-x-1/2">
            <div className="h-full border-l border-dashed border-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

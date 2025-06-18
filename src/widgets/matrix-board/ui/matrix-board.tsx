import { TaskStatus } from '@/entities/task/model/types'
import { MatrixCell } from '@/widgets/matrix-board/ui/matrix-cell'

export function MatrixBoard() {
  return (
    <div className="grid grid-rows-[1rem_1fr_1fr] grid-cols-[1rem_1fr_1fr] gap-2 p-4">
      <span className="text-center text-sm font-semibold row-start-1 row-end-2 col-start-2 col-end-3">
        Urgent
      </span>
      <span className="text-center text-sm font-semibold row-start-1 row-end-2 col-start-3 col-end-4">
        Not Urgent
      </span>
      <span className="text-center text-sm font-semibold row-start-2 row-end-3 col-start-1 col-end-2 [writing-mode:sideways-lr] ">
        Important
      </span>
      <span className="text-center text-sm font-semibold row-start-3 row-end-4 col-start-1 col-end-2 [writing-mode:sideways-lr]">
        Not Important
      </span>
      <MatrixCell
        status={TaskStatus.UrgentImportant}
        className="row-start-2 row-end-3 col-start-2 col-end-3"
      />
      <MatrixCell
        status={TaskStatus.NotUrgentImportant}
        className="row-start-2 row-end-3 col-start-3 col-end-4"
      />
      <MatrixCell
        status={TaskStatus.UrgentNotImportant}
        className="row-start-3 row-end-4 col-start-2 col-end-3"
      />
      <MatrixCell
        status={TaskStatus.NotUrgentNotImportant}
        className="row-start-3 row-end-4 col-start-3 col-end-4"
      />
    </div>
  )
}

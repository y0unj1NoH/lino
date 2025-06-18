import { useTaskStore } from '@/entities/task/model/slice'

export const useAddTask = () => {
  const addTask = useTaskStore((state) => state.addTask)
  const setSortingStatus = useTaskStore((state) => state.setSortingStatus)
  const sortingStatus = useTaskStore((state) => state.sortingStatus)

  return (content: string, isToday = false) => {
    addTask(content, isToday)

    if (isToday && sortingStatus === 'SORTED') {
      setSortingStatus('ADDITIONAL')
    }
  }
}

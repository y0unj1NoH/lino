import { SortingButton } from '@/features/task/sort/ui/sorting-button'
import { formatDateToEnglish, getCurrentDate } from '@/shared/lib/date'
import { Header } from '@/shared/ui/header'
import { ThemeToggle } from '@/shared/ui/theme-toggle'
import { MatrixBoard } from '@/widgets/matrix-board/ui/matrix-board'

function HomeHeader() {
  return (
    <Header>
      <Header.Left>
        <Header.Logo>Lino</Header.Logo>
      </Header.Left>
      <Header.Right>
        <Header.Date>{formatDateToEnglish(getCurrentDate())}</Header.Date>
        <ThemeToggle size="sm" className="rounded-full shadow-none" />
      </Header.Right>
    </Header>
  )
}

export default function Page() {
  return (
    <>
      <HomeHeader />
      <div className="relative h-[calc(100dvh-7rem)] mt-12">
        <MatrixBoard />
        <SortingButton className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10" />
      </div>
    </>
  )
}

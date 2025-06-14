import { formatDateToEnglish, getCurrentDate } from '@/shared/lib/date'
import { Header } from '@/shared/ui/header'
import { ThemeToggle } from '@/shared/ui/theme-toggle'

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
  return <HomeHeader />
}

import { Link } from 'react-router-dom'
// import { Container } from "../../shared/Container/Container";
import { Path, RouterPath, type RouterPathType } from '@/shared/config/router/routerPath'

interface PageHeroProps {
  className?: string
  title: string
  path?: RouterPathType
}

export const PageHero = (props: PageHeroProps) => {
  const { className = '', title, path = RouterPath[Path.HOME] } = props

  return (
    <div className={`w-full h-72 bg-neutral-100 inline-flex flex-col justify-center items-center gap-2.5 ${className}`}>
      <div className="justify-start text-neutral-800 text-6xl font-extralight font-['Outfit'] uppercase tracking-[3.60px]">
        {title}
      </div>
      <div className="justify-start">
        <span className="text-neutral-800 text-xl font-extralight font-['Outfit'] tracking-tight padding-right: [5px]">
          <Link to={path}>Home</Link>
          &gt;{' '}
        </span>
        <span className="text-neutral-800 text-xl font-extralight font-['Outfit'] underline tracking-tight">
          {title}
        </span>
      </div>
    </div>
  )
}

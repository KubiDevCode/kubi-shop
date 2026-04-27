import SearchIcon from '../assets/icons/search.svg?react'
import UserhIcon from '../assets/icons/user.svg?react'
import LikeIcon from '../assets/icons/like.svg?react'
import ShopIcon from '../assets/icons/Shop.svg?react'
import { Container } from '../shared/Container/Container'

function App() {
  return (
    <>
      <Container>
        <header className="flex justify-between h-18">
          <div className="flex items-center">SHOPLITE</div>
          <nav className="flex items-center gap-10 w-max">
            <a href="" className='hover:text-accent transition duration-200'>HOME</a>
            <a href="" className='hover:text-accent transition duration-200'>ABOUT</a>
            <a href="" className='hover:text-accent transition duration-200'>SHOP</a>
            <a href="" className='hover:text-accent transition duration-200'>BLOGS</a>
            <a href="" className='hover:text-accent transition duration-200'>PAGES</a>
            <a href="" className='hover:text-accent transition duration-200'>CONTACT</a>
          </nav>
          <div className="flex justify-between items-center gap-5">
            <SearchIcon className='hover:fill-accent transition duration-200 cursor-pointer' />
            <UserhIcon className='hover:fill-accent transition duration-200 cursor-pointer' />
            <LikeIcon className='hover:fill-accent transition duration-200 cursor-pointer' />
            <ShopIcon className='hover:fill-accent transition duration-200 cursor-pointer' />
          </div>
        </header>
      </Container>
    </>
  )
}

export default App

import classNames from 'classnames';
import { Container } from '../../shared/Container/Container';
import SearchIcon from '../../assets/icons/search.svg?react'
import UserhIcon from '../../assets/icons/user.svg?react'
import LikeIcon from '../../assets/icons/like.svg?react'
import ShopIcon from '../../assets/icons/Shop.svg?react'
import Logo from '../../assets/icons/logo.svg?react'

interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    return (
        <div className={classNames(className)}>
            <Container>
                <header className="flex justify-between h-18 items-center shrink-0">
                    <Logo />
                    <nav className="flex items-center gap-10 w-max">
                        <a href="" className='hover:text-accent transition duration-200'>HOME</a>
                        <a href="" className='hover:text-accent transition duration-200'>ABOUT</a>
                        <a href="" className='hover:text-accent transition duration-200'>SHOP</a>
                        <a href="" className='hover:text-accent transition duration-200'>BLOGS</a>
                        <a href="" className='hover:text-accent transition duration-200'>PAGES</a>
                        <a href="" className='hover:text-accent transition duration-200'>CONTACT</a>
                    </nav>
                    <div className="flex justify-between items-center gap-5 shrink-0">
                        <SearchIcon className='w-6 h-6 hover:fill-accent transition duration-200 cursor-pointer' />
                        <UserhIcon className='w-6 h-6 hover:fill-accent transition duration-200 cursor-pointer' />
                        <LikeIcon className='w-6 h-6 hover:fill-accent transition duration-200 cursor-pointer' />
                        <ShopIcon className='w-6 h-6 hover:fill-accent transition duration-200 cursor-pointer' />
                    </div>
                </header>
            </Container>
        </div>
    );
};
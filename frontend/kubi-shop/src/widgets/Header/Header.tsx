import classNames from 'classnames';
import { Container } from '../../shared/Container/Container';
import SearchIcon from '../../assets/icons/search.svg?react'
import UserhIcon from '../../assets/icons/user.svg?react'
import LikeIcon from '../../assets/icons/like.svg?react'
import ShopIcon from '../../assets/icons/Shop.svg?react'
import Logo from '../../assets/icons/logo.svg?react'
import { Link } from 'react-router-dom';
import { Path, RouterPath } from '../../shared/config/router/routerPath';

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
                        <Link to={RouterPath[Path.HOME]} className='hover:text-accent transition duration-200'>HOME</Link>
                        <a href="" className='hover:text-accent transition duration-200'>ABOUT</a>
                        <Link to={RouterPath[Path.SHOP]} className='hover:text-accent transition duration-200'>SHOP</Link>
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
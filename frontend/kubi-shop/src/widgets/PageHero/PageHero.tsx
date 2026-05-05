import { Link } from "react-router-dom";
import { Container } from "../../shared/Container/Container";
import type { RouterPathType } from "../../shared/config/router/routerPath";

interface PageHeroProps {
    className?: string;
    title: string;
    path: RouterPathType
}

export const PageHero = (props: PageHeroProps) => {
    const { className = "", title, path } = props;

    return (
        <div className={`flex h-[220px] items-center justify-center bg-[#F4F4F4] ${className}`}>
            <Container>
                <div className="flex w-full flex-col items-center justify-center text-center">
                    <h1 className="mb-8 pl-[0.22em] text-[54px] font-light uppercase leading-none tracking-[0.22em] text-[#222222]">
                        {title}
                    </h1>

                    <nav className="flex items-center justify-center gap-3 text-[22px] font-light leading-none text-[#555555]">
                        <Link to={path} className="transition-colors hover:text-black">
                            Home
                        </Link>

                        <span>{">"}</span>

                        <span className="border-b border-[#222222] text-[#222222]">
                            {title}
                        </span>
                    </nav>
                </div>
            </Container>
        </div>
    );
};
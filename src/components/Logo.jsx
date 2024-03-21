const Logo = () => {
    return (
        <a href='./'>
            <span className="sr-only">Homepage</span>
            <img src="./logo-light.svg" alt="Western Governors University" aria-hidden="true" className="hidden dark:block pr-4 p-0 m-0 leading-6 border-0 cursor-pointer text-stone-900" width={110} height={24}/>
            <img src="./logo-dark.svg"  alt="Western Governors University" aria-hidden="true" className="dark:hidden pr-4 p-0 m-0 leading-6 border-0 cursor-pointer text-stone-900" width={110} height={24}/>
        </a>
    );
};

export default Logo;

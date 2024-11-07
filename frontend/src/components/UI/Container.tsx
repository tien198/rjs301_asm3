interface props {
    children?: any
    className?: string
}

function Container({ children, className }: props) {
    return (
        <div className={`px-5 md:px-14 lg:px-40 xl:px-72 2xl:px-80 ${className}`}>
            {children}
        </div>
    );
}

export default Container;
export default function CenteredColumn({ children }) {
    return (
        <div
            className={
                'max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 space-y-12 md:space-y-16 lg:space-y-24'
            }>
            {children}
        </div>
    );
}

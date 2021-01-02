export default function PreviewAlert() {
    return (
        <div
            className={'w-full bg-highlight dark:bg-highlight-dark text-light'}>
            This is page is a preview.{' '}
            <a href="/api/exit-preview" className="underline">
                Click here
            </a>{' '}
            to exit preview mode.
        </div>
    );
}

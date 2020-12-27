export default function WidgetLayout({
    FirstWidget,
    SecondWidget,
    reverse,
    separate,
    highlight
}) {
    const bgColor = highlight
        ? 'bg-highlight dark:bg-highlight-dark'
        : 'bg-dark dark:bg-light bg-opacity-10';

    const textColor = highlight
        ? 'text-light dark:text-light'
        : 'text-dark dark:text-light';

    let containerSyles = [
        'flex',
        'flex-col',
        'space-y-6',
        'sm:space-y-0',
        'sm:flex-row',
        'sm:space-x-6',
        'md:space-x-12',
        'lg:space-x-24',
        textColor
    ];

    let widgetStyles = ['flex-1 overflow-hidden'];

    if (reverse) {
        containerSyles.push('sm:flex-row-reverse');
        containerSyles.push('sm:space-x-reverse');
        containerSyles.push('md:space-x-reverse');
        containerSyles.push('lg:space-x-reverse');
    }

    if (separate) {
        widgetStyles.push('rounded-3xl');
        widgetStyles.push(bgColor);
    } else {
        containerSyles.push('rounded-3xl');
        containerSyles.push(bgColor);
    }

    containerSyles = containerSyles.join(' ');
    widgetStyles = widgetStyles.join(' ');

    return (
        <>
            <div className={containerSyles}>
                <div className={widgetStyles}>{FirstWidget}</div>
                <div className={widgetStyles}>{SecondWidget}</div>
            </div>
        </>
    );
}

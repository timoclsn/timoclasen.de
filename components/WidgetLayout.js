export default function WidgetLayout({
    FirstWidget,
    SecondWidget,
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
        'sm:flex-row',
        'sm:space-x-12',
        'md:space-x-16',
        'lg:space-x-24',
        textColor
    ];

    let widgetStyles = ['flex-1 overflow-hidden'];

    if (separate) {
        widgetStyles.push('rounded-3xl');
        widgetStyles.push(bgColor);
        containerSyles.push('space-y-12');
        containerSyles.push('sm:space-y-0');
    } else {
        containerSyles.push('rounded-3xl');
        containerSyles.push(bgColor);
    }

    containerSyles = containerSyles.join(' ');
    widgetStyles = widgetStyles.join(' ');

    return (
        <>
            <section className={containerSyles}>
                <div className={widgetStyles}>{FirstWidget}</div>
                <div className={widgetStyles}>{SecondWidget}</div>
            </section>
        </>
    );
}

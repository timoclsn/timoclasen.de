export default function WidgetLayout({
    FirstWidget,
    SecondWidget,
    separate,
    highlight,
    transparent
}) {
    const bgColor = highlight
        ? 'bg-highlight dark:bg-highlight-dark'
        : `bg-dark dark:bg-light ${
              transparent ? 'bg-opacity-0' : 'bg-opacity-10'
          }`;

    const textColor = highlight
        ? 'text-light dark:text-light'
        : 'text-dark dark:text-light';

    const containerSyles = [
        'flex',
        'flex-col',
        'sm:flex-row',
        'sm:space-x-12',
        'md:space-x-16',
        'lg:space-x-24',
        textColor,
        ...(separate ? ['space-y-12 sm:space-y-0'] : [`rounded-3xl ${bgColor}`])
    ].join(' ');

    const widgetStyles = [
        'flex-1',
        ...(separate ? [`rounded-3xl ${bgColor}`] : [])
    ].join(' ');

    return (
        <section className={containerSyles}>
            <div className={widgetStyles}>{FirstWidget}</div>
            <div className={widgetStyles}>{SecondWidget}</div>
        </section>
    );
}

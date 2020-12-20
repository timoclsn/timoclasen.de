export default function Navigation({ name, title }) {
    return (
        <div>
            <div className={'text-lg font-bold'}>{name}</div>
            <div>{title}</div>
        </div>
    );
}

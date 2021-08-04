import Image from 'next/image';
import { Globe, Twitter } from 'react-feather';

interface Props {
    name: string;
    title?: string;
    subtitle?: string;
    image: string;
}

export function OGImage({ name, title, subtitle, image }: Props) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '1200px',
                height: '630px'
            }}>
            <div
                style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '728px',
                    height: '630px'
                }}>
                <div>
                    <p
                        style={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            marginBottom: '60px'
                        }}>
                        {name}
                    </p>
                    {title ? (
                        <p
                            style={{
                                fontSize: '3rem',
                                marginBottom: '1rem',
                                color: '#3E51F7'
                            }}>
                            {title}
                        </p>
                    ) : (
                        <p
                            style={{
                                fontSize: '3rem',
                                marginBottom: '1rem'
                            }}>
                            Ich arbeite{' '}
                            <span style={{ fontWeight: 'bold' }}>mit</span>{' '}
                            <span style={{ color: '#3E51F7' }}>Menschen</span>{' '}
                            <span style={{ fontWeight: 'bold' }}>an</span>{' '}
                            <span style={{ color: '#3E51F7' }}>Software</span>{' '}
                            und beschäftige mich mit allem, was so dazugehört.
                        </p>
                    )}

                    {title && subtitle && (
                        <p
                            style={{
                                fontSize: '2rem',
                                color: 'grey'
                            }}>
                            {subtitle}
                        </p>
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        fontSize: '1.5rem'
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Globe
                            style={{
                                marginRight: '0.5rem'
                            }}
                        />
                        <p>https://timoclasen.de</p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Twitter
                            style={{
                                marginRight: '0.5rem'
                            }}
                        />
                        <p>@timoclsn</p>
                    </div>
                </div>
            </div>
            <div
                style={{
                    flex: 'none'
                }}>
                <Image
                    src={image}
                    width="472"
                    height="630"
                    alt="Image"
                    priority
                    unoptimized
                />
            </div>
        </div>
    );
}

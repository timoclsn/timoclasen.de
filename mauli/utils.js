import clsx from 'clsx';

export function getResponsiveClassNames(responsiveProp, options) {
    responsiveProp = Array.isArray(responsiveProp)
        ? responsiveProp
        : [responsiveProp];
    return clsx(
        responsiveProp.map((value, index) => {
            const option = options.find((option) => option.value === value);
            return option.classNames[index];
        })
    );
}

export function getValueAtBp(bpIndex, responsiveProp) {
    responsiveProp = Array.isArray(responsiveProp)
        ? responsiveProp
        : [responsiveProp];
    for (let i = bpIndex; i >= 0; i--) {
        const value = responsiveProp[i];
        if (value) {
            return value;
        }
    }
}

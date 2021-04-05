import clsx from 'clsx';

export const BP = {
    NONE: 0,
    SM: 1,
    MD: 2,
    LG: 3,
    XL: 4
};

export function responsiveClassNames(responsiveProp, options) {
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

export function valueAtBp(bpIndex, responsiveProp) {
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

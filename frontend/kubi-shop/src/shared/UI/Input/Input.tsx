import classNames from 'classnames';
import React, { useState } from 'react';

interface InputProps {
    className?: string;
    placeholder: string
    defValue?: string
    onChange: () => void
}

export const Input = (props: InputProps) => {
    const {
        className,
        placeholder,
        defValue,
        onChange,
    } = props

    const [value, setValue] = useState(defValue)

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        onChange()
    }

    return (
        <input
            placeholder={placeholder}
            value={value}
            onChange={onInputChange}
            className="
                w-full bg-transparent
                border-b border-[#d9d9d9]
                pb-2
                text-[24px] font-light text-[#4a4a4a]
                placeholder:text-[#b5b5b5]
                outline-none
                transition duration-200
                focus:border-black
                focus:placeholder:text-[#d0d0d0]
             "
        />
    );
};
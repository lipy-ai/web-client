import React from 'react'

import CustomInput from '@/components/custom/customInput'

const Faq = () => {
    return (
        <div className="p-2 text-sm">
            <div>
                <CustomInput
                    className="font-semibold"
                    placeholder="Write question here"
                    value={''}
                />
            </div>
            <div>
                <CustomInput placeholder="Write answer here" value={''} />
            </div>
        </div>
    )
}

export default Faq

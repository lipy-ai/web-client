import React, { useState } from 'react'

import CustomInput from '@/components/custom/customInput'

import { FaqsType } from '../page'

const Faq = ({ data }: { data: FaqsType[0] }) => {
    const [question, setQuestion] = useState(data.question || '')
    const [answer, setAnswer] = useState(data.answer || '')

    return (
        <div className="p-2 text-sm">
            <div>
                <CustomInput
                    className="font-semibold"
                    placeholder="Write question here"
                    value={question}
                    onChange={setQuestion}
                />
            </div>
            <div>
                <CustomInput
                    placeholder="Write answer here"
                    value={answer}
                    onChange={setAnswer}
                />
            </div>
        </div>
    )
}

export default Faq

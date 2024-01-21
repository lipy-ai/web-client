import React from 'react'
import { File, FileText } from 'lucide-react'

import { DocumentsType } from '../page'

const Document = ({ data }: { data: DocumentsType[0] }) => {
    return (
        <div className="w-full h-full bg-muted flex flex-col justify-center items-center gap-4">
            <File
                strokeWidth={1.2}
                width={30}
                height={30}
                className="text-muted-foreground/60"
            />
            <p className="text-sm font-medium text-muted-foreground">
                Document
            </p>
        </div>
    )
}

export default Document

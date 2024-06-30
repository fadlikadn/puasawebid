'use client'

import { ThemeProvider } from "@zendeskgarden/react-theming"
import { FC, ReactNode } from "react"

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}

export default Providers

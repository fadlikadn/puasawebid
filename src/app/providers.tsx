'use client'

import { DEFAULT_THEME, ThemeProvider } from "@zendeskgarden/react-theming"
import { FC, ReactNode } from "react"

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        // <ThemeProvider theme={DEFAULT_THEME}>
            <>
                {children}
            </>
        // </ThemeProvider>
    )
}

export default Providers

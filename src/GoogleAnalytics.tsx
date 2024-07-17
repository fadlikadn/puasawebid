'use client'

// GoogleAnalytics.tsx
import Script from "next/script"

const GoogleAnalytics = () => {
    return (
        <>
            <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
            />
            <Script id="" strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
                        page_path: window.location.pathname,
                        cookie_flags: 'max-age=7200;samesite=none;secure',
                    });
                `}
            </Script>
        </>
    )
}

export default GoogleAnalytics

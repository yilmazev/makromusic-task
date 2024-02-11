import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    25: "#F9FFFF",
                    600: "#14B1B9",
                    900: "#101828"
                },
                surface: "#E9EBF0",
                borderGray: "#ECEEEB",
                priceGray: "#344054"
            }
        }
    },
    plugins: []
}
export default config

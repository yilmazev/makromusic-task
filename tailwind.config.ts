import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    600: "#14B1B9"
                },
                gray: "#ECEEEB",
            },
        }
    },
    plugins: [],
}
export default config

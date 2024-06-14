import { MantineThemeOverride } from '@mantine/core'

const theme: MantineThemeOverride = {
    colors: {
        mint: [
            "#f0f1f9",
            "#dedeed",
            "#b9bbdc",
            "#9295cb",
            "#7175bd",
            "#5d60b5",
            "#5256b2",
            "#44479d",
            "#3b3f8d",
            "#31367d"
          ],
        cadet: [
            "#e5faff",
            "#d4f0f9",
            "#acddef",
            "#80cbe5",
            "#5dbadc",
            "#47b1d7",
            "#36acd6",
            "#2596be",
            "#1285ab",
            "#007497"
          ],
        text:[
            "#F3F3F4",
            "#DBDDE0",
            "#C4C8CE",
            "#AEB5C0",
            "#99A3B4",
            "#8492AB",
            "#6E82A5",
            "#657593",
            "#5F6B80",
            "#586170",
          ]

    

    },
    primaryColor: 'mint',
    primaryShade: 5,
    fontFamily: 'Plus Jakarta Sans Variable, sans-serif',
    components: {
        Title: {
            defaultProps: {
                color: 'cadet.9'
            }
        }
    }
}

export default theme

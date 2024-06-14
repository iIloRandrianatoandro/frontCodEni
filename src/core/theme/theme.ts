import { MantineThemeOverride } from '@mantine/core'

const theme: MantineThemeOverride = {
    colors: {
        mint: [
            '#CAFCDF',
            '#97FAC9',
            '#62F0B7',
            '#3AE1AF',
            '#03CEA4',
            '#02B19D',
            '#019491',
            '#006E77',
            '#005162',
            '#014436',
        ],
        cadet: [
            '#DDFAEF',
            '#BCF5E6',
            '#94E2D4',
            '#70C6BE',
            '#44A1A0',
            '#31838A',
            '#226673',
            '#154B5D',
            '#0D374D',
            '#0D374D',
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

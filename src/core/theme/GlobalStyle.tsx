import { Global } from '@mantine/core'
import '@fontsource-variable/plus-jakarta-sans'
import theme from './theme'

const GlobalStyles = () => {
    return (
        <Global
            styles={(_theme) => ({
                '*, *::before, *::after': { boxSizing: 'border-box' },
                '[data-hidden]': {
                    visibility: 'hidden',
                },
                body: {
                    margin: 0,
                    fontFamily: _theme.fontFamily,
                    color: theme.colors?.cadet?.[9]
                },
            })}
        />
    )
}

export default GlobalStyles

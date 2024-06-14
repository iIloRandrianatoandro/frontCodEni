import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store, persistor } from '@/store'
import router from '@/core/router'
import { Global, MantineProvider } from '@mantine/core'
import theme from '@/core/theme/theme'
import GlobalStyles from './core/theme/GlobalStyle'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <MantineProvider theme={theme}>
                    <GlobalStyles />
                    <Global
                        styles={{
                            '.judgment-detail-view': {
                                '.mantine-TextInput-input, .mantine-DateInput-input':
                                    {
                                        color: '#000000',
                                        fontWeight: 900,
                                        fontFamily: 'Georgia, serif',
                                        backgroundColor: 'fff0fe',
                                    },
                            },
                        }}
                    />
                    <RouterProvider router={router} />
                </MantineProvider>
            </PersistGate>
        </Provider>
    )
}
export default App

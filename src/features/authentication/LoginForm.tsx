import React, { useState } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { Formik } from 'formik'
import {
    PasswordInput,
    TextInput,
    Alert,
    Button,
    Paper,
    Space,
    Flex,
    Image,
    Group,
    Checkbox,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLock, IconUserCircle } from '@tabler/icons-react'
import * as Yup from 'yup'
import { useTypedDispatch, useTypedSelector } from '@/store'
import { updateAccessToken } from './state/slice'
import { useLazyLoginQuery } from './authenticationApi'

import cneciLogo from '@/assets/logo-cneci.svg'
import powered from '@/assets/powered.svg'
import { LoginDto } from './state/types'

interface LoginFormProps {
    navigate: NavigateFunction
}

const initialValues: LoginDto = {
    usernameOrEmail: '',
    password: '',
}

const loginFormSchema = Yup.object().shape({
    usernameOrEmail: Yup.string()
        .email("Diso ny firafitry ny solon'anarana")
        .required("Ampidiro ny solon'anarana"),
    password: Yup.string()
        .min(4, 'Mila litera mihoatra ny 4 ny teny miafina')
        .required('Ampidiro ny teny miafina'),
})

const LoginForm: React.FC<LoginFormProps> = ({ navigate }) => {
    const { accessToken } = useTypedSelector((state) => state.authentication)

    const useDispatch = useTypedDispatch()
    const [hasError, setHasError] = useState<boolean>(false)

    const [visible, { toggle }] = useDisclosure(false)
    const [login, { isLoading }] = useLazyLoginQuery()

    React.useEffect(() => {
        if (accessToken) {
            navigate('/')
        }
    }, [accessToken])

    const onSubmit = async (values: LoginDto) => {
        try {
            const authJwtResponse = await login({
                usernameOrEmail: values.usernameOrEmail,
                password: values.password,
            }).unwrap()

            useDispatch(updateAccessToken(authJwtResponse.accessToken))
        } catch (error: any) {
            console.error(error.data)
            setHasError(true)
        }
    }

    return (
        <Paper shadow="xs" p="xl" miw={640}>
            <Flex direction="column" align="center">
                <Image src={cneciLogo} width={200} mt={32} />
                <Space h={32} />
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={loginFormSchema}
                >
                    {({
                        values,
                        handleSubmit,
                        errors,
                        handleBlur,
                        handleChange,
                        touched,
                    }) => (
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <TextInput
                                placeholder="Solon'anarana"
                                type="text"
                                size="lg"
                                name="usernameOrEmail"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.usernameOrEmail}
                                icon={<IconUserCircle />}
                                variant="filled"
                                error={
                                    touched.usernameOrEmail &&
                                    errors.usernameOrEmail
                                }
                            />

                            <Space h="md" />

                            <PasswordInput
                                placeholder="Teny miafina"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                size="lg"
                                value={values.password}
                                variant="filled"
                                icon={<IconLock />}
                                error={touched.password && errors.password}
                                visible={visible}
                                onVisibilityChange={toggle}
                            />

                            <Space h="xl" />

                            <Button
                                type="submit"
                                loading={isLoading}
                                size="lg"
                                w={'60%'}
                                mx="auto"
                            >
                                Hiditra
                            </Button>
                        </form>
                    )}
                </Formik>

                {hasError && (
                    <Alert title="Misy olana" color="red" mt="xl">
                        Hamarino ny solon'anarana na teny miafina!
                    </Alert>
                )}

                <Group position="apart" py="lg">
                    <Checkbox label="Tadidio aho" size="md" color="dark" />
                    <Button variant="subtle" size="lg">
                        Hadino ny teny miafina?
                    </Button>
                </Group>

                <Image src={powered} width={300} mb={32} />
            </Flex>
        </Paper>
    )
}

LoginForm.displayName = 'Login form component'

export default LoginForm

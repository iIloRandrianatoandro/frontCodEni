import {
    AppShell,
    Burger,
    Group,
    Header,
    Navbar,
    Image,
    Title,
    useMantineTheme,
    Paper,
    Space,
    Stack,
    Box,
    rem,
    Text
} from '@mantine/core'
import { FC, useEffect } from 'react'
import {
    Navigate,
    Outlet,
    useLocation,
    useNavigate,
    useNavigation,
} from 'react-router-dom'
import { MainLinks } from './_mainLinks'
import User from './_user'
import { useDisclosure } from '@mantine/hooks'
import cneciLogo from '@/assets/logo-cneci.svg'
import { useTypedDispatch, useTypedSelector } from '@/store'
import { useLazyLogoutQuery } from '@/features/authentication/authenticationApi'

import { Role } from '@/features/admin/types'
import { logoutUser } from '@/features/authentication/state/slice'
import logoTamatave from '../../assets/logoTamatave.svg'
import React from 'react'
import { useStyles } from './style'

const Root: FC = () => {
    const theme = useMantineTheme()
    const navigation = useNavigation()
    const navigate = useNavigate()
    const [opened, handlers] = useDisclosure(false)
    const { accessToken, currentUser } = useTypedSelector(
        (state) => state.authentication
    )
    const location = useLocation()
    const useDispatch = useTypedDispatch()
    const [logout] = useLazyLogoutQuery()
    const { classes } = useStyles()
    const roles: Role[] = [
        Role.COURT_CLERK,
        Role.P_FOKONTANY,
        Role.SEC,
        Role.DOCTOR,
        Role.MAGISTRATE,
        Role.PROSECUTOR,
        Role.REGISTRAR,
        Role.COMMUNITY_AGENT,
    ]

    useEffect(() => {
        if (roles.includes(currentUser?.role!)) {
            navigate('judgement', { state: { from: location.pathname } })
        }
    }, [currentUser])

    const onLogoutClick = async () => {
        try {
            await logout(null).unwrap()
            useDispatch(logoutUser())
        } catch (error: any) {
            console.error(error.data)
        }
    }

    // if (!accessToken) {
    //     return (
    //         <Navigate
    //             to="/login"
    //             state={{ from: location.pathname }}
    //             replace={true}
    //         />
    //     )
    // }

    return (
        <AppShell
            layout="alt"
            navbar={
                !opened ? (
                    <Navbar width={{ base: 250 }} bg={'mint.5'}>
                        <Navbar.Section bg={theme.white} p="xs">
                            <Image src={cneciLogo} height={58} fit="fill" />
                        </Navbar.Section>
                        <Navbar.Section grow p="xs">
                            <MainLinks />
                        </Navbar.Section>
                    </Navbar>
                ) : (
                    <></>
                )
            }
            header={
                <>
                    <Header
                        height={80}
                        p="xs"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Group position="apart" w={'100%'}>
                            <Group>
                                <Burger
                                    opened={opened}
                                    onClick={() => handlers.toggle()}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                />
                                <Title order={3} color="mint">
                                   E-Fokotany
                                </Title>
                            </Group>

                            <User onLogoutClick={onLogoutClick} />
                        </Group>
                    </Header>
                    <Box
                        style={{
                            position: 'relative',
                            top: 100,
                            background: '#fff',
                            display: 'flex',
                            marginLeft: 265,
                            marginRight: 10,
                        }}
                    >
                        <Paper withBorder p={rem(16)} w="100%">
                            <Group>
                                <Box>
                                    <img src={logoTamatave} width={84} height={84} />
                                </Box>
                                <Box>
                                    <Group>
                                        <Stack>
                                            <Group>
                                                <Text className={classes.typoBodyOne} weight={700} >
                                                    Faritany:
                                                </Text>
                                                <Text weight={225} className={classes.typoBodyOne} size={rem(16)}>
                                                    {currentUser?.province?.name}
                                                </Text>
                                            </Group>

                                            <Group>
                                                <Text className={classes.typoBodyOne} weight={700} >
                                                    Kaominina:
                                                </Text>
                                                <Text weight={225} className={classes.typoBodyOne} size={rem(16)}>
                                                    {currentUser?.commune?.name}
                                                </Text>
                                            </Group>
                                        </Stack>
                                        <Stack>
                                            <Group>
                                                <Text weight={225} size={rem(16)}>
                                                    |
                                                </Text>
                                                <Text weight={700} className={classes.typoBodyOne} size={rem(16)}>
                                                    Faritra:
                                                </Text>
                                                <Text weight={225} size={rem(16)} className={classes.typoBodyOne} style={{ marginLeft: 8 }}>
                                                    {currentUser?.region?.name}
                                                </Text>
                                            </Group>
                                            <Group>
                                                <Text weight={225} size={rem(16)}>
                                                    |
                                                </Text>
                                                <Text weight={700} className={classes.typoBodyOne} size={rem(16)}>
                                                    Boriboritany:
                                                </Text>
                                                <Text weight={225} className={classes.typoBodyOne} size={rem(16)} style={{ marginLeft: 8 }}>
                                                    {currentUser?.borough?.name}
                                                </Text>
                                            </Group>


                                        </Stack>
                                        <Stack>
                                            <Group>
                                                <Text weight={225} size={rem(16)}>
                                                    |
                                                </Text>
                                                <Text weight={700} className={classes.typoBodyOne} size={rem(16)}>
                                                    Distrika:
                                                </Text>
                                                <Text weight={225} className={classes.typoBodyOne} size={rem(16)} style={{ marginLeft: 8 }}>
                                                    {currentUser?.district?.name}
                                                </Text>
                                            </Group>
                                            <Group>
                                                <Text weight={225} size={rem(16)}>
                                                    |
                                                </Text>

                                                <Text weight={700}  className={classes.typoBodyOne} size={rem(16)}>
                                                    Fokontany:
                                                </Text>
                                                <Text truncate weight={225} size={rem(16)} className={classes.typoBodyOne} style={{ marginLeft: 8 }}>
                                                    {currentUser?.fokontany?.name}
                                                </Text>
                                            </Group>
                                        </Stack>
                                    </Group>
                                </Box>
                            </Group>
                        </Paper>
                    </Box>
                    <Space h={24} />
                </>
            }
            className={navigation.state === 'loading' ? 'loading' : ''}
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
        >
            <Outlet />
        </AppShell>
    )
}

Root.displayName = 'Root page'

export default Root

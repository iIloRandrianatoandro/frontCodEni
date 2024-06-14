import { IconChevronDown, IconLogout } from '@tabler/icons-react'
import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    Box,
    useMantineTheme,
    rem,
    Menu,
} from '@mantine/core'
import { useLazyProfileQuery } from '@/features/authentication/authenticationApi'
import React, { useState } from 'react'
import { UserDto } from '@/features/admin/types'
import { useTypedDispatch } from '@/store'
import { setCurrentUser } from '@/features/authentication/state/slice'
import { mapRoleToReadableRole } from '@/features/admin/utils'
import { updateCurrentLocation } from '@/features/common/location/state/slice'
import { MyLocation } from '@/features/common/location/state/type'

interface UserProps {
    onLogoutClick: () => void
}

const User: React.FC<UserProps> = ({ onLogoutClick }) => {
    const theme = useMantineTheme()
    const [profile] = useLazyProfileQuery()
    const [user, setUser] = useState<Omit<UserDto, 'password'> | undefined>()
    const useDispatch = useTypedDispatch()

    React.useEffect(() => {
        const fetchUser = async () => {
            const response = (await profile(null).unwrap()) as UserDto
            setUser(response)
            useDispatch(setCurrentUser(response))

            const myLocation: MyLocation = {
                boroughId: response?.borough?.id,
                communeId: response?.commune?.id,
                districtId: response?.district?.id,
                fokontanyId: response?.fokontany?.id,
                provinceId: response?.province?.id,
                regionId: response?.region?.id,
            }

            useDispatch(updateCurrentLocation(myLocation))
        }

        fetchUser()
    }, [])

    return (
        <Box>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <UnstyledButton
                        sx={{
                            display: 'block',
                            width: '100%',
                            padding: theme.spacing.xs,
                            borderRadius: theme.radius.sm,
                            color:
                                theme.colorScheme === 'dark'
                                    ? theme.colors.dark[0]
                                    : theme.colors.gray,

                            '&:hover': {
                                backgroundColor:
                                    theme.colorScheme === 'dark'
                                        ? theme.colors.dark[6]
                                        : theme.colors.gray[0],
                            },
                        }}
                    >
                        <Group>
                            <Avatar radius="xl" />
                            <Box sx={{ flex: 1 }}>
                                <Text size="sm" weight={500}>
                                    {user?.lastName}
                                </Text>
                                <Text color="dimmed" size="xs">
                                    {mapRoleToReadableRole(user?.role!)}
                                </Text>
                            </Box>

                            <IconChevronDown size={rem(18)} />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        icon={<IconLogout size={14} />}
                        component="div"
                        onClick={onLogoutClick}
                    >
                        Se déconnecter
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Box>
    )
}

export default User

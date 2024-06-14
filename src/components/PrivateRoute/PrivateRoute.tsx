import { Role } from '@/features/admin/types'
import { mapRoleToReadableRole } from '@/features/admin/utils'
import { useTypedSelector } from '@/store'
import { Alert, Center } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import React from 'react'

interface PrivateRouteProps {
    children: React.ReactNode
    roles: Role[]
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
    const { currentUser } = useTypedSelector((state) => state.authentication)

    const userHasRequiredRole =
        currentUser && roles.includes(currentUser.role) ? true : false

    if (!userHasRequiredRole) {
        return (
            <Center h={'100%'}>
                <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="Attention!"
                    color="red"
                >
                    En tant que {mapRoleToReadableRole(currentUser?.role!)}, 
                    Vous n’êtes pas autorisé à accéder à cette page
                </Alert>
            </Center>
        )
    }

    return children
}

PrivateRoute.displayName = 'Private route component'

export default PrivateRoute

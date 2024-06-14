import React, { useEffect, useState } from 'react'
import {
    IconGavel,
    IconLayoutDashboard,
    IconUserCog,
    IconUserShield,
    IconHistory
} from '@tabler/icons-react'
import { NavLink } from '@mantine/core'
import { useTypedSelector } from '@/store'
import { Role } from '@/features/admin/types'
import { NavLink as MyNavLink, useLocation } from 'react-router-dom'

interface MainLinkProps {
    icon: React.ReactNode
    color?: string
    label: string
    to: string
    roles: Role[]
    active: boolean
    onClick: () => void
}

function MainLink({ icon, label, to, roles, active, onClick }: MainLinkProps) {
    const { currentUser } = useTypedSelector((state) => state.authentication)

    const userHasRequiredRole =
        currentUser && roles.includes(currentUser.role) ? true : false

    // if (!userHasRequiredRole) {
    //     return null
    // }

    return (
        <NavLink
            to={to}
            component={MyNavLink}
            icon={icon}
            label={label}
            color="mint"
            active={active}
            onClick={onClick}
            variant="light"
            styles={(theme) => ({
                root: {
                    '&:hover': theme.fn.hover({
                        backgroundColor: theme.fn.darken(
                            theme.colors.mint[6],
                            0.05
                        ),
                        color: theme.white,
                    }),
                    '&[data-active]': {
                        background: theme.white,
                    },
                },
            })}
            p="md"
            sx={{
                borderRadius: 4,
                color: active ? 'mint' : 'white',
                fontWeight: 'bold',
            }}
        />
    )
}

const data = [
    {
        icon: <IconLayoutDashboard size="1.5rem" />,
        color: 'mint',
        label: 'Tableau de bord',
        to: '/',
        roles: [Role.ADMIN, Role.CENTRAL],
    },
    {
        icon: <IconUserShield size="1.5rem" />,
        color: 'mint',
        label: 'Nouvelle demande',
        to: 'judgement/create',
        roles: [
            Role.P_FOKONTANY,
        ],
    },
    {
        icon: <IconHistory size="1.5rem" />,
        color: 'mint',
        label: 'Historique',
        to: 'judgement/history',
        roles: [
            Role.P_FOKONTANY,
        ],
    },
    {
        icon: <IconUserShield size="1.5rem" />,
        color: 'mint',
        label: 'Fangatahana',
        to: 'judgement',
        roles: [
            Role.SEC,
            Role.CENTRAL,
            Role.P_FOKONTANY,
            Role.COURT_CLERK,
            Role.ADMIN,
            Role.DOCTOR,
            Role.COMMUNITY_AGENT,
            Role.MAGISTRATE,
            Role.REGISTRAR,
            Role.PROSECUTOR,
        ],
    },
    {
        icon: <IconGavel size="1.5rem" />,
        color: 'mint',
        label: 'Liste des jugements',
        to: 'judgement/list',
        roles: [Role.ADMIN, Role.CENTRAL],
    },
    {
        icon: <IconUserCog size="1.5rem" />,
        color: 'mint',
        label: 'Admin',
        to: 'admin',
        roles: [Role.ADMIN],
    },
]

export function MainLinks() {
    const [active, setActive] = useState('')
    const { pathname } = useLocation()
    const splitedPath = pathname.slice(1, pathname.length)
    const path = splitedPath == '' ? '/' : splitedPath

    useEffect(() => {
        setActive(path)
    }, [])

    const links = data.map((link) => (
        <MainLink
            {...link}
            key={link.label}
            active={link.to === active}
            onClick={() => setActive(link.to)}
        />
    ))
    return <div>{links}</div>
}

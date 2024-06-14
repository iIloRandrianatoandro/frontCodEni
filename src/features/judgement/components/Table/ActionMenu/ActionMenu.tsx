import React from 'react'
import { ActionIcon, MantineColor } from '@mantine/core'
import { Menu } from '@mantine/core'
import { IconDotsVertical } from '@tabler/icons-react'
import { generateUUIDKey } from '@/features/judgement/utils'
import { Role } from '@/features/admin/types'

export type ActionMenuItem = {
    name: string
    icon?: JSX.Element
    role?: Role
    action: (id: number) => void
}

interface ActionMenuProps {
    menuItems: ActionMenuItem[]
    itemId: number
    editable: boolean
}

const ActionMenu: React.FC<ActionMenuProps> = ({
    menuItems,
    itemId,
    editable,
}): JSX.Element => {
    return (
        <React.Fragment>
            <Menu shadow="md">
                <Menu.Target>
                    <ActionIcon size="lg" variant="light">
                        <IconDotsVertical size="1.3rem" fontWeight="bold" />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    {menuItems.map(
                        (menuItem: ActionMenuItem, index: number) => {
                            if (
                                (editable &&
                                    menuItem.role === Role.P_FOKONTANY &&
                                    menuItem.name.toLowerCase() === 'hanova') ||
                                (menuItem.name.toLowerCase() === 'hanova' &&
                                    menuItem.role !== Role.P_FOKONTANY)
                            )
                                return
                            return (
                                <React.Fragment
                                    key={`${
                                        menuItem.name
                                    } - ${generateUUIDKey()}`}
                                >
                                    <Menu.Item
                                        icon={menuItem.icon}
                                        onClick={() => menuItem.action(itemId)}
                                        component="div"
                                    >
                                        {menuItem.name}
                                    </Menu.Item>
                                    {index !== menuItems.length - 1 ? (
                                        <Menu.Divider />
                                    ) : null}
                                </React.Fragment>
                            )
                        }
                    )}
                </Menu.Dropdown>
            </Menu>
        </React.Fragment>
    )
}

ActionMenu.displayName = 'ActionMenu component'

export default ActionMenu

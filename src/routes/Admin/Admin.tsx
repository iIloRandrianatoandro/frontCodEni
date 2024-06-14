import constants from '@/core/constants'
import {
    useLazyChangeUserStatusQuery,
    useLazyGetAllUsersQuery,
} from '@/features/admin/adminApi'
import { UserAddForm } from '@/features/admin/components'
import { updateUserStatus } from '@/features/admin/state/slice'
import { UserResponse } from '@/features/admin/state/type'
import { mapUsersToRows } from '@/features/admin/utils'
import { SearchBar } from '@/features/common/searchBar'
import FilterBox from '@/features/common/searchBar/components/filterBox/FilterBox'
import { SearchType } from '@/features/common/searchBar/types'
import { ActionMenuItem } from '@/features/judgement/components/Table/ActionMenu/ActionMenu'
import JudgementTable, {
    TableData,
} from '@/features/judgement/components/Table/JudgementTable'
import { useTypedDispatch, useTypedSelector } from '@/store'
import { Button, Modal, Skeleton, Space, Title } from '@mantine/core'
import { useDisclosure, usePagination } from '@mantine/hooks'
import {
    IconCirclePlus,
    IconUserCancel,
    IconUserCheck,
} from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Admin: React.FC = () => {
    const navigate = useNavigate()

    const searchType: SearchType = {
        filterItems: [
            {
                value: constants.filter.value.done,
                label: constants.progressionState.done,
            },
            {
                value: constants.filter.value.waiting,
                label: constants.progressionState.waiting,
            },
            {
                value: constants.filter.value.answered,
                label: constants.progressionState.rejected,
            },
            {
                value: constants.filter.value.all,
                label: constants.progressionState.all,
            },
        ],
    }

    const onSearchClick = (searchQuery: string) => {
        console.log('Search:', searchQuery)
    }

    const onFilterValueChange = (filterValue: string) => {
        console.log('Filter:', filterValue)
    }

    const [getAllUsers, { isLoading }] = useLazyGetAllUsersQuery()
    const [changeUserStatus] = useLazyChangeUserStatusQuery()
    const [tableData, setTableData] = useState<TableData | null>(null)
    const [users, setUsers] = useState<UserResponse | null>(null)
    const [opened, { open, close }] = useDisclosure(false)
    const adminState = useTypedSelector((state: { admin: any }) => state.admin)
    const useDispatch = useTypedDispatch()

    const onModalClose = () => {
        close()
    }

    const onActivateUser = async (id: number) => {
        console.log(id)
        await changeUserStatus({
            userId: id,
            status: { enable: true },
        }).unwrap()
        useDispatch(updateUserStatus(true))
    }

    const onDisableUser = async (id: number) => {
        console.log(id)
        await changeUserStatus({
            userId: id,
            status: { enable: false },
        }).unwrap()
        useDispatch(updateUserStatus(true))
    }

    const actionMenuItems: ActionMenuItem[] = [
        {
            action: onActivateUser,
            name: 'Activer',
            icon: <IconUserCheck />,
        },
        {
            action: onDisableUser,
            name: 'Désactiver',
            icon: <IconUserCancel />,
        },
    ]

    useEffect(() => {
        const fetchAllUser = async () => {
            useDispatch(updateUserStatus(false))
            const users = await getAllUsers(null).unwrap()
            setUsers(users)
            const tBody = mapUsersToRows(users.users, actionMenuItems)

            setTableData({
                tHead: ['Nom', 'Prénoms', 'Email', 'Rôle', 'Statut', ''],
                tBody: tBody,
                total: users.total,
            })
        }

        fetchAllUser()
    }, [adminState.users, adminState.userStatusChanged])

    const handleRowClick = (_id: string) => {}

    const handleNavigationClick = async (page: number) => {
        const users = await getAllUsers(page).unwrap()
        const tBody = mapUsersToRows(users.users, actionMenuItems)

        setTableData({
            tHead: ['Nom', 'Prénoms', 'Email', 'Rôle', 'Statut', ''],
            tBody: tBody,
            total: users.total,
        })
    }

    return (
        <React.Fragment>
            <Title>Liste des utilisateurs</Title>

            <Space h={24} />

            <SearchBar
                searchType={searchType}
                onSearchClick={onSearchClick}
                filter={<FilterBox onFilterValueChange={onFilterValueChange} />}
            />

            {tableData ? (
                <JudgementTable
                    onRowClick={handleRowClick}
                    navigate={navigate}
                    tableData={tableData}
                    onPaginationClick={handleNavigationClick}
                    createButton={
                        <Button
                            onClick={open}
                            size="lg"
                            leftIcon={<IconCirclePlus />}
                        >
                            Ajouter
                        </Button>
                    }
                />
            ) : (
                <Skeleton visible={isLoading} />
            )}

            <Modal
                size="lg"
                opened={opened}
                onClose={close}
                title="Ajout d'un utilisateur"
                centered
            >
                <UserAddForm onModalClose={onModalClose} />
            </Modal>
        </React.Fragment>
    )
}

Admin.displayName = 'Admin page'

export default Admin

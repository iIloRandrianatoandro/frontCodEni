import { Box, Pagination, Paper, Table } from '@mantine/core'
import { NavigateFunction } from 'react-router-dom'
import React, { useState } from 'react'
import { usePagination } from '@mantine/hooks'
import constants from '@/core/constants'
import { useTypedSelector } from '@/store'
import { Role } from '@/features/admin/types'

export type RowItem = string | React.ReactNode
export type RowItems = RowItem[]
export type TableData = {
    tHead: string[]
    tBody: RowItems[] | null
    total?: number
}

interface JudgementTableProps {
    navigate: NavigateFunction
    tableData: TableData
    createButton?: React.ReactNode
    emptyStateText?: string
    onRowClick: (id: string) => void
    onPaginationClick?: (page: number) => void
}

const JudgementTable: React.FC<JudgementTableProps> = ({
    tableData,
    createButton,
    emptyStateText = 'Mbola tsy misy',
    onRowClick,
    onPaginationClick,
}) => {
    const { accessToken, currentUser } = useTypedSelector(
        (state: { authentication: any }) => state.authentication
    )

    const { tHead, tBody } = tableData

    // Mapping the table head
    const _tHead = tHead.map((tHead: string, index: number) => {
        return <th key={`${tHead}-${index}`}>{tHead}</th>
    })

    const _tBody = tBody
        ? tBody.map((rowItems: RowItems, index: number) => {
              const rowItem = rowItems.map((_rowItem: RowItem, i: number) => {
                  return (
                      <td
                          key={`${_rowItem}-${i}`}
                          align={i == rowItems.length - 1 ? 'center' : 'left'}
                      >
                          {_rowItem}
                      </td>
                  )
              })

              return (
                  <tr
                      key={`${rowItem.toString()}-${index}`}
                      onClick={
                          /*() =>
                          onRowClick(
                              (tBody[index] as RowItem[])[0]?.toString()!
                          )*/ () => {}
                      }
                  >
                      {rowItem}
                  </tr>
              )
          })
        : null

    const [page, setPage] = useState(1)
    const onChange = (page: number) => {
        setPage(page)
        onPaginationClick!(page - 1)
    }

    const pagination = usePagination({
        total: tableData.total! / constants.pagination.perPage + 1,
        initialPage: 1,
        page,
        onChange,
    })

    return (
        <>
            {createButton &&
                (currentUser?.role === Role.P_FOKONTANY ||
                    currentUser?.role === Role.COMMUNITY_AGENT ||
                    currentUser?.role === Role.ADMIN) && (
                    <Box
                        my={24}
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        {createButton}
                    </Box>
                )}

            <Paper withBorder p="xl">
                <Table
                    striped
                    withBorder
                    withColumnBorders
                    captionSide="top"
                    verticalSpacing="lg"
                    highlightOnHover
                    fontSize="md"
                    px="xl"
                >
                    <thead>
                        <tr>{_tHead}</tr>
                    </thead>
                    <tbody>
                        {tBody ? (
                            _tBody
                        ) : (
                            <tr>
                                <td colSpan={tHead.length} align="center">
                                    {emptyStateText}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Paper>
            {tableData?.total && tableData?.total > 0 && (
                <Paper
                    p="xl"
                    withBorder
                    mt={16}
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                    <Pagination
                        total={Math.ceil(
                            tableData.total! / constants.pagination.perPage
                        )}
                        radius="md"
                        withControls={false}
                        withEdges
                        onChange={pagination.setPage}
                    />
                </Paper>
            )}
        </>
    )
}

JudgementTable.displayName = 'Judgement table features'

export default JudgementTable

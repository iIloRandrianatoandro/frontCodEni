import JudgementTable, {
    TableData,
} from '@/features/judgement/components/Table/JudgementTable'
import { SearchType } from '@/features/common/searchBar/types'
import { Skeleton, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyGetAllTreatedJudgmentsQuery } from '@/features/judgement/judgementApi'
import { mapDoneJudgmentsToRows } from '@/features/judgement/utils'
import { SearchBar } from '@/features/common/searchBar'
import { LocalizationBar } from '@/features/common/location'

const List: React.FC = () => {
    const onSearchClick = (searchQuery: string) => {
        console.log('Search:', searchQuery)
        setSearchQuery(searchQuery);
    }

    const searchType: SearchType = {}
    const navigate = useNavigate()
    const [getAllTreatedJudgments] = useLazyGetAllTreatedJudgmentsQuery()
    const [tableData, setTableData] = useState<TableData | null>(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTableData, setFilteredTableData] = useState<TableData | null>(null);
    const filterTableData = () => {
        if (tableData) {
            const filteredRows = tableData.tBody?.filter((row) => {
                // Convert cell values to lowercase for case-insensitive search
                return Object.values(row).some((cell) => {
                    const cellValue = String(cell).toLowerCase();
                    return cellValue.includes(searchQuery.toLowerCase());
                });
            });
    
            setFilteredTableData({
                ...tableData,
                tBody: filteredRows || [],
            });
        }
    }

  
    
      
    useEffect(() => {
        
        if (searchQuery.trim() !== '') {
            filterTableData(); // Perform your filter logic here
        }
        const fetchDoneJudgement = async () => {
            const response = await getAllTreatedJudgments(null).unwrap()

            const doneJudgement = response.judgments.filter(
                (judgement: { grosse: any }) => judgement.grosse
            )

            const tBody = mapDoneJudgmentsToRows(doneJudgement)

            setTableData({
                tHead: [
                    'Numéro',
                    'Nom',
                    'Prénoms',
                    'Date de la demande',
                    'Date du jugement',
                    'Etat du jugement',
                ],
                tBody: tBody,
                total: response.total,
            })
        }

        fetchDoneJudgement()
    }, [searchQuery])

    const handleNavigationClick = async (page: number) => {
        const response = await getAllTreatedJudgments(page).unwrap()

        const doneJudgement = response.judgments.filter(
            (judgement) => judgement.grosse
        )
        const tBody = mapDoneJudgmentsToRows(doneJudgement)

        setTableData({
            tHead: [
                'Numéro',
                'Nom',
                'Prénoms',
                'Date de la demande',
                'Date du jugement',
                'Etat du jugement',
            ],
            tBody: tBody,
            total: response.total,
        })
    }

    return (
        <>
            <Title mb={24}>Liste des jugements effectués</Title>
            <SearchBar onSearchClick={onSearchClick} searchType={searchType} />
            <LocalizationBar
                //regions={[]}
                //districts={[]}
                //communes={[]}
                onRegionChange={() => {}}
                onDistrictChange={() => {}}
                onCommuneChange={() => {}}
                onFokontanyChange={() => {}}
                onBoroughChange={() => {}}
            />
            {tableData ? (
                <JudgementTable
                    onRowClick={() => {}}
                    navigate={navigate}
                    tableData={filteredTableData || tableData}
                    onPaginationClick={handleNavigationClick}
                    emptyStateText="Pas de jugement effectué"
                />
            ) : (
                <Skeleton height={300} width="100%" visible />
            )}
        </>
    )
}

List.displayName = 'Judgement list page'

export default List

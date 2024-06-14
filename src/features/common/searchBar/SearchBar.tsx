import { ActionIcon, Flex,Box, Group, Input, Paper } from '@mantine/core'
import { useState } from 'react'
import { SearchType } from './types'
import SearchBarContext from './SearchBar.context'
import { IconSearch } from '@tabler/icons-react'

interface SearchProps {
    onSearchClick: (searchQuery: string) => void
    searchType: SearchType
    filter?: React.ReactNode
    category?: React.ReactNode
}

const SearchBar = ({
    onSearchClick,
    filter,
    searchType,
    category,
}: SearchProps) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchClick = () => {
        onSearchClick(searchQuery)
    }

    return (
        <SearchBarContext.Provider value={{ searchType }}>
            <Paper p="xl" mb={25} withBorder>
                
                    <Group sx={{ gap: '0.5rem' }} position="apart">
                       
                                    
                    <Group>
                    <Input
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            size="lg"
                                            variant="filled"
                                            placeholder="Hitady"
                                        />
                                        <ActionIcon
                                            color="cadet.9"
                                            size={48}
                                            variant="filled"
                                            title="Search"
                                            onClick={handleSearchClick}
                                        >
                                            <IconSearch
                                                aria-label="Search icon"
                                                size="1.5rem"
                                            />
                                        </ActionIcon>
                                    
                    </Group>
                    {filter}
 
                    {category}
                    </Group>
                
            </Paper>
        </SearchBarContext.Provider>
    )
}

SearchBar.displayName = 'Search features'

export default SearchBar

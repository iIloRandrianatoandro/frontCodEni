import { Group, Select } from '@mantine/core'
import React from 'react'
import { useSearchBarContext } from '../../SearchBar.context'
import constants from '@/core/constants'

interface FilterBoxProps {
    onFilterValueChange: (filterName: string) => void
}

const FilterBox: React.FC<FilterBoxProps> = ({ onFilterValueChange }) => {
    const { searchType } = useSearchBarContext()

    const handleFilterValueChange = (value: string) => {
        onFilterValueChange(value)
    }

    return (
        <>
            <Group>
                <Select
                    variant="filled"
                    data={searchType.filterItems!}
                    onChange={handleFilterValueChange}
                    size="lg"
                    defaultValue={constants.filter.value.all}
                />
            </Group>
        </>
    )
}

FilterBox.displayName = 'Filter box component'

export default FilterBox

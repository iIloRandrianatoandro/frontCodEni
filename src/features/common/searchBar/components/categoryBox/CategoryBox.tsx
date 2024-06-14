import React from 'react'
import { useSearchBarContext } from '../../SearchBar.context'
import { CategoryItem } from '../../types'
import { Checkbox, Grid,rem} from '@mantine/core'

interface CategoryBoxProps {
    onCategoryValueChange: (value: string[]) => void
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ onCategoryValueChange }) => {
    const { searchType } = useSearchBarContext()

    const checkBoxes = searchType.categoryItems?.map(
        (category: CategoryItem, index: number) => {
            return (
                
                <Grid.Col span={6} key={`${category.value}-${index}`} >
                                    <Checkbox
                                    maw={rem(125)}
                                        value={category.value}
                                        label={category.label}
                                    />
                </Grid.Col>  
               
            )
        }
    )

    return (
        <Checkbox.Group maw={rem(250)} onChange={onCategoryValueChange}>
            <Grid>{checkBoxes}</Grid>
        </Checkbox.Group>
    )
}

export default CategoryBox

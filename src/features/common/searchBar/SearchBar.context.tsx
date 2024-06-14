import { createContext, useContext } from 'react'
import { SearchType } from './types'

const SearchBarContext = createContext<{ searchType: SearchType } | null>(null)

export const useSearchBarContext = () => {
    const context = useContext(SearchBarContext)

    if (!context) {
        throw new Error(
            'SearchBar.* component must be rendered as child of SearchBar component'
        )
    }
    return context
}

export default SearchBarContext

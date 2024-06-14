export type FilterItem = {
    value: string
    image?: string
    label: string
}

export type CategoryItem = {
    value: string
    label: string
}

export type SearchType = {
    filterItems?: FilterItem[]
    categoryItems?: CategoryItem[]
}

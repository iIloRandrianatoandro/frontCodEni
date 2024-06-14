import { LocationSelectItem } from './LocalizationBar'
import { DistrictLocationItem, RegionLocationItem } from './state/type'

export const mapLocationItemsToSelect = (
    locationItems: RegionLocationItem[] | DistrictLocationItem[]
): LocationSelectItem[] => {
    return locationItems.map((locationItem) => {
        return {
            label: locationItem.name,
            value: locationItem.id.toString(),
        }
    })
}

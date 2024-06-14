import React, { useEffect, useRef, useState } from 'react'
import { DateInput } from '@mantine/dates'
import { Flex, Paper, Select, Skeleton } from '@mantine/core'
import { IconCalendarEvent } from '@tabler/icons-react'
import { useTypedSelector } from '@/store'
import {
    useLazyGetBoroughsQuery,
    useLazyGetDistrictsQuery,
    useLazyGetFokontanysQuery,
    useLazyGetMunicipalitiesQuery,
    useLazyGetRegionsQuery,
} from '@/services/locationApi'
import { mapLocationItemsToSelect } from './utils'

export interface LocationSelectItem {
    label: string
    value: string
}

interface LocalizationBarProps {
    hasFokontany?: boolean
    onRegionChange: (regionId: string) => void
    onDistrictChange: (districtId: string) => void
    onCommuneChange: (communeId: string) => void
    onBoroughChange: (boroughId: string) => void
    onFokontanyChange: (fokontanyId: string) => void
}

const LocalizationBar: React.FC<LocalizationBarProps> = ({
    hasFokontany = true,
    onRegionChange,
    onDistrictChange,
    onCommuneChange,
    onBoroughChange,
    onFokontanyChange,
}): JSX.Element => {
    const { location } = useTypedSelector((state) => state.location)
    const [getFokontany] = useLazyGetFokontanysQuery()
    const [getBoroughs] = useLazyGetBoroughsQuery()
    const [getDistricts, { isFetching }] = useLazyGetDistrictsQuery()
    const [getMunicipalities] = useLazyGetMunicipalitiesQuery()
    const [getRegions] = useLazyGetRegionsQuery()

    const [regions, setRegions] = useState<LocationSelectItem[] | null>(null)
    const [districts, setDistricts] = useState<LocationSelectItem[] | null>(
        null
    )
    const [municipalities, setMunicipalities] = useState<
        LocationSelectItem[] | null
    >(null)
    const [boroughs, setBoroughs] = useState<LocationSelectItem[] | null>(null)
    const [fokontany, setFokontany] = useState<LocationSelectItem[] | null>(
        null
    )

    const handleRegionChange = async (value: string) => {
        const response = await getDistricts(+value).unwrap()
        console.log(ref.current?.defaultValue)
        setDistricts(
            response.map((district) => {
                return {
                    label: district.name,
                    value: district.id.toString(),
                }
            }) as LocationSelectItem[]
        )
        onRegionChange(value)
    }
    const handleDistrictChange = async (value: string) => {
        const response = await getMunicipalities(+value).unwrap()
        setMunicipalities(
            response.map((municipality) => {
                return {
                    label: municipality.name,
                    value: municipality.id.toString(),
                }
            }) as LocationSelectItem[]
        )
        onDistrictChange(value)
    }
    const handleCommuneChange = async (value: string) => {
        const response = await getBoroughs(+value).unwrap()
        setBoroughs(
            response.map((borough) => {
                return {
                    label: borough.name,
                    value: borough.id.toString(),
                }
            }) as LocationSelectItem[]
        )
        onCommuneChange(value)
    }
    const handleBoroughChange = async (value: string) => {
        const response = await getFokontany(+value).unwrap()
        setFokontany(
            response.map((fokontany) => {
                return {
                    label: fokontany.name,
                    value: fokontany.id.toString(),
                }
            }) as LocationSelectItem[]
        )
        onBoroughChange(value)
    }
    const handleFokontanyChange = (value: string | null) => {
        const fokontany: string = value ? value : ''
        onFokontanyChange(fokontany)
    }

    useEffect(() => {
        const fetchRegions = async () => {
            const response = await getRegions(null).unwrap()
            setRegions(mapLocationItemsToSelect(response))
        }

        fetchRegions()
    }, [])

    const ref = useRef<HTMLInputElement>(null)

    return (
        <React.Fragment>
            {regions ? (
                <Paper p="xl" mb={32} withBorder>
                    <Flex justify="space-between">
                        <Select
                            name="region"
                            label="Région"
                            data={regions!}
                            //defaultValue={location?.regionId!.toString()}
                            onChange={handleRegionChange}
                            size="md"
                        />

                        <Select
                            name="district"
                            type="select"
                            label="District"
                            data={districts ? districts : []}
                            onChange={handleDistrictChange}
                            //defaultValue={districts ? districts[0].value : null}
                            size="md"
                            ref={ref}
                            disabled={isFetching}
                        />
                        <Select
                            name="commune"
                            type="select"
                            label="Commune"
                            data={municipalities ?? []}
                            onChange={handleCommuneChange}
                            //defaultValue={location?.communeId!.toString()}
                            size="md"
                        />
                        <Select
                            name="borough"
                            type="select"
                            label="Arrondissement"
                            data={boroughs ?? []}
                            onChange={handleBoroughChange}
                            //defaultValue={location?.boroughId!.toString()}
                            size="md"
                        />
                        {hasFokontany ? (
                            <Select
                                name="fokontany"
                                type="select"
                                label="Fokontany"
                                data={fokontany ?? []}
                                onChange={handleFokontanyChange}
                                //defaultValue={location?.fokontanyId!.toString()}
                                size="md"
                            />
                        ) : (
                            <DateInput
                                label="Date"
                                id="dateOfSearch"
                                name="dateOfResearch"
                                valueFormat="DD/MM/YYYY"
                                placeholder="09/12/2004"
                                rightSection={<IconCalendarEvent />}
                                size="md"
                            />
                        )}
                    </Flex>
                </Paper>
            ) : (
                <Skeleton height={120} width="100%" visible mb={32} />
            )}
        </React.Fragment>
    )
}

LocalizationBar.displayName = 'JudgmentLocalization feature'

export default LocalizationBar

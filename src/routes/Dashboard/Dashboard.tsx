import React, { useEffect, useState } from 'react'
import { Group, Title } from '@mantine/core'
import { NumberCard } from '@/components/NumberCard'
import { NumberState } from '@/components/NumberCard/NumberState'
import { LocalizationBar } from '@/features/common/location'
import { useLazyGetAllJudgmentsQuery } from '@/features/judgement/judgementApi'
import { filterBy, filterByState, filterByStep, handleNaNValue } from './utils'

const Dashboard: React.FC = () => {
    const [getAllJudgments] = useLazyGetAllJudgmentsQuery()

    const [allJudgements, setAllJudgements] = useState<any[]>([])

    useEffect(() => {
        const fetchJudgements = async () => {
            const response = await getAllJudgments({ name: 'all' }).unwrap()

            const result = response.judgments.filter(
                (judgement) => judgement?.grosse?.dateVerdict != ''
            )

            setAllJudgements(result)
        }

        fetchJudgements()
    }, [])

    const grantedStatusFilter = filterByState(allJudgements, 'done')

    const rejectedStatusFilter = filterByState(allJudgements, 'rejected')

    const grantedStatusAndTpiStepFilter = filterBy(allJudgements, 'done', 'tpi')

    const rejectedStatusAndTpiFilter = filterBy(allJudgements, 'rejected', 'tpi')

    const controlledIdentityFrictiousSearchFilter = allJudgements.filter(
        (judgement) => {
            return (
                judgement?.unsuccessfulSearch?.birthCertificateFound &&
                judgement?.progression?.step?.toString().toLowerCase() ===
                    'commune'
            )
        }
    )
    const controlledIdentityOffensiveFilter = allJudgements.filter((judgement) => {
        return (
            judgement.progression?.step.toString().toLowerCase() ===
                'commune' &&
            judgement.unsuccessfulSearch?.birthCertificateFound === false
        )
    })

    const doctorStepFilter = filterByStep(allJudgements, 'doctor')

    const doctorOrTpiStepFilter =
        filterByStep(allJudgements, 'doctor') || filterByStep(allJudgements, 'tpi')

    const municipalityOrFokontanyStepFilter =
        filterByStep(allJudgements, 'commune') ||
        filterByStep(allJudgements, 'fokontany')

    const transcribedStatusFilter = allJudgements.filter((judgement) => {
        return (
            judgement.applicant?.nui !== null ||
            judgement.applicant?.nui !== undefined ||
            judgement.applicant?.nui !== ''
        )
    })

    const countCompletedStatus =
        grantedStatusFilter.length + rejectedStatusFilter.length
    const countStatusdDneJudgment =
        grantedStatusAndTpiStepFilter.length + rejectedStatusAndTpiFilter.length
    const countControlledIdentityStatus =
        controlledIdentityFrictiousSearchFilter.length +
        controlledIdentityOffensiveFilter.length
    const countStepFilter =
        municipalityOrFokontanyStepFilter.length + doctorOrTpiStepFilter.length

    const onRegionChange = (regionId: string | null) => {
        const resultByRegionId = allJudgements.filter((judgement) => {
            return judgement.region?.id.toString() === regionId
        })
        setAllJudgements(resultByRegionId)
    }
    const onDistrictChange = (districtId: string | null) => {
        const resultByDistrictId = allJudgements.filter((judgement) => {
            return judgement.district?.id.toString() === districtId
        })
        setAllJudgements(resultByDistrictId)
    }
    const onCommuneChange = (communeId: string | null) => {
        const resultByCommuneId = allJudgements.filter((judgement) => {
            return judgement.commune?.id.toString() === communeId
        })
        setAllJudgements(resultByCommuneId)
    }
    const onBoroughChange = (boroughId: string | null) => {
        const resultByBoroughId = allJudgements.filter((judgement) => {
            return judgement.borough?.id.toString() === boroughId
        })
        setAllJudgements(resultByBoroughId)
    }
    const onFokontanyChange = (fokontanyId: string | null) => {
        const resultByFokontanyId = allJudgements.filter((judgement) => {
            return judgement.fokontany?.id.toString() === fokontanyId
        })
        setAllJudgements(resultByFokontanyId)
    }

    return (
        <React.Fragment>
            <Title sx={{ marginBottom: 30 }}>Statistique</Title>
            <LocalizationBar
                onRegionChange={onRegionChange}
                onDistrictChange={onDistrictChange}
                onCommuneChange={onCommuneChange}
                onBoroughChange={onBoroughChange}
                onFokontanyChange={onFokontanyChange}
            />

            <Title order={4} sx={{ paddingTop: 20, marginBottom: -20 }}>
                Statut des demandes
            </Title>
            <Group position="left" mt="xl">
                <NumberCard
                    value={handleNaNValue(countCompletedStatus)}
                    title={'Demande Traité'}
                    numberState={
                        <>
                            <NumberState
                                status={'Accordé'}
                                total={handleNaNValue(
                                    grantedStatusFilter.length
                                )}
                                percentage={handleNaNValue(
                                    (
                                        (grantedStatusFilter.length * 100) / countCompletedStatus
                                    ).toFixed(2)
                                )}
                            />
                            <NumberState
                                status={'Rejeté'}
                                total={handleNaNValue(
                                    rejectedStatusFilter.length
                                )}
                                percentage={handleNaNValue(
                                    (
                                        (rejectedStatusFilter.length * 100) / countCompletedStatus
                                    ).toFixed(2)
                                )}
                            />
                        </>
                    }
                />
                <NumberCard
                    value={countStepFilter}
                    title={'En cours'}
                    numberState={
                        <>
                            <NumberState
                                status={'Pré-GU'}
                                total={handleNaNValue(
                                    (municipalityOrFokontanyStepFilter.length * 100) / countStepFilter
                                )}
                                percentage={handleNaNValue(
                                    (
                                        (municipalityOrFokontanyStepFilter.length * 100) / countStepFilter
                                    ).toFixed(2)
                                )}
                            />
                            <NumberState
                                status={'GU'}
                                total={handleNaNValue(
                                    doctorOrTpiStepFilter.length
                                )}
                                percentage={handleNaNValue(
                                    (
                                        (doctorOrTpiStepFilter.length * 100) / countStepFilter
                                    ).toFixed(2)
                                )}
                            />
                        </>
                    }
                />
            </Group>

            <Title order={4} sx={{ paddingTop: 20, marginBottom: -20 }}>
                Evolution des demandes
            </Title>
            <Group position="left" mt="xl">
                <NumberCard
                    value={handleNaNValue(allJudgements.length)}
                    title={'Demande reçues'}
                />
                <NumberCard
                    value={handleNaNValue(countControlledIdentityStatus)}
                    title={'Résultat de recherche'}
                    numberState={
                        <>
                            <NumberState
                                status={'RI'}
                                total={handleNaNValue(
                                    controlledIdentityFrictiousSearchFilter.length
                                )}
                                percentage={handleNaNValue(
                                    (
                                        (controlledIdentityFrictiousSearchFilter.length * 100) / countControlledIdentityStatus
                                    ).toFixed(2)
                                )}
                            />
                            <NumberState
                                status={'RF'}
                                total={handleNaNValue(
                                    controlledIdentityOffensiveFilter.length
                                )}
                                percentage={handleNaNValue(
                                    (
                                        (controlledIdentityOffensiveFilter.length * 100) / countControlledIdentityStatus
                                    ).toFixed(2)
                                )}
                            />
                        </>
                    }
                />
                <NumberCard
                    value={handleNaNValue(doctorStepFilter.length)}
                    title={'Examen effectué'}
                />
                <NumberCard
                    value={
                        //handleNaNValue(countStatusdDneJudgment)
                        handleNaNValue(countCompletedStatus)
                    }
                    title={'Jugement rendu'}
                    numberState={
                        <>
                            <NumberState
                                status={'Accordé'}
                                total={handleNaNValue(
                                    //grantedStatusAndTpiStepFilter.length
                                    grantedStatusFilter.length
                                )}
                                percentage={handleNaNValue(
                                    (
                                        //(grantedStatusAndTpiStepFilter.length * 100) / countStatusdDneJudgment
                                        (grantedStatusFilter.length * 100) / countCompletedStatus
                                    ).toFixed(2)
                                )}
                            />
                            <NumberState
                                status={'Rejeté'}
                                total={handleNaNValue(
                                    //rejectedStatusAndTpiFilter.length
                                    rejectedStatusFilter.length
                                )}
                                percentage={handleNaNValue(
                                    (
                                        //(rejectedStatusAndTpiFilter.length * 100) / countStatusdDneJudgment
                                        (rejectedStatusFilter.length * 100) / countCompletedStatus
                                    ).toFixed(2)
                                )}
                            />
                            <NumberState
                                status={'Transcrit'}
                                total={handleNaNValue(
                                    transcribedStatusFilter.length
                                )}
                                percentage={handleNaNValue(
                                    (
                                        (transcribedStatusFilter.length * 100) / allJudgements.length
                                    ).toFixed(2)
                                )}
                            />
                        </>
                    }
                />
            </Group>
        </React.Fragment>
    )
}

Dashboard.displayName = 'Dashboard page'

export default Dashboard

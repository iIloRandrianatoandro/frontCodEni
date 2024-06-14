import React, { PointerEvent, useEffect, useState } from 'react'
import {
    JudgmentRequestDto,
    UnsuccessfulSearchDto,
} from '@/features/judgement/state/types'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { Grid, Title, Text, TextInput, Group, Button } from '@mantine/core'
import {
    useLazyGetJudgmentByIdQuery,
    useLazyUpdateJudgementRequestWithUnsuccessfulSearchQuery,
} from '@/features/judgement/judgementApi'
import { FruitlessSearch } from '@/features/judgement/components/FruitlessSearch'

const Fruitless: React.FC = (): JSX.Element => {
    const { judgementRequestId } = useParams()
    const navigate: NavigateFunction = useNavigate()
    const [getJudgmentById] = useLazyGetJudgmentByIdQuery()
    const [isInitialValid] = useState(false)
    const [judgementRequest, setJudgementRequest] =
        useState<JudgmentRequestDto | null>(null)
    const [updateJudgementRequestWithUnsuccessfulSearch, { isLoading }] =
        useLazyUpdateJudgementRequestWithUnsuccessfulSearchQuery()

    const goToPreviousPage = async (e: any) => {
        const unsuccessfulSearch: UnsuccessfulSearchDto = {
            id: 0,
            identity: judgementRequest?.numDemand || '',
            birthCertificateFound: e.target.parentNode.parentNode.value,
            judgmentRequestId: parseInt(judgementRequestId ?? '0'),
        }
        const response = await updateJudgementRequestWithUnsuccessfulSearch(
            unsuccessfulSearch
        ).unwrap()
        navigate(`/judgement/details/${judgementRequestId}`, { replace: true })
    }

    useEffect(() => {
        const fetchJudgementQuery = async () => {
            const judgementRequesto = await getJudgmentById(
                judgementRequestId!
            ).unwrap()
            setJudgementRequest(judgementRequesto)
        }
        fetchJudgementQuery()
    }, [isInitialValid])

    return (
        <React.Fragment>
            <Title order={3} sx={{ paddingTop: 10, paddingBottom: 10 }}>
                Valim-pikarohana
            </Title>
            <Grid>
                <Grid.Col span={1}>
                    <Text> N° </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                    <TextInput
                        id="unsuccessfulSearchIdentity"
                        name="unsuccessfulSearch.identity"
                        variant={'filled'}
                        sx={{ paddingBottom: 5 }}
                        value={judgementRequest?.numDemand}
                    />
                </Grid.Col>
            </Grid>
            <Title order={4} sx={{ paddingTop: 10, paddingBottom: 10 }}>
                Ny fikarohana kopia nahaterahana amin'ny anaran'i
            </Title>
            <FruitlessSearch judgmentData={judgementRequest!} />

            <Group position="right">
                <Button
                    onClick={(e) => goToPreviousPage(e)}
                    id="birthCertificateAlreadyExist"
                    size="lg"
                    display={'flex'}
                    variant={'outline'}
                    value={'true'}
                >
                    Efa misy
                </Button>
                <Button
                    id="birthCertificateNotFound"
                    onClick={(e) => goToPreviousPage(e)}
                    size="lg"
                    display={'flex'}
                    value={'false'}
                >
                    Tsy nahitam-bokatra
                </Button>
            </Group>
        </React.Fragment>
    )
}

Fruitless.displayName = 'Fruitless Page'

export default Fruitless

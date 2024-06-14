import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Title, Text, Grid, Button, Flex, Alert } from '@mantine/core'
import { JudgmentRequestDto } from '@/features/judgement/state/types'
import { useDeleteJudgmentByIdMutation } from '@/features/judgement/judgementApi'
import { IconAlertCircle } from '@tabler/icons-react'

interface DestroyJudgmentProps {
    onClose: () => void
    judgment: JudgmentRequestDto
}

const DeleteJudgment: React.FC<DestroyJudgmentProps> = ({
    onClose,
    judgment,
}): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const [deleteJudgmentById] = useDeleteJudgmentByIdMutation()

    const destroyJudgement = async () => {
        try {
            const judgementRequestResponse = await deleteJudgmentById(
                judgment.id.toString()
            ).unwrap()

            navigate(`/judgement`, {
                replace: true,
            })
        } catch (error: any) {
            console.log(error)
            console.log('error: ' + error.toString())
            console.log(JSON.stringify(error))
        }

        onClose()
    }
    const closeDialogBox = () => {
        onClose()
    }

    return (
        <React.Fragment>
            <Alert
                icon={<IconAlertCircle size="1rem" />}
                title="Tsy afaka iverenana intsony raha voafafa!"
                color="red"
            >
                Raha tena hamafa ilay fanambarana an'i{' '}
                <span style={{ fontWeight: 900 }}>
                    {judgment.applicant?.fullName}{' '}
                    {judgment.applicant?.fullLastName}
                </span>{' '}
                dia tsindro ny bokitra mena "Fafaina"
            </Alert>

            <Grid gutter="xl" p="xl">
                <Grid.Col>
                    <Flex justify="end" gap="sm" style={{ marginBottom: -17 }}>
                        <Button
                            variant={'outline'}
                            onClick={() => closeDialogBox()}
                            size="lg"
                            style={{
                                color: 'black',
                                background: 'grey',
                                borderColor: 'grey',
                            }}
                        >
                            Tsia
                        </Button>
                        <Button
                            variant={'filled'}
                            onClick={() => destroyJudgement()}
                            size="lg"
                            style={{
                                color: 'white',
                                background: 'red',
                            }}
                        >
                            Fafaina
                        </Button>
                    </Flex>
                </Grid.Col>
            </Grid>
        </React.Fragment>
    )
}

DeleteJudgment.displayName = 'DeleteJudgment component'

export default DeleteJudgment

import React, { useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import {
    Title,
    Grid,
    Button,
    Flex,
    Radio,
    Group,
    Textarea,
} from '@mantine/core'
import {
    JudgmentRequestDto,
    ProfileUserSignatureTag,
} from '@/features/judgement/state/types'
import {
    useDisplayUserSignatureMutation,
    useHandleProcurationJudgmentRequestMutation,
} from '@/features/judgement/judgementApi'

interface ConfirmOrNotJudgmentProcurationProps {
    onClose: () => void
    judgment: JudgmentRequestDto
}

const ConfirmOrNotJudgmentProcuration: React.FC<
    ConfirmOrNotJudgmentProcurationProps
> = ({ onClose, judgment }): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const [handleProcurationJudgmentRequest] =
        useHandleProcurationJudgmentRequestMutation()
    const [displayUserSignature] = useDisplayUserSignatureMutation()

    const [comment, setComment] = useState(judgment.prosecution?.comment ?? '')

    const handleCommentChange = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setComment(event.target.value)
    }

    const [isAcceptedValue, setAcceptedValue] = useState(
        judgment?.prosecution?.isAccepted?.toString() || 'true'
    )

    const handleProcurationJudgmentRequestConfirmation = async () => {
        try {
            await handleProcurationJudgmentRequest({
                judgmentRequestId: judgment?.id ?? 1,
                prosecutionReq: {
                    comment: comment,
                    isAccepted: isAcceptedValue === 'true',
                },
            }).unwrap()

            await displayUserSignature({
                isActive: true,
                tag:
                    isAcceptedValue === 'true'
                        ? ProfileUserSignatureTag.ACCEPTED_CIVIL_CONCLUSION
                        : isAcceptedValue === 'false'? 
                            ProfileUserSignatureTag.REJECTED_CIVIL_CONCLUSION:
                            ProfileUserSignatureTag.UNVALIDATED_CIVIL_CONCLUSION,
                judgmentRequestId: judgment?.id ?? 1,
            }).unwrap()

            navigate(`/judgement/details/${judgment?.id}`, {
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
            <Grid gutter="xl" p="xl">
                <Grid.Col>
                    <Grid gutter="xl">
                        <Grid.Col>
                            <Radio.Group
                                value={isAcceptedValue}
                                onChange={setAcceptedValue}
                                name="prosecution.isAccepted"
                                label="Hevitra ?"
                                sx={{
                                    paddingBottom: 20,
                                    marginTop: -20,
                                }}
                                required
                            >
                                <Group mt="xs">
                                    <Radio value="true" label="Ekena" />
                                    <Radio value="false" label="Lavina" />
                                    <Radio value="unvalidated" label="Ankinina amin'ny fahendren'ny fitsarana" />
                                </Group>
                            </Radio.Group>
                            <Textarea
                                name="prosecution.comment"
                                label="Fanamarihana"
                                placeholder="Ampidiro eto ny anton'ny nahatonga ny fandraisana io fanapahan-kevitra io"
                                onChange={handleCommentChange}
                                value={comment}
                                variant="filled"
                                autosize
                                minRows={6}
                                maxRows={6}
                                style={{
                                    display:
                                        // isAcceptedValue === 'true'
                                        isAcceptedValue === 'true' || isAcceptedValue === 'unvalidated'
                                            ? 'none'
                                            : 'block',
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}></Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
            <Grid gutter="xl" p="xl">
                <Grid.Col>
                    <Flex justify="end" gap="sm" style={{ marginBottom: -17 }}>
                        <Button
                            variant={'outline'}
                            onClick={() => closeDialogBox()}
                            size="lg"
                            // style={{
                            //     color: 'black',
                            //     background: 'grey',
                            //     borderColor: 'grey',
                            // }}
                        >
                            Hiala
                        </Button>
                        <Button
                            variant={'filled'}
                            onClick={() =>
                                handleProcurationJudgmentRequestConfirmation()
                            }
                            size="lg"
                            // style={{
                            //     color: 'white',
                            //     background: 'blue',
                            // }}
                        >
                            Manaraka
                        </Button>
                    </Flex>
                </Grid.Col>
            </Grid>
        </React.Fragment>
    )
}

ConfirmOrNotJudgmentProcuration.displayName =
    'ConfirmOrNotJudgmentProcuration component'

export default ConfirmOrNotJudgmentProcuration

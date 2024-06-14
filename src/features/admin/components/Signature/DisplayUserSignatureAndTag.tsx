import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Title, Text, Grid, Button, Flex, Blockquote } from '@mantine/core'
import {
    JudgmentRequestDto,
    ProfileUserSignatureTag,
} from '@/features/judgement/state/types'
import { IconInfoCircle } from '@tabler/icons-react'
import { useTypedSelector } from '@/store'
import { Role } from '../../types'
import { useDisplayUserSignatureMutation } from '@/features/judgement/judgementApi'

interface DisplayUserSignatureAndTagProps {
    onClose: () => void
    judgment: JudgmentRequestDto
}

const DisplayUserSignatureAndTag: React.FC<DisplayUserSignatureAndTagProps> = ({
    onClose,
    judgment,
}): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const [displayUserSignature] = useDisplayUserSignatureMutation()
    const { accessToken, currentUser } = useTypedSelector(
        (state) => state.authentication
    )

    const handleSignatureTag = (): ProfileUserSignatureTag => {
        if (currentUser?.role === Role.MAGISTRATE)
            return ProfileUserSignatureTag.APPROVED_AND_SIGNED_BY_MAGISTRATE

        return judgment.unsuccessfulSearch?.birthCertificateFound?.toString() ===
            'true'
            ? ProfileUserSignatureTag.BIRTH_CERTIFICATE
            : ProfileUserSignatureTag.BIRTH_CERTIFICATE_NOT_DELIVERED
    }

    const displaySignature = async () => {
        try {
            await displayUserSignature({
                isActive: true,
                tag: handleSignatureTag(),
                judgmentRequestId: judgment.id,
            }).unwrap()

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

    const specificModalContent =
        currentUser?.role === Role.REGISTRAR
            ? 'Kopian’ny'
            : 'didim-pitsarana misolo'

    return (
        <React.Fragment>
            <Blockquote
                icon={<IconInfoCircle />}
                cite={`– ${currentUser?.firstName} ${currentUser?.lastName}`}
                color="blue"
                mt="xl"
            >
                Manamarina fa tena hanao sonia ity {specificModalContent}{' '}
                sora-piankohonana an'i{' '}
                <span style={{ fontWeight: 900 }}>
                    {judgment.applicant?.fullName}{' '}
                    {judgment.applicant?.fullLastName}
                </span>{' '}
                ity ve ianao ? <br />
                Raha manaiky dia tsindro ny bokitra maitso "Eny"
            </Blockquote>
            <Grid gutter="xl" p="xl">
                <Grid.Col>
                    <Flex justify="end" gap="sm" style={{ marginBottom: -17 }}>
                        <Button
                            variant={'outline'}
                            onClick={() => closeDialogBox()}
                            size="lg"
                            style={{
                                color: '#02B19D',
                                background: '#FFFFFF',
                                borderColor: '#02B19D',
                            }}
                        >
                            Tsia
                        </Button>
                        <Button
                            variant={'filled'}
                            onClick={() => displaySignature()}
                            size="lg"
                            style={{
                                color: '#FFFFFF',
                                background: '#02B19D',
                            }}
                        >
                            Eny
                        </Button>
                    </Flex>
                </Grid.Col>
            </Grid>
        </React.Fragment>
    )
}

DisplayUserSignatureAndTag.displayName = 'DisplayUserSignatureAndTag component'

export default DisplayUserSignatureAndTag

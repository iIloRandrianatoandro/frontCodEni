import React from 'react'
import { NavigateFunction, useLocation } from 'react-router-dom'
import { Title, Text, Grid, TextInput, Button, Flex } from '@mantine/core'
import {
    JudgmentRequestDto,
    MaritalStatus,
} from '@/features/judgement/state/types'
import { FormikProps } from 'formik'
import {
    useEditJudgmentRequestMutation,
    useLazyJudgementRequestQuery,
} from '@/features/judgement/judgementApi'
import { Role, UserDto } from '@/features/admin/types'

interface ConfirmationFormProps {
    navigate: NavigateFunction
    onClose: () => void
    form: FormikProps<JudgmentRequestDto>
    rawTypeRequester?: any
    knownBirthDate?: any
    rawMaritalStatus?: MaritalStatus | any
    currentUser: UserDto
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
    navigate,
    onClose,
    form,
    rawTypeRequester,
    rawMaritalStatus,
    knownBirthDate,
    currentUser,
}): JSX.Element => {
    const [judgementRequest, { isLoading }] = useLazyJudgementRequestQuery()
    const [editJudgementRequest] = useEditJudgmentRequestMutation()
    const EDIT_PATH_ACTION = '/edit/'
    const usePathname = () => {
        const location = useLocation()
        return location.pathname
    }

    const isEditAction = usePathname().includes(EDIT_PATH_ACTION)
    const isFromCommunityAgent = currentUser.role === Role.COMMUNITY_AGENT

    const goToDetailsPage = async () => {
        try {
            const judgementRequesCopy = { ...Object.freeze(form.values) }
            judgementRequesCopy.typeRequester = rawTypeRequester
            if (
                form.values.numDemand === '' ||
                form.values.numDemand === null ||
                form.values.numDemand === undefined
            )
                judgementRequesCopy.numDemand = `${new Date().getTime() * 1}`

            if (form.values.mother?.fullName !== '')
                judgementRequesCopy.mother.maritalStatus = rawMaritalStatus
            if (
                knownBirthDate?.knownApplicantBirthDate === 'false' &&
                form.values.applicant.unspecifiedBirthDate
                    ?.toLowerCase()
                    .includes('vers')
            ) {
                judgementRequesCopy.applicant.birthDate =
                    form.values.applicant.unspecifiedBirthDate
            }
            if (
                knownBirthDate.knownCitizenBirthDate?.includes(
                    'knownFirstWitnessBirthDate:false'
                ) &&
                form.values.firstWitness.unspecifiedBirthDate
                    ?.toLowerCase()
                    .includes('vers')
            ) {
                judgementRequesCopy.firstWitness.birthDate =
                    form.values.firstWitness.unspecifiedBirthDate
            }

            if (
                knownBirthDate.knownCitizenBirthDate?.includes(
                    'knownApplicantMotherBirthDate:false'
                ) &&
                form.values.mother.unspecifiedBirthDate
                    ?.toLowerCase()
                    .includes('vers')
            ) {
                judgementRequesCopy.mother.birthDate =
                    form.values.mother.unspecifiedBirthDate
            }

            if (
                knownBirthDate.knownCitizenBirthDate?.includes(
                    'knownApplicantFatherBirthDate:false'
                ) &&
                form.values.father.unspecifiedBirthDate
                    ?.toLowerCase()
                    .includes('vers')
            ) {
                judgementRequesCopy.father.birthDate =
                    form.values.father.unspecifiedBirthDate
            }

            if (
                knownBirthDate.knownCitizenBirthDate?.includes(
                    'knownSecondWitnessBirthDate:false'
                ) &&
                form.values.secondWitness.unspecifiedBirthDate
                    ?.toLowerCase()
                    .includes('vers')
            ) {
                judgementRequesCopy.secondWitness.birthDate =
                    form.values.secondWitness.unspecifiedBirthDate
            }

            const judgementRequestResponse = isEditAction
                ? await editJudgementRequest(judgementRequesCopy).unwrap()
                : await judgementRequest(judgementRequesCopy).unwrap()

            navigate(
                isFromCommunityAgent
                    ? `/judgement`
                    : `/judgement/details/${judgementRequestResponse.id}`,
                {
                    replace: true,
                }
            )
        } catch (error: any) {
            console.log(error)
            console.log('error: ' + error.toString())
            console.log(JSON.stringify(error))
        }
    }
    const closeDialogBox = () => {
        onClose()
    }
    const modalTitle = isFromCommunityAgent
        ? 'Fanamarinana'
        : ' Fanamarinan-ponenana'

    const modalBody = isFromCommunityAgent
        ? `Moa tena sitrakao ny ${
              isEditAction ? 'hampiditra' : 'hanova'
          } ity fangatahana ity ?`
        : `Ny lehiben'ny fokontany ${currentUser?.fokontany?.name} dia manamarina fa ny mpanao fangatahana dia:`
    const cancelOperation = isFromCommunityAgent ? 'Tsia' : 'Hiverina'
    const confirmOperation = isFromCommunityAgent ? 'Eny' : 'Manamarina'
    return (
        <React.Fragment>
            <Title mb="xl" align="center">
                {modalTitle}
            </Title>
            <Text size="xl" fw="bold" align="center" mb="xl">
                {modalBody}
            </Text>

            <Grid gutter="xl" p="xl">
                <Grid.Col
                    span={6}
                    style={{ display: isFromCommunityAgent ? 'none' : 'block' }}
                >
                    <TextInput
                        name="confirmationForm_firstName"
                        label="Monina ao"
                        placeholder={'Lot II P 356 Tanambao V'}
                        variant="filled"
                        size="lg"
                    />
                </Grid.Col>

                <Grid.Col
                    span={6}
                    style={{ display: isFromCommunityAgent ? 'none' : 'block' }}
                >
                    <TextInput
                        name="confirmationForm_uid"
                        label="ary mitondra ny laharana faha"
                        placeholder={'8456143632'}
                        variant="filled"
                        size="lg"
                    />
                </Grid.Col>
                <Grid.Col>
                    <Flex justify="center" gap="xl">
                        <Button
                            variant={'outline'}
                            onClick={() => closeDialogBox()}
                            size="lg"
                        >
                            {cancelOperation}
                        </Button>
                        <Button
                            variant={'filled'}
                            onClick={() => goToDetailsPage()}
                            size="lg"
                            loading={isLoading}
                        >
                            {confirmOperation}
                        </Button>
                    </Flex>
                </Grid.Col>
            </Grid>
        </React.Fragment>
    )
}

ConfirmationForm.displayName = 'ConfirmationForm component'

export default ConfirmationForm

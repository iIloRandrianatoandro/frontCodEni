import React from 'react'
import { Image, Grid, TextInput, Group, Box, Flex, rem } from '@mantine/core'
import { useForm } from '@mantine/form'
import { DateInput } from '@mantine/dates'
import { JudgmentRequestDto } from '@/features/judgement/state/types'
import { useStyle } from './style'

interface ApplicantDetailsProps {
    judgmentData?: JudgmentRequestDto
    formId: string
    title?: string
    disabled?: boolean
}

const ApplicantDetails: React.FC<ApplicantDetailsProps> = ({
    formId,
    judgmentData,
    disabled,
}): JSX.Element => {
    const applicantForm = useForm({
        initialValues: {
            firstname: judgmentData ? judgmentData?.applicant?.fullName : '',
            lastname: judgmentData ? judgmentData?.applicant?.fullLastName : '',
            uid: judgmentData ? judgmentData?.applicant?.nui : '',
            profession: judgmentData ? judgmentData?.applicant?.occupation : '',
            photo:
                judgmentData!.attachedFiles!.length >= 2
                    ? judgmentData!.attachedFiles[1].file
                    : '',
        },
    })
    const { classes } = useStyle()
    return (
        <React.Fragment>
            <Group
                className={classes.root}
                p={15}
                position="apart"
                maw={rem(1440)}
            >
                <Flex
                    mt={0}
                    align={'center'}
                    className={classes.containerAppliantProfil}
                >
                    <Image
                        radius="md"
                        mah={320}
                        maw={320}
                        mih={320}
                        miw={320}
                        width={320}
                        height={320}
                        className={classes.appliantProfil}
                        src={
                            applicantForm.values.photo
                                ? applicantForm.values.photo
                                : '/applicantPhoto.jpeg'
                        }
                        alt="applicant photo"
                    />
                </Flex>

                <Box className={classes.ContainerDetail}>
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput
                                name={`${formId}_firstName`}
                                label="Anarana"
                                placeholder="RAKOTOARISON"
                                variant="filled"
                                size="md"
                                {...applicantForm.getInputProps('firstname')}
                                disabled={disabled}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                name={`${formId}_lastName`}
                                label="Fanampin'anarana feno"
                                placeholder="Amédé"
                                variant="filled"
                                size="md"
                                {...applicantForm.getInputProps('lastname')}
                                disabled={disabled}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput
                                name={`${formId}_dob`}
                                label="Daty nahaterahana"
                                placeholder="Daty nahaterahana"
                                mx="auto"
                                size="md"
                                sx={{ paddingTop: 8 }}
                                variant="filled"
                                disabled={disabled}
                                value={
                                    judgmentData?.applicant.birthDate
                                        .toUpperCase()
                                        .includes('T')
                                        ? judgmentData?.applicant.birthDate
                                              .toUpperCase()
                                              .split('T')[0]
                                        : judgmentData?.applicant.birthDate
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                name={`${formId}_profession`}
                                label="Anton'asa"
                                placeholder="Mpamboly"
                                variant="filled"
                                size="md"
                                sx={{ paddingTop: 8 }}
                                disabled={disabled}
                                value={judgmentData?.applicant.occupation}
                            />
                        </Grid.Col>
                    </Grid>
                    <TextInput
                        name={`${formId}_cniNumber`}
                        label="Laharana kara-panondro (CIN)"
                        placeholder="50103114589"
                        variant="filled"
                        size="md"
                        sx={{ paddingTop: 8 }}
                        disabled={disabled}
                        value={judgmentData?.applicant.numCIN}
                    />
                    <Grid>
                        <Grid.Col span={6}>
                            <DateInput
                                name={`${formId}_cniDateOfDelivery`}
                                valueFormat="DD/MM/YYYY"
                                label="Tamin'ny"
                                placeholder="09/12/2004"
                                mx="auto"
                                size="md"
                                sx={{ paddingTop: 8 }}
                                variant="filled"
                                disabled={disabled}
                                value={
                                    new Date(
                                        judgmentData?.applicant?.dateCIN ||
                                            new Date()
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                name={`${formId}_cniPlaceOfDelivery`}
                                label="Tao"
                                placeholder="Toamasina"
                                variant="filled"
                                size="md"
                                sx={{ paddingTop: 8 }}
                                disabled={disabled}
                                value={
                                    judgmentData?.applicant?.issuancePlaceCIN
                                }
                            />
                        </Grid.Col>
                    </Grid>
                    <TextInput
                        name={`${formId}_residency`}
                        label="Adiresy"
                        placeholder="Lot 169 KD Barikadimy"
                        variant="filled"
                        size="md"
                        sx={{ paddingTop: 8 }}
                        disabled={disabled}
                        value={judgmentData?.applicant?.address}
                    />
                </Box>
            </Group>
        </React.Fragment>
    )
}

ApplicantDetails.displayName = 'ApplicantDetails component'

export default ApplicantDetails

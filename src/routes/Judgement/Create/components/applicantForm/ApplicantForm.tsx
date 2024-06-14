import React, { useState } from 'react'
import { Grid, Group, Paper, Radio } from '@mantine/core'
import { Box, Select, TextInput, Title } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { Gender, JudgmentRequestDto } from '@/features/judgement/state/types'
import { FormikProps } from 'formik'
import { maxDob } from '@/core/dateManagement'
import { useTypedSelector } from '@/store'
import { Role } from '@/features/admin/types'

interface ApplicationFormProps {
    form: FormikProps<JudgmentRequestDto>
    setRawKnownApplicantBirthDate: (knownApplicantBirthDate: string) => void
}

const ApplicantForm: React.FC<ApplicationFormProps> = ({
    form,
    setRawKnownApplicantBirthDate,
}): JSX.Element => {
    const [isKnownBirthDate, setKnownBirthDate] = useState(
        form.values.applicant.knownBirthDate || 'true'
    )

    const { accessToken, currentUser } = useTypedSelector(
        (state) => state.authentication
    )

    const IS_NOT_COMMUNITY_AGENT = currentUser?.role !== Role.COMMUNITY_AGENT

    setRawKnownApplicantBirthDate(isKnownBirthDate)

    return (
        <>
            <Paper p="xl">
                <Box mx="auto">
                    <Title order={3} mb="xl">
                        Mahakasika ny olona hanaovana fangatahana
                    </Title>
                    <Grid gutter="xl">
                        <Grid.Col span={6}>
                            <TextInput
                                withAsterisk
                                required
                                autoFocus
                                id="applicant.fullName"
                                name="applicant.fullName"
                                label="Anarana"
                                placeholder="-"
                                variant="filled"
                                size="md"
                                type={'text'}
                                value={form.values.applicant.fullName}
                                onBlur={form.handleBlur('applicant.fullName')}
                                onChange={form.handleChange(
                                    'applicant.fullName'
                                )}
                                error={
                                    (form.touched.applicant?.fullName &&
                                        form.errors.applicant?.fullName!) ||
                                    Boolean(form.errors.applicant?.fullName)
                                        ? form.errors.applicant?.fullName
                                        : null
                                }
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <TextInput
                                id="applicant.fullLastName"
                                name="applicant.fullLastName"
                                label="Fanampin'anarana"
                                placeholder="-"
                                variant="filled"
                                size="md"
                                type={'text'}
                                onBlur={form.handleBlur}
                                onChange={form.handleChange}
                                value={form.values.applicant.fullLastName}
                                error={form.errors.applicant?.fullLastName}
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <Grid gutter="xl">
                                <Grid.Col span={6}>
                                    <Select
                                        required
                                        withAsterisk
                                        id="applicant.gender"
                                        name="applicant.gender"
                                        label="Lahy sa vavy"
                                        placeholder="Misafidiana iray"
                                        variant="filled"
                                        size="md"
                                        data={[
                                            {
                                                label: 'Lahy',
                                                value: Gender.MALE,
                                            },
                                            {
                                                label: 'Vavy',
                                                value: Gender.FEMALE,
                                            },
                                        ]}
                                        defaultValue={
                                            form.values.applicant.gender
                                        }
                                        onBlur={form.handleBlur(
                                            'applicant.gender'
                                        )}
                                        onChange={() => {
                                            form.handleChange(
                                                'applicant.gender'
                                            )
                                        }}
                                        error={
                                            IS_NOT_COMMUNITY_AGENT &&
                                            form.touched.applicant?.gender &&
                                            form.errors.applicant?.gender!
                                        }
                                    />
                                </Grid.Col>

                                <Grid.Col span={6}>
                                    <TextInput
                                        required={IS_NOT_COMMUNITY_AGENT}
                                        withAsterisk={IS_NOT_COMMUNITY_AGENT}
                                        id="applicant.nationality.name"
                                        name="applicant.nationality.name"
                                        label="Zom-pirenena"
                                        placeholder="Malagasy"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        value={
                                            form.values.applicant.nationality
                                                .name
                                        }
                                        onBlur={form.handleBlur(
                                            'applicant.nationality.name'
                                        )}
                                        onChange={form.handleChange(
                                            'applicant.nationality.name'
                                        )}
                                        error={
                                            IS_NOT_COMMUNITY_AGENT &&
                                            form.touched.applicant?.nationality
                                                ?.name &&
                                            form.errors.applicant?.nationality
                                                ?.name!
                                        }
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <Grid gutter="xl">
                                <Grid.Col span={6}>
                                    <Grid gutter="xl">
                                        <Grid.Col span={6}>
                                            <Radio.Group
                                                value={isKnownBirthDate}
                                                onChange={setKnownBirthDate}
                                                name="applicant.knownBirthDate"
                                                id="applicant.knownBirthDate"
                                                label="Fantatra ny daty nahaterahana ?"
                                                withAsterisk={
                                                    IS_NOT_COMMUNITY_AGENT
                                                }
                                                sx={{
                                                    paddingBottom: 20,
                                                    marginTop: -20,
                                                }}
                                                required={
                                                    IS_NOT_COMMUNITY_AGENT
                                                }
                                            >
                                                <Group mt="xs">
                                                    <Radio
                                                        value="true"
                                                        label="Eny"
                                                    />
                                                    <Radio
                                                        value="false"
                                                        label="Tsia"
                                                    />
                                                </Group>
                                            </Radio.Group>
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <DateInput
                                                required={
                                                    IS_NOT_COMMUNITY_AGENT &&
                                                    isKnownBirthDate === 'true'
                                                }
                                                withAsterisk={
                                                    IS_NOT_COMMUNITY_AGENT &&
                                                    isKnownBirthDate === 'true'
                                                }
                                                id="applicant.birthDate"
                                                name="applicant.birthDate"
                                                valueFormat="DD/MM/YYYY"
                                                label="Daty nahaterahana"
                                                placeholder="Daty nahaterahana"
                                                size="md"
                                                variant="filled"
                                                onBlur={form.handleBlur(
                                                    'applicant.birthDate'
                                                )}
                                                value={
                                                    new Date(
                                                        form.values.applicant?.birthDate
                                                    )
                                                }
                                                maxDate={maxDob(18)}
                                                defaultValue={maxDob(18)}
                                                onChange={(val) => {
                                                    form.setFieldValue(
                                                        'applicant.birthDate',
                                                        val?.toISOString()
                                                    ),
                                                        form.handleBlur(
                                                            'applicant.birthDate'
                                                        )
                                                }}
                                                error={
                                                    isKnownBirthDate ===
                                                        'true' &&
                                                    form.touched.applicant
                                                        ?.birthDate &&
                                                    form.errors.applicant
                                                        ?.birthDate!
                                                }
                                                style={{
                                                    display:
                                                        isKnownBirthDate ===
                                                        'false'
                                                            ? 'none'
                                                            : 'block',
                                                }}
                                            />
                                            <TextInput
                                                required={
                                                    isKnownBirthDate === 'false'
                                                }
                                                withAsterisk={
                                                    isKnownBirthDate === 'false'
                                                }
                                                id="applicant.unspecifiedBirthDate"
                                                name="applicant.unspecifiedBirthDate"
                                                label="Daty nahaterahana"
                                                placeholder="Daty nahaterahana"
                                                size="md"
                                                type={'text'}
                                                variant="filled"
                                                onBlur={form.handleBlur(
                                                    'applicant.unspecifiedBirthDate'
                                                )}
                                                onChange={form.handleChange(
                                                    'applicant.unspecifiedBirthDate'
                                                )}
                                                defaultValue={
                                                    form.values.applicant
                                                        ?.unspecifiedBirthDate
                                                }
                                                value={
                                                    form.values.applicant
                                                        ?.unspecifiedBirthDate ||
                                                    `vers ${(
                                                        new Date().getFullYear() -
                                                        18
                                                    ).toString()}`
                                                }
                                                error={
                                                    IS_NOT_COMMUNITY_AGENT &&
                                                    isKnownBirthDate ===
                                                        'false' &&
                                                    form.touched.applicant
                                                        ?.unspecifiedBirthDate &&
                                                    form.errors.applicant
                                                        ?.unspecifiedBirthDate!
                                                }
                                                style={{
                                                    display:
                                                        isKnownBirthDate ===
                                                        'true'
                                                            ? 'none'
                                                            : 'block',
                                                }}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        id="applicant.birthPlace"
                                        name="applicant.birthPlace"
                                        label="Toerana nahaterahana"
                                        placeholder="-"
                                        variant="filled"
                                        size="md"
                                        type={'text'}
                                        onBlur={form.handleBlur}
                                        onChange={form.handleChange}
                                        value={form.values.applicant.birthPlace}
                                        error={
                                            form.errors.applicant?.birthPlace
                                        }
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <TextInput
                                id="applicant.occupation"
                                name="applicant.occupation"
                                label="Anton'asa"
                                placeholder="-"
                                size="md"
                                type={'text'}
                                variant="filled"
                                onBlur={form.handleBlur}
                                onChange={form.handleChange}
                                value={form.values.applicant.occupation}
                                error={form.errors.applicant?.occupation}
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <TextInput
                                required={IS_NOT_COMMUNITY_AGENT}
                                withAsterisk={IS_NOT_COMMUNITY_AGENT}
                                id="applicant.address"
                                name="applicant.address"
                                label="Adiresy"
                                placeholder="-"
                                variant="filled"
                                size="md"
                                type={'text'}
                                value={form.values.applicant.address}
                                onBlur={form.handleBlur('applicant.address')}
                                onChange={form.handleChange(
                                    'applicant.address'
                                )}
                                error={
                                    IS_NOT_COMMUNITY_AGENT &&
                                    form.touched.applicant?.address &&
                                    form.errors.applicant?.address!
                                }
                            />
                        </Grid.Col>
                    </Grid>
                </Box>
            </Paper>
        </>
    )
}

ApplicantForm.displayName = 'Applicant component'

export default ApplicantForm

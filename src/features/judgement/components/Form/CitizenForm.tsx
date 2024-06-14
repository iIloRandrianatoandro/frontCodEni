import React, { useState } from 'react'
import { DateInput } from '@mantine/dates'
import { Grid, Group, Radio, TextInput, Title } from '@mantine/core'
import { FormikErrors, FormikProps } from 'formik'
import { CitizenDto, JudgmentRequestDto } from '../../state/types'
import { IconCalendar } from '@tabler/icons-react'
import { maxDob } from '@/core/dateManagement'
import { useTypedSelector } from '@/store'
import { Role } from '@/features/admin/types'

interface CitizenFormProps {
    citizen: string
    title: string
    form: FormikProps<JudgmentRequestDto>
    disabled?: boolean
    handleKnownCitizenBirthDate?: (knownBirthDate: string) => void
    knownBirthDate?: string
    judgmentDetail?: JudgmentRequestDto
}

enum Citizen {
    FATHER = 'father',
    MOTHER = 'mother',
    SECOND_WITNESS = 'secondWitness',
    FIRST_WITNESS = 'firstWitness',
    CHILD = 'child',
}

const CitizenForm: React.FC<CitizenFormProps> = ({
    citizen,
    title,
    form,
    disabled,
    handleKnownCitizenBirthDate,
    knownBirthDate,
    judgmentDetail,
}): JSX.Element => {
    type ValueObjectKey = keyof typeof form.values
    const valuekey = citizen as ValueObjectKey

    type ErrorObjectKey = keyof typeof form.errors
    const errorkey = citizen as ErrorObjectKey
    const isFromDetail = judgmentDetail && judgmentDetail?.applicant?.id > 0
    const [isKnownBirthDate, setKnownBirthDate] = useState(
        isFromDetail
            ? (!((judgmentDetail as any)[citizen] as CitizenDto)?.birthDate
                  .toLowerCase()
                  .includes('vers')).toString()
            : (form.values[valuekey] as CitizenDto)?.knownBirthDate || 'false'
    )

    const { accessToken, currentUser } = useTypedSelector(
        (state) => state.authentication
    )

    const IS_NOT_COMMUNITY_AGENT = currentUser?.role !== Role.COMMUNITY_AGENT

    const handleFullNameErrorInCitizenForm = (
        form: FormikProps<JudgmentRequestDto>,
        tag: string
    ) => {
        let helperText = null
        switch (tag) {
            case Citizen.MOTHER:
                helperText =
                    (IS_NOT_COMMUNITY_AGENT &&
                        form.touched.mother?.fullName &&
                        form.errors.mother?.fullName!) ||
                    (IS_NOT_COMMUNITY_AGENT &&
                    Boolean(form.errors?.mother?.fullName)
                        ? form.errors?.mother?.fullName
                        : null)
                break
            case Citizen.FIRST_WITNESS:
                helperText =
                    (IS_NOT_COMMUNITY_AGENT &&
                        form.touched.firstWitness?.fullName &&
                        form.errors.firstWitness?.fullName!) ||
                    (IS_NOT_COMMUNITY_AGENT &&
                    Boolean(form.errors?.firstWitness?.fullName)
                        ? form.errors?.firstWitness?.fullName
                        : null)
                break
            case Citizen.SECOND_WITNESS:
                helperText =
                    (IS_NOT_COMMUNITY_AGENT &&
                        form.touched.secondWitness?.fullName &&
                        form.errors.secondWitness?.fullName!) ||
                    (IS_NOT_COMMUNITY_AGENT &&
                    Boolean(form.errors?.secondWitness?.fullName)
                        ? form.errors?.secondWitness?.fullName
                        : null)
                break
        }

        return helperText
    }

    const handleCINErrorInCitizenForm = (
        form: FormikProps<JudgmentRequestDto>,
        tag: string
    ) => {
        let helperText = null
        switch (tag) {
            case Citizen.FIRST_WITNESS:
                helperText =
                    IS_NOT_COMMUNITY_AGENT &&
                    form.touched.firstWitness?.numCIN &&
                    form.errors.firstWitness?.numCIN!
                break
            case Citizen.SECOND_WITNESS:
                helperText =
                    IS_NOT_COMMUNITY_AGENT &&
                    form.touched.secondWitness?.numCIN &&
                    form.errors.secondWitness?.numCIN!
                break
        }

        return helperText
    }

    const handleBirthDateErrorInCitizenForm = (
        form: FormikProps<JudgmentRequestDto>,
        isCitizenKnownBirthDate: string,
        tag: string
    ) => {
        let helperText = null
        switch (tag) {
            case Citizen.MOTHER:
                helperText =
                    IS_NOT_COMMUNITY_AGENT &&
                    isCitizenKnownBirthDate === 'false' &&
                    form.touched.mother?.birthDate &&
                    form.errors.mother?.birthDate!
                break
            case Citizen.FIRST_WITNESS:
                helperText =
                    IS_NOT_COMMUNITY_AGENT &&
                    isCitizenKnownBirthDate === 'false' &&
                    form.touched.firstWitness?.birthDate &&
                    form.errors.firstWitness?.birthDate!
                break
            case Citizen.SECOND_WITNESS:
                helperText =
                    IS_NOT_COMMUNITY_AGENT &&
                    isCitizenKnownBirthDate === 'false' &&
                    form.touched.secondWitness?.birthDate &&
                    form.errors.secondWitness?.birthDate!
                break
        }

        return helperText
    }

    const handleunspecifiedBirthDateErrorInCitizenForm = (
        form: FormikProps<JudgmentRequestDto>,
        isCitizenKnownBirthDate: string,
        tag: string
    ) => {
        let helperText = null
        switch (tag) {
            case Citizen.MOTHER:
                helperText =
                    IS_NOT_COMMUNITY_AGENT &&
                    isCitizenKnownBirthDate === 'false' &&
                    form.touched.mother?.unspecifiedBirthDate &&
                    form.errors.mother?.unspecifiedBirthDate!
                break
            case Citizen.FIRST_WITNESS:
                helperText =
                    IS_NOT_COMMUNITY_AGENT &&
                    isCitizenKnownBirthDate === 'false' &&
                    form.touched.firstWitness?.unspecifiedBirthDate &&
                    form.errors.firstWitness?.unspecifiedBirthDate!
                break
            case Citizen.SECOND_WITNESS:
                helperText =
                    IS_NOT_COMMUNITY_AGENT &&
                    isCitizenKnownBirthDate === 'false' &&
                    form.touched.secondWitness?.unspecifiedBirthDate &&
                    form.errors.secondWitness?.unspecifiedBirthDate!
                break
        }

        return helperText
    }

    const handleBirthDateMaxValueInCitizenForm = (tag: string) => {
        switch (tag) {
            case Citizen.MOTHER:
                return maxDob(13)
            case Citizen.FATHER:
                return maxDob(13)
            case Citizen.FIRST_WITNESS:
                return maxDob(18)
            case Citizen.SECOND_WITNESS:
                return maxDob(18)
            default:
                return maxDob(18)
        }
    }

    const handleAddressErrorInCitizenForm = (
        form: FormikProps<JudgmentRequestDto>,
        tag: string
    ) => {
        let helperText = null
        switch (tag) {
            case Citizen.MOTHER:
                helperText =
                    IS_NOT_COMMUNITY_AGENT &&
                    form.touched.mother?.address &&
                    form.errors.mother?.address!
                break
            case Citizen.FIRST_WITNESS:
                helperText =
                    IS_NOT_COMMUNITY_AGENT &&
                    form.touched.firstWitness?.address &&
                    form.errors.firstWitness?.address!
                break
            case Citizen.SECOND_WITNESS:
                helperText =
                    IS_NOT_COMMUNITY_AGENT &&
                    form.touched.secondWitness?.address &&
                    form.errors.secondWitness?.address!
                break
        }

        return helperText
    }

    const IS_APPLIED_TO_FATHER = !citizen.includes(Citizen.FATHER)

    handleKnownCitizenBirthDate &&
        handleKnownCitizenBirthDate(`${knownBirthDate}:${isKnownBirthDate}`)

    return (
        <React.Fragment>
            <Grid.Col span={6}>
                <Title order={4}>{title}</Title>

                <Grid gutter="xl">
                    <Grid.Col lg={6} md={12}>
                        <TextInput
                            required={
                                IS_NOT_COMMUNITY_AGENT && IS_APPLIED_TO_FATHER
                            }
                            withAsterisk={
                                IS_NOT_COMMUNITY_AGENT && IS_APPLIED_TO_FATHER
                            }
                            autoFocus={
                                IS_NOT_COMMUNITY_AGENT && IS_APPLIED_TO_FATHER
                            }
                            id={`${citizen}.fullName`}
                            name={`${citizen}.fullName`}
                            label="Anarana"
                            placeholder="-"
                            variant="filled"
                            size="md"
                            type={'text'}
                            value={
                                (form.values[valuekey] as CitizenDto)?.fullName
                            }
                            error={handleFullNameErrorInCitizenForm(
                                form,
                                citizen
                            )}
                            disabled={disabled}
                            onBlur={form.handleBlur(`${citizen}.fullName`)}
                            onChange={form.handleChange(`${citizen}.fullName`)}
                        />
                    </Grid.Col>
                    <Grid.Col lg={6} md={12}>
                        <TextInput
                            id={`${citizen}.fullLastName`}
                            name={`${citizen}.fullLastName`}
                            label="Fanampin'anarana feno"
                            placeholder="-"
                            variant="filled"
                            size="md"
                            type={'text'}
                            disabled={disabled}
                            onChange={form.handleChange}
                            value={
                                (form.values[valuekey] as CitizenDto)
                                    ?.fullLastName
                            }
                            error={
                                (
                                    form.errors[
                                        errorkey
                                    ] as FormikErrors<CitizenDto>
                                )?.fullLastName
                            }
                        />
                    </Grid.Col>
                    <Grid.Col lg={6} md={12}>
                        <Grid gutter="xl">
                            <Grid.Col
                                md={12}
                                py={30}
                                style={{
                                    display: isFromDetail ? 'none' : 'block',
                                }}
                            >
                                {/**Todo : 6 or 12  */}
                                <Radio.Group
                                    value={isKnownBirthDate}
                                    onChange={setKnownBirthDate}
                                    name={`${citizen}.knownBirthDate`}
                                    id={`${citizen}.knownBirthDate`}
                                    label="Fantatra ny daty nahaterahana ?"
                                    withAsterisk={
                                        IS_NOT_COMMUNITY_AGENT &&
                                        IS_APPLIED_TO_FATHER
                                    }
                                    sx={{
                                        paddingBottom: 20,
                                        marginTop: -20,
                                    }}
                                    required={
                                        IS_NOT_COMMUNITY_AGENT &&
                                        IS_APPLIED_TO_FATHER
                                    }
                                >
                                    <Group mt="xs">
                                        <Radio value="true" label="Eny" />
                                        <Radio value="false" label="Tsia" />
                                    </Group>
                                </Radio.Group>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                {' '}
                                {/**Todo : 6 or 12  */}
                                <DateInput
                                    required={
                                        IS_NOT_COMMUNITY_AGENT &&
                                        isKnownBirthDate === 'true' &&
                                        IS_APPLIED_TO_FATHER
                                    }
                                    withAsterisk={
                                        IS_NOT_COMMUNITY_AGENT &&
                                        isKnownBirthDate === 'true' &&
                                        IS_APPLIED_TO_FATHER
                                    }
                                    id={`${citizen}.birthDate`}
                                    name={`${citizen}.birthDate`}
                                    valueFormat="DD/MM/YYYY"
                                    label="Daty nahaterahana"
                                    placeholder="Daty nahaterahana"
                                    size="md"
                                    variant="filled"
                                    disabled={disabled}
                                    onBlur={form.handleBlur(
                                        `${citizen}.birthDate`
                                    )}
                                    value={
                                        isFromDetail
                                            ? new Date(
                                                  (
                                                      (judgmentDetail as any)[
                                                          citizen
                                                      ] as CitizenDto
                                                  )?.birthDate
                                              )
                                            : new Date(
                                                  (
                                                      form.values[
                                                          valuekey
                                                      ] as CitizenDto
                                                  )?.birthDate
                                              )
                                    }
                                    maxDate={handleBirthDateMaxValueInCitizenForm(
                                        citizen
                                    )}
                                    defaultValue={handleBirthDateMaxValueInCitizenForm(
                                        citizen
                                    )}
                                    onChange={(val) =>
                                        form.setFieldValue(
                                            `${citizen}.birthDate`,
                                            val?.toISOString()
                                        )
                                    }
                                    error={handleBirthDateErrorInCitizenForm(
                                        form,
                                        isKnownBirthDate,
                                        citizen
                                    )}
                                    style={{
                                        display:
                                            (isFromDetail &&
                                                (
                                                    (judgmentDetail as any)[
                                                        citizen
                                                    ] as CitizenDto
                                                )?.birthDate
                                                    .toLowerCase()
                                                    .includes('vers')) ||
                                            isKnownBirthDate === 'false'
                                                ? 'none'
                                                : 'block',
                                    }}
                                />
                                <TextInput
                                    required={
                                        IS_NOT_COMMUNITY_AGENT &&
                                        isKnownBirthDate === 'false' &&
                                        IS_APPLIED_TO_FATHER
                                    }
                                    withAsterisk={
                                        IS_NOT_COMMUNITY_AGENT &&
                                        isKnownBirthDate === 'false' &&
                                        IS_APPLIED_TO_FATHER
                                    }
                                    id={`${citizen}.unspecifiedBirthDate`}
                                    name={`${citizen}.unspecifiedBirthDate`}
                                    label="Daty nahaterahana"
                                    placeholder="Daty nahaterahana"
                                    size="md"
                                    type={'text'}
                                    variant="filled"
                                    onBlur={form.handleBlur(
                                        `${citizen}.unspecifiedBirthDate`
                                    )}
                                    onChange={form.handleChange(
                                        `${citizen}.unspecifiedBirthDate`
                                    )}
                                    defaultValue={
                                        (form.values[valuekey] as CitizenDto)
                                            ?.unspecifiedBirthDate
                                    }
                                    value={
                                        isFromDetail
                                            ? (
                                                  (judgmentDetail as any)[
                                                      citizen
                                                  ] as CitizenDto
                                              )?.birthDate
                                            : (
                                                  form.values[
                                                      valuekey
                                                  ] as CitizenDto
                                              )?.unspecifiedBirthDate ||
                                              `vers ${(
                                                  new Date().getFullYear() - 18
                                              ).toString()}`
                                    }
                                    error={handleunspecifiedBirthDateErrorInCitizenForm(
                                        form,
                                        isKnownBirthDate,
                                        citizen
                                    )}
                                    style={{
                                        display:
                                            (isFromDetail &&
                                                !(
                                                    (judgmentDetail as any)[
                                                        citizen
                                                    ] as CitizenDto
                                                )?.birthDate
                                                    .toLowerCase()
                                                    .includes('vers')) ||
                                            isKnownBirthDate === 'true'
                                                ? 'none'
                                                : 'block',
                                    }}
                                    disabled={disabled}
                                />
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <Grid.Col lg={6} md={12}>
                        <Grid gutter="xl">
                            <Grid.Col
                                md={12}
                                py={30}
                                style={{
                                    display: isFromDetail ? 'none' : 'block',
                                }}
                            >
                                <TextInput
                                    id={`${citizen}.occupation`}
                                    name={`${citizen}.occupation`}
                                    label="Anton'asa"
                                    placeholder="-"
                                    disabled={disabled}
                                    variant="filled"
                                    size="md"
                                    type={'text'}
                                    onChange={form.handleChange}
                                    value={
                                        (form.values[valuekey] as CitizenDto)
                                            ?.occupation
                                    }
                                    error={
                                        (
                                            form.errors[
                                                errorkey
                                            ] as FormikErrors<CitizenDto>
                                        )?.occupation
                                    }
                                />
                            </Grid.Col>
                            <Grid.Col
                                md={12}
                                py={30}
                                style={{
                                    display: isFromDetail ? 'none' : 'block',
                                }}
                            >
                                <TextInput
                                    required={IS_NOT_COMMUNITY_AGENT}
                                    withAsterisk={IS_NOT_COMMUNITY_AGENT}
                                    id={`${citizen}.nationality.name`}
                                    name={`${citizen}.nationality.name`}
                                    label="Zom-pirenena"
                                    placeholder="-"
                                    variant="filled"
                                    size="md"
                                    type={'text'}
                                    value={
                                        (form.values[valuekey] as CitizenDto)
                                            .nationality.name
                                    }
                                    onBlur={form.handleBlur(
                                        `${citizen}.nationality.name`
                                    )}
                                    onChange={form.handleChange(
                                        `${citizen}.nationality.name`
                                    )}
                                    error={
                                        IS_NOT_COMMUNITY_AGENT &&
                                        (
                                            form.touched[
                                                errorkey
                                            ] as FormikErrors<CitizenDto>
                                        )?.nationality?.name &&
                                        (
                                            form.errors[
                                                errorkey
                                            ] as FormikErrors<CitizenDto>
                                        )?.nationality?.name!
                                    }
                                />
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <Grid.Col lg={6} md={12}>
                        <TextInput
                            required={
                                IS_NOT_COMMUNITY_AGENT &&
                                IS_APPLIED_TO_FATHER &&
                                !citizen.includes(Citizen.MOTHER)
                            }
                            withAsterisk={
                                IS_NOT_COMMUNITY_AGENT &&
                                IS_APPLIED_TO_FATHER &&
                                !citizen.includes(Citizen.MOTHER)
                            }
                            id={`${citizen}.numCIN`}
                            name={`${citizen}.numCIN`}
                            label="Laharana kara-panondro (CIN)"
                            placeholder="-"
                            variant="filled"
                            disabled={disabled}
                            size={'md'}
                            type={'text'}
                            maxLength={12}
                            minLength={12}
                            value={
                                (form.values[valuekey] as CitizenDto)?.numCIN
                            }
                            error={handleCINErrorInCitizenForm(form, citizen)}
                            onBlur={form.handleBlur(`${citizen}.numCIN`)}
                            onChange={form.handleChange(`${citizen}.numCIN`)}
                        />
                    </Grid.Col>
                    <Grid.Col lg={6} md={12}>
                        <DateInput
                            required={
                                IS_NOT_COMMUNITY_AGENT &&
                                IS_APPLIED_TO_FATHER &&
                                !citizen.includes(Citizen.MOTHER)
                            }
                            withAsterisk={
                                IS_NOT_COMMUNITY_AGENT &&
                                IS_APPLIED_TO_FATHER &&
                                !citizen.includes(Citizen.MOTHER)
                            }
                            id={`${citizen}.dateCIN`}
                            name={`${citizen}.dateCIN`}
                            valueFormat="DD/MM/YYYY"
                            label="Tamin'ny"
                            placeholder="Tamin'ny"
                            disabled={disabled}
                            rightSection={<IconCalendar />}
                            size="md"
                            variant="filled"
                            maxDate={handleBirthDateMaxValueInCitizenForm(
                                citizen
                            )}
                            defaultValue={handleBirthDateMaxValueInCitizenForm(
                                citizen
                            )}
                            value={
                                new Date(
                                    (
                                        form.values[valuekey] as CitizenDto
                                    )?.dateCIN
                                )
                            }
                            onChange={(val) =>
                                form.setFieldValue(
                                    `${citizen}.dateCIN`,
                                    val?.toISOString()
                                )
                            }
                            error={
                                IS_NOT_COMMUNITY_AGENT &&
                                IS_APPLIED_TO_FATHER &&
                                !citizen.includes(Citizen.MOTHER) &&
                                (
                                    form.touched[
                                        errorkey
                                    ] as FormikErrors<CitizenDto>
                                )?.dateCIN &&
                                (
                                    form.errors[
                                        errorkey
                                    ] as FormikErrors<CitizenDto>
                                )?.dateCIN!
                            }
                        />
                    </Grid.Col>
                    <Grid.Col lg={6} md={12}>
                        <TextInput
                            required={
                                IS_NOT_COMMUNITY_AGENT &&
                                IS_APPLIED_TO_FATHER &&
                                !citizen.includes(Citizen.MOTHER)
                            }
                            withAsterisk={
                                IS_NOT_COMMUNITY_AGENT &&
                                IS_APPLIED_TO_FATHER &&
                                !citizen.includes(Citizen.MOTHER)
                            }
                            id={`${citizen}.issuancePlaceCIN`}
                            name={`${citizen}.issuancePlaceCIN`}
                            label="Tao"
                            placeholder="-"
                            disabled={disabled}
                            variant="filled"
                            size="md"
                            type={'text'}
                            value={
                                (form.values[valuekey] as CitizenDto)
                                    ?.issuancePlaceCIN
                            }
                            onChange={form.handleChange}
                            error={
                                IS_NOT_COMMUNITY_AGENT &&
                                IS_APPLIED_TO_FATHER &&
                                !citizen.includes(Citizen.MOTHER) &&
                                (
                                    form.touched[
                                        errorkey
                                    ] as FormikErrors<CitizenDto>
                                )?.issuancePlaceCIN &&
                                (
                                    form.errors[
                                        errorkey
                                    ] as FormikErrors<CitizenDto>
                                )?.issuancePlaceCIN!
                            }
                        />
                    </Grid.Col>
                    <Grid.Col lg={6} md={12}>
                        <TextInput
                            required={
                                IS_NOT_COMMUNITY_AGENT && IS_APPLIED_TO_FATHER
                            }
                            withAsterisk={
                                IS_NOT_COMMUNITY_AGENT && IS_APPLIED_TO_FATHER
                            }
                            id={`${citizen}.address`}
                            name={`${citizen}.address`}
                            label="Adiresy"
                            disabled={disabled}
                            placeholder="-"
                            variant="filled"
                            size="md"
                            type={'text'}
                            value={
                                (form.values[valuekey] as CitizenDto)?.address
                            }
                            error={handleAddressErrorInCitizenForm(
                                form,
                                citizen
                            )}
                            onBlur={form.handleBlur(`${citizen}.address`)}
                            onChange={form.handleChange(`${citizen}.address`)}
                        />
                    </Grid.Col>
                </Grid>
            </Grid.Col>
        </React.Fragment>
    )
}

CitizenForm.displayName = 'CitizenForm features'

export default CitizenForm

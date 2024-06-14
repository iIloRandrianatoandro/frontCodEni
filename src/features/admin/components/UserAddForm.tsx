import {
    Button,
    FileInput,
    Flex,
    Grid,
    Paper,
    Select,
    TextInput,
} from '@mantine/core'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTypedDispatch } from '@/store'
import { Role, UserDto } from '../types'
import { useLazyAddUserQuery } from '../adminApi'
import { updateUserList } from '../state/slice'
import {
    useLazyGetBoroughsQuery,
    useLazyGetDistrictQuery,
    useLazyGetDistrictsQuery,
    useLazyGetFokontanysQuery,
    useLazyGetMunicipalitiesQuery,
    useLazyGetRegionQuery,
} from '@/services/locationApi'
import { LocationSelectItem } from '@/features/common/location/LocalizationBar'
import { mapLocationItemsToSelect } from '@/features/common/location/utils'
import {
    DistrictLocationItem,
    LocationItem,
    RegionLocationItem,
} from '@/features/common/location/state/type'
import { createUserFormSchema } from '../utils'
import { convertToBase64 } from '@/features/judgement/utils'

interface UserAddForm {
    onModalClose: () => void
}

const initialValues: UserDto = {
    authority: '',
    province: {
        id: 0,
        name: '',
    },
    region: {
        id: 0,
        name: '',
    },
    district: {
        id: 0,
        name: '',
    },
    commune: {
        id: 0,
        name: '',
    },
    borough: {
        id: 0,
        name: '',
    },
    fokontany: {
        id: 0,
        name: '',
    },
    email: '',
    enabled: false,
    firstName: '',
    id: 0,
    lastName: '',
    matriculation: '',
    password: '',
    phoneNumber: '',
    role: Role.SEC,
    username: '',
    workPlace: '',
    signature: null,
}

const getCheckedOptionValue = (name: string): LocationItem => {
    const currentElements = document.getElementsByName(name)
    let i: number = 0
    for (i = 0; i < currentElements.length; i++) {
        if ((currentElements[i] as HTMLInputElement).select)
            return {
                id: parseInt((currentElements[i] as HTMLInputElement).value),
                name:
                    (
                        currentElements[i] &&
                        currentElements[i]?.nextSibling &&
                        (currentElements[i]?.nextSibling
                            ?.firstChild as HTMLInputElement)
                    )?.value || '',
            }
    }

    return {
        id: 0,
        name: '',
    }
}

const getSelectedRoleOptionValue = (): Role => {
    const currentElements = document.getElementsByName('role')
    let i: number = 0
    for (i = 0; i < currentElements.length; i++) {
        if ((currentElements[i] as HTMLInputElement).select)
            return (currentElements[i] as HTMLInputElement).value as Role
    }

    return Role.SEC
}

const UserAddForm: React.FC<UserAddForm> = ({ onModalClose }) => {
    const [addUser, { isLoading }] = useLazyAddUserQuery()
    const useDispatch = useTypedDispatch()
    const [getRegion] = useLazyGetRegionQuery()
    const [getDistrict] = useLazyGetDistrictQuery()
    const [getFokontany] = useLazyGetFokontanysQuery()
    const [getBoroughs] = useLazyGetBoroughsQuery()
    const [getDistricts] = useLazyGetDistrictsQuery()
    const [getMunicipalities] = useLazyGetMunicipalitiesQuery()
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

    const [signature, setSignature] = useState<File | null>(null)
    const [
        isAuthorizedToUploadSignatureFile,
        setAuthorizedToUploadSignatureFile,
    ] = useState<boolean>(false)

    const getRegionIdFromDistrictId = async (districtId: number) => {
        const responseRegion = await getDistrict(districtId).unwrap()
        return {
            id: (responseRegion as unknown as DistrictLocationItem).region_id,
            name: (responseRegion as unknown as DistrictLocationItem).name,
        }
    }

    const getProvinceIdFromRegionId = async (regionId: number) => {
        const responseRegion = await getRegion(regionId).unwrap()
        return {
            id: (responseRegion as unknown as RegionLocationItem).province_id,
            name: (responseRegion as unknown as RegionLocationItem).name,
        }
    }

    const onSubmit = async (values: UserDto) => {
        try {
            values.role = getSelectedRoleOptionValue()
            const district = getCheckedOptionValue('districtId')
            const region = await getRegionIdFromDistrictId(district.id)
            values.province = await getProvinceIdFromRegionId(region.id)
            values.region = region
            values.district = district
            values.commune = getCheckedOptionValue('communeId')
            values.borough = getCheckedOptionValue('boroughId')
            values.fokontany = getCheckedOptionValue('fokontanyId')
            values.signature = signature

            const addUserResponse = (await addUser(values).unwrap()) as UserDto
            useDispatch(updateUserList(addUserResponse))
            onModalClose()
        } catch (error: any) {
            console.log('erreur: ' + error.toString())
            console.error(error.data)
            onModalClose()
        }
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
    }
    const handleFokontanyChange = (value: string | null) => {
        const fokontany: string = value ? value : ''
        // onFokontanyChange(fokontany)
        console.log(fokontany)
    }

    const [selectedRoleValue, setSelectedRoleValue] = useState<Role | null>(
        Role.SEC
    )

    useEffect(() => {
        const fetchDistricrs = async () => {
            const response = await getDistricts(0).unwrap()
            setDistricts(mapLocationItemsToSelect((response as any)?.data))
        }

        fetchDistricrs()
    }, [])

    const handleSelectedRoleOptionChange = (e: any) => {
        setSelectedRoleValue(e as Role)
        setAuthorizedToUploadSignatureFile(
            [
                Role.COURT_CLERK,
                Role.MAGISTRATE,
                Role.PROSECUTOR,
                Role.REGISTRAR,
                Role.DOCTOR,
            ].includes(e as Role)
        )
    }

    return (
        <Paper p="xl">
            <Formik
                initialValues={initialValues}
                validationSchema={createUserFormSchema}
                onSubmit={onSubmit}
            >
                {({
                    values,
                    handleSubmit,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid grow>
                            <Grid.Col span={5}>
                                <Select
                                    label="Rôle"
                                    size="lg"
                                    name="role"
                                    onChange={(e) =>
                                        handleSelectedRoleOptionChange(e)
                                    }
                                    variant="filled"
                                    required={true}
                                    error={errors.role}
                                    placeholder="Choisir un role"
                                    defaultValue={Role.SEC}
                                    data={[
                                        { value: Role.ADMIN, label: 'Admin' },
                                        {
                                            value: Role.CENTRAL,
                                            label: 'Central',
                                        },
                                        {
                                            value: Role.COURT_CLERK,
                                            label: 'Greffier',
                                        },
                                        {
                                            value: Role.DOCTOR,
                                            label: 'Médecin',
                                        },
                                        {
                                            value: Role.P_FOKONTANY,
                                            label: 'Président fokontany',
                                        },
                                        {
                                            value: Role.SEC,
                                            label: "Secrétaire d'État Civil(SEC)",
                                        },
                                        {
                                            value: Role.REGISTRAR,
                                            label: "Officier d'État Civil(OEC)",
                                        },
                                        {
                                            value: Role.COMMUNITY_AGENT,
                                            label: 'Agent Communautaire',
                                        },
                                        {
                                            value: Role.MAGISTRATE,
                                            label: 'Président',
                                        },
                                        {
                                            value: Role.PROSECUTOR,
                                            label: 'Procureur',
                                        },
                                    ]}
                                    value={selectedRoleValue}
                                />
                            </Grid.Col>

                            <Grid.Col span={5}>
                                <TextInput
                                    required={selectedRoleValue === Role.DOCTOR}
                                    withAsterisk={
                                        selectedRoleValue === Role.DOCTOR
                                    }
                                    placeholder="Matriculation"
                                    type="text"
                                    size="lg"
                                    name="matriculation"
                                    onChange={handleChange}
                                    value={values.matriculation}
                                    variant="filled"
                                    error={errors.matriculation}
                                    label="Matriculation"
                                />
                            </Grid.Col>
                            <Grid.Col span={5}>
                                <TextInput
                                    required
                                    withAsterisk
                                    placeholder="Nom"
                                    type="text"
                                    size="lg"
                                    name="firstName"
                                    variant="filled"
                                    label="Nom"
                                    value={values.firstName}
                                    onBlur={handleBlur('firstName')}
                                    onChange={handleChange('firstName')}
                                    error={
                                        touched.firstName && errors.firstName
                                    }
                                />
                            </Grid.Col>

                            <Grid.Col span={5}>
                                <TextInput
                                    placeholder="Prénoms"
                                    type="text"
                                    size="lg"
                                    name="lastName"
                                    variant="filled"
                                    label="Prénoms"
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                            </Grid.Col>

                            <Grid.Col span={5}>
                                <TextInput
                                    required
                                    withAsterisk
                                    placeholder="Téléphone"
                                    size="lg"
                                    name="phoneNumber"
                                    variant="filled"
                                    type={'text'}
                                    maxLength={10}
                                    minLength={10}
                                    label="Téléphone"
                                    value={values.phoneNumber}
                                    onBlur={handleBlur('phoneNumber')}
                                    onChange={handleChange('phoneNumber')}
                                    error={
                                        touched.phoneNumber &&
                                        errors.phoneNumber
                                    }
                                />
                            </Grid.Col>

                            <Grid.Col span={5}>
                                <TextInput
                                    required
                                    withAsterisk
                                    placeholder="Email"
                                    type="email"
                                    size="lg"
                                    name="email"
                                    variant="filled"
                                    label="Email"
                                    value={values.email}
                                    onBlur={handleBlur('email')}
                                    onChange={handleChange('email')}
                                    error={touched.email && errors.email}
                                />
                            </Grid.Col>

                            <Grid.Col span={5}>
                                <Select
                                    name="districtId"
                                    type="select"
                                    label="District"
                                    data={districts ? districts : []}
                                    variant="filled"
                                    onChange={handleDistrictChange}
                                    defaultValue={
                                        districts ? districts[0].value : null
                                    }
                                    size="lg"
                                    required={true}
                                />
                            </Grid.Col>

                            <Grid.Col span={5}>
                                <Select
                                    name="communeId"
                                    type="select"
                                    label="Commune"
                                    data={municipalities ?? []}
                                    onChange={handleCommuneChange}
                                    variant="filled"
                                    size="lg"
                                    required={true}
                                />
                            </Grid.Col>

                            <Grid.Col span={5}>
                                <Select
                                    name="boroughId"
                                    type="select"
                                    label="Arrondissement"
                                    data={boroughs ?? []}
                                    variant="filled"
                                    onChange={handleBoroughChange}
                                    size="lg"
                                    required={true}
                                />
                            </Grid.Col>

                            <Grid.Col span={5}>
                                <Select
                                    name="fokontanyId"
                                    type="select"
                                    label="Fokontany"
                                    data={fokontany ?? []}
                                    variant="filled"
                                    onChange={handleFokontanyChange}
                                    size="lg"
                                    required={true}
                                />
                            </Grid.Col>

                            <Grid.Col span={5}>
                                <TextInput
                                    placeholder="Lieu d'affectation"
                                    type="text"
                                    size="lg"
                                    name="workPlace"
                                    onChange={handleChange}
                                    value={values.workPlace}
                                    variant="filled"
                                    error={errors.workPlace}
                                    label="Lieu d'affectation"
                                />
                            </Grid.Col>

                            <Grid.Col
                                span={5}
                                style={{
                                    display: isAuthorizedToUploadSignatureFile
                                        ? 'block'
                                        : ' none',
                                }}
                            >
                                <FileInput
                                    id="signature"
                                    name="signature"
                                    size="lg"
                                    variant="filled"
                                    placeholder="Sonia"
                                    label="Sonia"
                                    // value={values.signature}
                                    onChange={async (val: File) =>
                                        setSignature(
                                            (await convertToBase64(val!)) as any
                                        )
                                    }
                                    required={isAuthorizedToUploadSignatureFile}
                                    withAsterisk={
                                        isAuthorizedToUploadSignatureFile
                                    }
                                />
                            </Grid.Col>
                        </Grid>

                        <Flex gap="md" mx="xl" mt="xl">
                            <Button
                                variant="outline"
                                size="lg"
                                w={'60%'}
                                mx="auto"
                                onClick={onModalClose}
                            >
                                Annuler
                            </Button>

                            <Button
                                type="submit"
                                loading={isLoading}
                                size="lg"
                                w={'60%'}
                                mx="auto"
                            >
                                Confirmer
                            </Button>
                        </Flex>
                    </form>
                )}
            </Formik>
        </Paper>
    )
}

UserAddForm.displayName = 'User add form component'

export default UserAddForm

import { Role, UserDto } from '@/features/admin/types'
import { LocationItem } from '@/features/common/location/state/type'
import * as Yup from 'yup'

const NATIONAL_ID_REGEXP = /^\d{12}$/
const NATIONAL_ID_TEXT_HELPER =
    'Ny laharana KARA-PANONDROANA dia tsy maintsy tarehimarika miisa 12'
const REQUIRED_MESSAGE_INPUT = 'Mila fenoina ity'
const MIN_THREE_CHARACTERS = 'Tsy ampy, mila 3 farany kely indrindra'

export interface JudgmentState {
    judgements: JudgmentRequestDto[] | null
    judgement: JudgmentRequestDto
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export enum MaritalStatus {
    SINGLE = 'SINGLE',
    MARRIED = 'MARRIED',
    WIDOWED = 'WIDOWED',
    DIVORCED = 'DIVORCED',
    SEPARATED = 'SEPARATED',
    NOT_STATED = 'NOT_STATED',
}

export enum ProfileUserSignatureTag {
    BIRTH_CERTIFICATE_NOT_DELIVERED = 'BIRTH_CERTIFICATE_NOT_DELIVERED',
    BIRTH_CERTIFICATE = 'BIRTH_CERTIFICATE',
    SOMANTIC_EXAMINATION_RESULT_CERTIFICATE = 'SOMANTIC_EXAMINATION_RESULT_CERTIFICATE',
    ACCEPTED_CIVIL_CONCLUSION = 'ACCEPTED_CIVIL_CONCLUSION',
    REJECTED_CIVIL_CONCLUSION = 'REJECTED_CIVIL_CONCLUSION',
    UNVALIDATED_CIVIL_CONCLUSION = 'UNVALIDATED_CIVIL_CONCLUSION',
    ACCEPTED_FROM_COURT_CLERK = 'ACCEPTED_FROM_COURT_CLERK',
    REJECTED_FROM_COURT_CLERK = 'REJECTED_FROM_COURT_CLERK',
    APPROVED_AND_SIGNED_BY_MAGISTRATE = 'APPROVED_AND_SIGNED_BY_MAGISTRATE',
}

export enum ProgressionState {
    WAITING = 'WAITING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    REJECTED = 'REJECTED',
}

export enum ProgressionSituation {
    FOKONTANY = 'FOKONTANY',
    COMMUNE = 'COMMUNE',
    DOCTOR = 'DOCTOR',
    TPI = 'TPI',
}

export enum Requester {
    SAME = 'SAME',
    FATHER = 'FATHER',
    MOTHER = 'MOTHER',
    FIRST_WITNESS = 'FIRST_WITNESS',
    SECOND_WITNESS = 'SECOND_WITNESS',
    OTHER = 'OTHER',
}

export interface registryDto {
    registrationNumber: string
    registrationDate: string
    registrationTime: string
}

export interface SuppletiveRegistrationDto {
    suppletiveRegistrationDto: registryDto
    judgmentRequestId: number
}

export interface CitizenDto {
    id: number
    nui: string
    fullName: string
    fullLastName: string
    birthDate: string
    birthPlace: string
    gender: Gender
    issuancePlaceCIN: string
    address: string
    numCIN: string
    dateCIN: string
    occupation: string
    nationality: NationalityDto
    knownBirthDate?: string
    unspecifiedBirthDate?: string
    maritalStatus: MaritalStatus
}

export interface UserSignatureTagDto {
    id: number
    isActive: boolean
    tag: ProfileUserSignatureTag
    user: CitizenDto
    judgmentRequestId: number
}

export interface ProgressionDto {
    id: number
    state: ProgressionState
    step: ProgressionSituation
    updatedAt: string
    updatedBy: string
}

export interface ProsecutionDto {
    id: number
    isAccepted: boolean
    comment: string
    judgmentRequestId: number
    prosecutor?: UserDto
}

export interface UnsuccessfulSearchDto {
    id: number
    identity: string
    birthCertificateFound: string
    judgmentRequestId: number
}

export interface SomaticExamDto {
    id: number
    identity: string
    applicantAge: number
    judgmentRequestId: number
    doctor?: UserDto
}

export interface GrosseDto {
    id: number
    identityNumber: string
    dateVerdict: string
    tribunalPresidentFullName: string
    tpiNamePlace: string
    acceptedJudgement: boolean
    refuseCause: string
    judgmentRequestId: number
    courtClerk?: UserDto
}

export interface NationalityDto {
    code: string
    name: string
}

export interface AttachedFileDto {
    id: number
    file: any
    name: string
    type: string
    category: string
    judgmentRequestId: number
}

export interface JudgmentRequestDto {
    id: number
    numDemand: string
    attachedFiles: AttachedFileDto[]
    userSignatureTags: UserSignatureTagDto[]
    applicant: CitizenDto
    applicantAge: number
    applicantBirthCertificateFound: boolean
    applicantFokonolonaNumber: string
    requester: CitizenDto
    mother: CitizenDto
    father: CitizenDto
    parentMarried: boolean
    firstWitness: CitizenDto
    secondWitness: CitizenDto
    progression: ProgressionDto
    unsuccessfulSearch: UnsuccessfulSearchDto
    somaticExam: SomaticExamDto
    grosse: GrosseDto
    prosecution: ProsecutionDto
    province: LocationItem
    region: LocationItem
    district: LocationItem
    commune: LocationItem
    borough: LocationItem
    fokontany: LocationItem
    createdAt: string
    typeRequester: Requester
    registrationNumber: string
    registrationDate: string
    registrationTime: string
}

export interface JudgmentResponse {
    total: number
    judgments: JudgmentRequestDto[]
}

export const judgementDetailValidationSchema = Yup.object().shape({
    applicant: Yup.object({
        fullName: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        fullLastName: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        gender: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        birthDate: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        birthPlace: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        occupation: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        address: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        nationality: Yup.object({
            name: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        }),
    }),
    father: Yup.object({
        // numCIN: Yup.string()
        //     .matches(NATIONAL_ID_REGEXP, NATIONAL_ID_TEXT_HELPER)
        //     .min(12, NATIONAL_ID_TEXT_HELPER)
        //     .max(12, NATIONAL_ID_TEXT_HELPER),
        /*
            fullName: Yup.string().required('Mila fenoina ity'),
            fullLastName: Yup.string().required('Mila fenoina ity'),
            gender: Yup.string().required('Mila fenoina ity'),
            birthDate: Yup.string().required('Mila fenoina ity'),
            occupation: Yup.string().required('Mila fenoina ity'),
            address: Yup.string().required('Mila fenoina ity'),
            numCIN: Yup.number().required('Mila fenoina ity').max(12).min(12),
            dateCIN: Yup.string().required('Mila fenoina ity'),
            issuancePlaceCIN: Yup.string().required('Mila fenoina ity'),
            nationality: Yup.object({
                name: Yup.string().required('Mila fenoina ity'),
            }),
        */
    }),
    mother: Yup.object({
        fullName: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        birthDate: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        address: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        // numCIN: Yup.string()
        //     // .required(REQUIRED_MESSAGE_INPUT)
        //     .matches(NATIONAL_ID_REGEXP, NATIONAL_ID_TEXT_HELPER)
        //     .min(12, NATIONAL_ID_TEXT_HELPER)
        //     .max(12, NATIONAL_ID_TEXT_HELPER),
        // dateCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        // issuancePlaceCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
    }),
    firstWitness: Yup.object({
        fullName: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        birthDate: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        address: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        numCIN: Yup.string()
            .required(REQUIRED_MESSAGE_INPUT)
            .matches(NATIONAL_ID_REGEXP, NATIONAL_ID_TEXT_HELPER)
            .min(12, NATIONAL_ID_TEXT_HELPER)
            .max(12, NATIONAL_ID_TEXT_HELPER),
        dateCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        issuancePlaceCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
    }),
    secondWitness: Yup.object({
        fullName: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        birthDate: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        address: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        numCIN: Yup.string()
            .required(REQUIRED_MESSAGE_INPUT)
            .matches(NATIONAL_ID_REGEXP, NATIONAL_ID_TEXT_HELPER)
            .min(12, NATIONAL_ID_TEXT_HELPER)
            .max(12, NATIONAL_ID_TEXT_HELPER),
        dateCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        issuancePlaceCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
    }),
})

export const applicationValidationSchema = (role: Role = Role.P_FOKONTANY) =>
    Yup.object().shape({
        id: Yup.string().required(),
        createdAt: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        numDemand:
            role === Role.COMMUNITY_AGENT
                ? Yup.string().notRequired()
                : Yup.string().required(REQUIRED_MESSAGE_INPUT),
        requester: Yup.object({
            fullName:
                role === Role.COMMUNITY_AGENT
                    ? Yup.string().notRequired()
                    : Yup.string().required(REQUIRED_MESSAGE_INPUT),
            address:
                role === Role.COMMUNITY_AGENT
                    ? Yup.string().notRequired()
                    : Yup.string().required(REQUIRED_MESSAGE_INPUT),
        }),
    })

export const appliquantValidationSchema = (role: Role = Role.P_FOKONTANY) =>
    Yup.object().shape({
        applicant: Yup.object({
            fullName: Yup.string().required(REQUIRED_MESSAGE_INPUT),
            gender: Yup.string().required(REQUIRED_MESSAGE_INPUT),
            birthDate:
                role === Role.COMMUNITY_AGENT
                    ? Yup.string().notRequired()
                    : Yup.string().required(REQUIRED_MESSAGE_INPUT),
            // unspecifiedBirthDate: Yup.string().required(REQUIRED_MESSAGE_INPUT),
            address:
                role === Role.COMMUNITY_AGENT
                    ? Yup.string().notRequired()
                    : Yup.string().required(REQUIRED_MESSAGE_INPUT),
            nationality: Yup.object({
                name: Yup.string().required(REQUIRED_MESSAGE_INPUT),
            }),
        }),
    })

export const parentValidationSchema = (role: Role = Role.P_FOKONTANY) =>
    Yup.object().shape({
        father: Yup.object({
            /*
            fullName: Yup.string().required('Mila fenoina ity'),
            fullLastName: Yup.string().required('Mila fenoina ity'),
            gender: Yup.string().required('Mila fenoina ity'),
            birthDate: Yup.string().required('Mila fenoina ity'),
            occupation: Yup.string().required('Mila fenoina ity'),
            address: Yup.string().required('Mila fenoina ity'),
            numCIN: Yup.string()
                .required('Mila fenoina ity')
                .length(
                    12,
                    'Ny laharana CIN dia tsy maintsy tarehimarika miisa 12'
                ),
            dateCIN: Yup.string().required('Mila fenoina ity'),
            issuancePlaceCIN: Yup.string().required('Mila fenoina ity'),
            nationality: Yup.object({
            name: Yup.string().required('Mila fenoina ity'),
            }),
        */
        }),
        mother: Yup.object({
            fullName:
                role === Role.COMMUNITY_AGENT
                    ? Yup.string().notRequired()
                    : Yup.string().required(REQUIRED_MESSAGE_INPUT),
            birthDate:
                role === Role.COMMUNITY_AGENT
                    ? Yup.string().notRequired()
                    : Yup.string().required(REQUIRED_MESSAGE_INPUT),
            // unspecifiedBirthDate: Yup.string().required(REQUIRED_MESSAGE_INPUT),
            address:
                role === Role.COMMUNITY_AGENT
                    ? Yup.string().notRequired()
                    : Yup.string().required(REQUIRED_MESSAGE_INPUT),
            // numCIN: Yup.string()
            //     .required(REQUIRED_MESSAGE_INPUT)
            //     .matches(NATIONAL_ID_REGEXP, NATIONAL_ID_TEXT_HELPER)
            //     .min(12, NATIONAL_ID_TEXT_HELPER)
            //     .max(12, NATIONAL_ID_TEXT_HELPER),
            // dateCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
            // issuancePlaceCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        }),
    })

export const witnessValidationSchema = Yup.object().shape({
    firstWitness: Yup.object({
        fullName: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        birthDate: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        // unspecifiedBirthDate: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        address: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        numCIN: Yup.string()
            .required(REQUIRED_MESSAGE_INPUT)
            .matches(NATIONAL_ID_REGEXP, NATIONAL_ID_TEXT_HELPER)
            .min(12, NATIONAL_ID_TEXT_HELPER)
            .max(12, NATIONAL_ID_TEXT_HELPER),
        dateCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        issuancePlaceCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
    }),
    secondWitness: Yup.object({
        fullName: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        birthDate: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        // unspecifiedBirthDate: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        address: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        numCIN: Yup.string()
            .required(REQUIRED_MESSAGE_INPUT)
            .matches(NATIONAL_ID_REGEXP, NATIONAL_ID_TEXT_HELPER)
            .min(12, NATIONAL_ID_TEXT_HELPER)
            .max(12, NATIONAL_ID_TEXT_HELPER),
        dateCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        issuancePlaceCIN: Yup.string().required(REQUIRED_MESSAGE_INPUT),
    }),
})

export const attachementValidationSchema = Yup.object().shape({
    attachedFiles: Yup.array().of(
        Yup.object().shape({
            file: Yup.mixed().required(REQUIRED_MESSAGE_INPUT),
            name: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        })
    ),
})

export const validationValidationSchema = Yup.object().shape({
    attachedFiles: Yup.array().of(
        Yup.object().shape({
            file: Yup.string().required(REQUIRED_MESSAGE_INPUT),
            name: Yup.string().required(REQUIRED_MESSAGE_INPUT),
        })
    ),
})

export const judgeValidationSchema = Yup.object().shape({
    grosse: Yup.object({
        tribunalPresidentFullName: Yup.string().required(
            REQUIRED_MESSAGE_INPUT
        ),
        tpiNamePlace: Yup.string().required(REQUIRED_MESSAGE_INPUT),
    }),
})

export const grosseValidationSchema = Yup.object().shape({
    grosse: Yup.object({
        dateVerdict: Yup.string(),
    }),
})

export const shouldAcceptGrosseValidationSchema = Yup.object().shape({
    grosse: Yup.object({
        acceptedJudgement: Yup.string().required(REQUIRED_MESSAGE_INPUT),
    }),
})

export interface IGenerateNuiResponse {
    status: string
    status_code: number
    msg: string
    theNuis: string[]
    generatedOn: string
}

export interface TypeRequesterLabel {
    same: string
    father: string
    mother: string
    first_witness: string
    second_witness: string
    other: string
}

export const TYPE_REQUESTER_MALAGASY_LABEL: TypeRequesterLabel = {
    same: 'Ilay hanaovana fangatahana ihany',
    father: 'Ny ray',
    mother: 'Ny reny',
    first_witness: 'Ny vavolombelona voalohany',
    second_witness: 'Ny vavolombelona faharoa',
    other: 'Olona hafa',
}

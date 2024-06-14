import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
    Gender,
    JudgmentRequestDto,
    JudgmentState,
    MaritalStatus,
    ProfileUserSignatureTag,
    ProgressionSituation,
    ProgressionState,
    Requester,
} from './types'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { maxDob } from '@/core/dateManagement'

const initialState: JudgmentState = {
    judgements: null,
    judgement: {
        applicant: {
            address: '',
            birthDate: maxDob(18).toISOString(),
            birthPlace: '',
            dateCIN: new Date().toISOString(),
            fullLastName: '',
            fullName: '',
            gender: Gender.MALE,
            id: 0,
            issuancePlaceCIN: '',
            nationality: {
                code: 'mg',
                name: 'Malagasy',
            },
            nui: '',
            numCIN: '',
            occupation: '',
            knownBirthDate: 'true',
            unspecifiedBirthDate: `vers ${(
                new Date().getFullYear() - 18
            ).toString()}`,
            maritalStatus: MaritalStatus.NOT_STATED,
        },
        applicantAge: 0,
        applicantBirthCertificateFound: false,
        applicantFokonolonaNumber: '',
        attachedFiles: [
            {
                category: 'demandPicture',
                file: null,
                id: 0,
                judgmentRequestId: 0,
                name: 'Sarin’ny taratasy fangatahana',
                type: '',
            },
            {
                category: 'idPhoto',
                file: null,
                id: 0,
                judgmentRequestId: 0,
                name: 'Sarin’ilay olona',
                type: '',
            },
            {
                category: 'firstWitnessCNIRecto',
                file: null,
                id: 0,
                judgmentRequestId: 0,
                name: 'CIN vavolombelona 1(Recto)',
                type: '',
            },
            {
                category: 'firstWitnessCNIVerso',
                file: null,
                id: 0,
                judgmentRequestId: 0,
                name: 'CIN vavolombelona 1(Verso)',
                type: '',
            },
            {
                category: 'secondWitnessCNIRecto',
                file: null,
                id: 0,
                judgmentRequestId: 0,
                name: 'CIN vavolombelona 2(Recto)',
                type: '',
            },
            {
                category: 'secondWitnessCNIVerso',
                file: null,
                id: 0,
                judgmentRequestId: 0,
                name: 'CIN vavolombelona 2(Verso)',
                type: '',
            },
        ],
        borough: {
            id: 0,
            name: '',
        },
        commune: {
            id: 0,
            name: '',
        },
        createdAt: new Date().toISOString(),
        district: {
            id: 0,
            name: '',
        },
        father: {
            address: '',
            birthDate: maxDob(13).toISOString(),
            birthPlace: '',
            dateCIN: maxDob(13).toISOString(),
            fullLastName: '',
            fullName: '',
            gender: Gender.MALE,
            id: 0,
            issuancePlaceCIN: '',
            nationality: {
                code: 'mg',
                name: 'Malagasy',
            },
            nui: '',
            numCIN: '',
            occupation: '',
            knownBirthDate: 'true',
            unspecifiedBirthDate: `vers ${(
                new Date().getFullYear() - 13
            ).toString()}`,
            maritalStatus: MaritalStatus.NOT_STATED,
        },
        firstWitness: {
            address: '',
            birthDate: maxDob(18).toISOString(),
            birthPlace: '',
            dateCIN: maxDob(18).toISOString(),
            fullLastName: '',
            fullName: '',
            gender: Gender.MALE,
            id: 0,
            issuancePlaceCIN: '',
            nationality: {
                code: 'mg',
                name: 'Malagasy',
            },
            nui: '',
            numCIN: '',
            occupation: '',
            knownBirthDate: 'true',
            unspecifiedBirthDate: `vers ${(
                new Date().getFullYear() - 18
            ).toString()}`,
            maritalStatus: MaritalStatus.NOT_STATED,
        },
        fokontany: {
            id: 0,
            name: '',
        },
        grosse: {
            acceptedJudgement: false,
            dateVerdict: new Date().toISOString(),
            id: 0,
            identityNumber: '',
            judgmentRequestId: 0,
            refuseCause: '',
            tpiNamePlace: '',
            tribunalPresidentFullName: '',
        },
        prosecution: {
            id: 0,
            isAccepted: false,
            comment: '',
            judgmentRequestId: 0,
        },
        id: 0,
        mother: {
            address: '',
            birthDate: maxDob(13).toISOString(),
            birthPlace: '',
            dateCIN: maxDob(13).toISOString(),
            fullLastName: '',
            fullName: '',
            gender: Gender.MALE,
            id: 0,
            issuancePlaceCIN: '',
            nationality: {
                code: 'mg',
                name: 'Malagasy',
            },
            nui: '',
            numCIN: '',
            occupation: '',
            knownBirthDate: 'true',
            unspecifiedBirthDate: `vers ${(
                new Date().getFullYear() - 13
            ).toString()}`,
            maritalStatus: MaritalStatus.NOT_STATED,
        },
        numDemand: '',
        registrationNumber: '',
        registrationDate: '',
        registrationTime: '',
        parentMarried: true,
        progression: {
            id: 0,
            step: ProgressionSituation.FOKONTANY,
            state: ProgressionState.IN_PROGRESS,
            updatedAt: new Date().toISOString(),
            updatedBy: '',
        },
        province: {
            id: 0,
            name: '',
        },
        region: {
            id: 0,
            name: '',
        },
        requester: {
            address: '',
            birthDate: maxDob(18).toISOString(),
            birthPlace: '',
            dateCIN: maxDob(18).toISOString(),
            fullLastName: '',
            fullName: '',
            gender: Gender.MALE,
            id: 0,
            issuancePlaceCIN: '',
            nationality: {
                code: 'mg',
                name: 'Malagasy',
            },
            nui: '',
            numCIN: '',
            occupation: '',
            knownBirthDate: 'true',
            unspecifiedBirthDate: `vers ${(
                new Date().getFullYear() - 18
            ).toString()}`,
            maritalStatus: MaritalStatus.NOT_STATED,
        },
        secondWitness: {
            address: '',
            birthDate: maxDob(18).toISOString(),
            birthPlace: '',
            dateCIN: maxDob(18).toISOString(),
            fullLastName: '',
            fullName: '',
            gender: Gender.MALE,
            id: 0,
            issuancePlaceCIN: '',
            nationality: {
                code: 'mg',
                name: 'Malagasy',
            },
            nui: '',
            numCIN: '',
            occupation: '',
            knownBirthDate: 'true',
            unspecifiedBirthDate: `vers ${(
                new Date().getFullYear() - 18
            ).toString()}`,
            maritalStatus: MaritalStatus.NOT_STATED,
        },
        somaticExam: {
            applicantAge: 0,
            id: 0,
            identity: '',
            judgmentRequestId: 0,
        },
        typeRequester: Requester.MOTHER,
        unsuccessfulSearch: {
            birthCertificateFound: '',
            id: 0,
            identity: '',
            judgmentRequestId: 0,
        },
        userSignatureTags: [
            {
                id: 0,
                isActive: true,
                judgmentRequestId: 0,
                tag: ProfileUserSignatureTag.BIRTH_CERTIFICATE_NOT_DELIVERED,
                user: {
                    address: '',
            birthDate: maxDob(18).toISOString(),
            birthPlace: '',
            dateCIN: maxDob(18).toISOString(),
            fullLastName: '',
            fullName: '',
            gender: Gender.MALE,
            id: 0,
            issuancePlaceCIN: '',
            nationality: {
                code: 'mg',
                name: 'Malagasy',
            },
            nui: '',
            numCIN: '',
            occupation: '',
            knownBirthDate: 'true',
            unspecifiedBirthDate: `vers ${(
                new Date().getFullYear() - 18
            ).toString()}`,
            maritalStatus: MaritalStatus.NOT_STATED,
                }
            }
        ]
    },
}

export const judgementSlice = createSlice({
    name: 'judgement',
    initialState,
    reducers: {
        updateJudgementList(
            state,
            action: PayloadAction<JudgmentRequestDto[] | undefined>
        ) {
            state.judgements = [...action.payload!]
        },
        updateJudgement(
            state,
            action: PayloadAction<JudgmentRequestDto | undefined>
        ) {
            state.judgement = {
                ...action.payload!,
            }
        },
    },
})

export const judgementReducer = persistReducer(
    {
        key: 'judgement',
        storage,
    },
    judgementSlice.reducer
)

export const { updateJudgementList, updateJudgement } = judgementSlice.actions

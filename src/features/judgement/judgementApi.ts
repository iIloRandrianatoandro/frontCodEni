import api from '@/services/api'
import {
    JudgmentRequestDto,
    JudgmentResponse,
    ProfileUserSignatureTag,
    ProgressionSituation,
    ProgressionState,
    ProsecutionDto,
    SuppletiveRegistrationDto,
    UnsuccessfulSearchDto,
} from './state/types'
import constants from '@/core/constants'

export const judgementApi = api.injectEndpoints({
    endpoints: (build) => ({
        judgementRequest: build.query<JudgmentRequestDto, JudgmentRequestDto>({
            query: (payload) => ({
                url: `judgment-request`,
                method: 'POST',
                data: payload,
            }),
        }),

        updateCitizenNui: build.query<JudgmentRequestDto, any>({
            query: (payload) => ({
                url: `person/nui/${payload.applicantId}`,
                method: 'PUT',
                data: payload.applicantNui,
            }),
        }),

        updateCitizen: build.query<JudgmentRequestDto, any>({
            query: (payload) => ({
                url: `person/${payload.id}`,
                method: 'PUT',
                data: payload.citizen,
            }),
        }),

        updateJudgementRequestWithGrosse: build.query<
            JudgmentRequestDto,
            JudgmentRequestDto
        >({
            query: (payload) => ({
                url: `judgment-request/grosse/${payload.id}`,
                method: 'PUT',
                data: payload.grosse,
            }),
        }),

        handleProcurationJudgmentRequest: build.mutation<
            void,
            {
                judgmentRequestId: number
                prosecutionReq: { comment: string; isAccepted: boolean }
            }
        >({
            query: (payload) => ({
                url: `judgment-request/prosecution/${payload.judgmentRequestId}`,
                method: 'PUT',
                data: payload.prosecutionReq,
            }),
        }),

        updateJudgementRequestWithSomantic: build.query<
            JudgmentRequestDto,
            JudgmentRequestDto
        >({
            query: (payload) => ({
                url: `judgment-request/somatic-exam/${payload.somaticExam.judgmentRequestId}`,
                method: 'PUT',
                data: payload.somaticExam,
            }),
        }),

        updateJudgementRequestWithUnsuccessfulSearch: build.query<
            UnsuccessfulSearchDto,
            UnsuccessfulSearchDto
        >({
            query: (payload) => ({
                url: `judgment-request/unsuccessful-search/${payload.judgmentRequestId}`,
                method: 'PUT',
                data: payload,
            }),
        }),

        updateJudgmentRegistrationRequest: build.query<
            JudgmentRequestDto,
            SuppletiveRegistrationDto
        >({
            query: (payload) => ({
                url: `judgment-request/update-judgment-registration-request/${payload.judgmentRequestId}`,
                method: 'PUT',
                data: payload.suppletiveRegistrationDto,
            }),
        }),

        getJudgementsByLocalisation: build.query<
            JudgmentResponse,
            number | null
        >({
            query: (page) => ({
                url: `judgment-request/by-localization?offset=${
                    page ?? 0
                }&limit=${constants.pagination.perPage}`,
                method: 'GET',
            }),
        }),

        getJudgementsByProgressionStep: build.query<
            JudgmentResponse,
            number | null
        >({
            query: (page) => ({
                url: `judgment-request/all-by-progression-step?step=COMMUNITY_AGENT&offset=${
                    page ?? 0
                }&limit=${constants.pagination.perPage}`,
                method: 'GET',
            }),
        }),

        getAndFiltered: build.query<
            JudgmentResponse,
            {
                step: ProgressionSituation
                state: ProgressionState
                birthCertificateFound: boolean
                page: number
            }
        >({
            query: (payload) => ({
                url: `judgment-request/filter-by-progression-step-and-state-and-birth-certificate-found?step=${
                    payload.step
                }&state=${payload.state}&birthCertificateFound=${
                    payload.birthCertificateFound
                }&offset=${payload.page ?? 0}&limit=${
                    constants.pagination.perPage
                }`,
                method: 'GET',
            }),
        }),

        getJudgments: build.query<JudgmentResponse, number | null>({
            query: (page) => ({
                url: `judgment-request?offset=${page ?? 0}&limit=${
                    constants.pagination.perPage
                }`,
                method: 'GET',
            }),
        }),

        getAllTreatedJudgments: build.query<JudgmentResponse, number | null>({
            query: (page) => ({
                url: `judgment-request/all-treated-demand?offset=${
                    page ?? 0
                }&limit=${constants.pagination.perPage}`,
                method: 'GET',
            }),
        }),

        getAllJudgments: build.query<JudgmentResponse, any>({
            query: () => ({
                url: `judgment-request?offset=${0}&limit=${90000000}`,
                method: 'GET',
            }),
        }),

        getJudgmentById: build.query<JudgmentRequestDto, string>({
            query: (judgmentRequestId) => ({
                url: `judgment-request/${judgmentRequestId}`,
                method: 'GET',
            }),
        }),

        deleteJudgmentById: build.mutation<void, string>({
            query: (judgmentRequestId) => ({
                url: `judgment-request/${judgmentRequestId}`,
                method: 'DELETE',
            }),
        }),

        editJudgmentRequest: build.mutation<
            JudgmentRequestDto,
            JudgmentRequestDto
        >({
            query: (payload) => ({
                url: `judgment-request/${payload.id}`,
                method: 'PUT',
                data: payload,
            }),
        }),
        displayUserSignature: build.mutation<
            void,
            {
                isActive: boolean
                tag: ProfileUserSignatureTag
                judgmentRequestId: number
            }
        >({
            query: (payload) => ({
                url: `judgment-request/display-user-signature/${payload.judgmentRequestId}`,
                method: 'PUT',
                data: payload,
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useLazyJudgementRequestQuery,
    useLazyGetJudgementsByLocalisationQuery,
    useLazyGetJudgementsByProgressionStepQuery,
    useLazyGetJudgmentsQuery,
    useLazyGetAllJudgmentsQuery,
    useLazyGetJudgmentByIdQuery,
    useLazyUpdateJudgementRequestWithGrosseQuery,
    useLazyUpdateJudgementRequestWithSomanticQuery,
    useLazyUpdateJudgementRequestWithUnsuccessfulSearchQuery,
    useLazyUpdateCitizenNuiQuery,
    useLazyUpdateJudgmentRegistrationRequestQuery,
    useLazyUpdateCitizenQuery,
    useDeleteJudgmentByIdMutation,
    useEditJudgmentRequestMutation,
    useLazyGetAllTreatedJudgmentsQuery,
    useHandleProcurationJudgmentRequestMutation,
    useDisplayUserSignatureMutation,
    useLazyGetAndFilteredQuery,
} = judgementApi

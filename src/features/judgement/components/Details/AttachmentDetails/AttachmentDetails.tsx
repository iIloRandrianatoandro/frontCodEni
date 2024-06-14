import { Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Role, UserDto } from '@/features/admin/types'
import { AttachmentItem } from '@/components/AttachmentItem'
import {
    JudgmentRequestDto,
    ProgressionSituation,
} from '@/features/judgement/state/types'
import { AttachmentStatus } from '@/components/AttachmentItem/AttachmentType'
import { useLazyGetJudgmentByIdQuery } from '@/features/judgement/judgementApi'
import { useLazyProfileQuery } from '@/features/authentication/authenticationApi'
import { GrosseCertificate } from '@/features/judgement/components/Details/AttachmentDetails/components/GrosseCertificate'
import { SomaticExamCertificate } from '@/features/judgement/components/Details/AttachmentDetails/components/SomaticExamCertificate'
import { FruitlessSearchCertificate } from '@/features/judgement/components/Details/AttachmentDetails/components/FruitlessSearchCertificate'
import { BirthCertificate } from './components/BirthCertificate'
import { ConclusionCivilCertificate } from './components/ConclusionCivilCertificate'

interface AttachmentDetailsProps {
    judgementRequestId?: string
}

const AttachmentDetails: React.FC<AttachmentDetailsProps> = ({
    judgementRequestId,
}): JSX.Element => {
    const [getJudgmentById] = useLazyGetJudgmentByIdQuery()
    const [isInitialValid] = useState(false)
    const [judgementRequest, setJudgementRequest] =
        useState<JudgmentRequestDto | null>(null)
    const [user, setUser] = useState<UserDto>()
    const [profile] = useLazyProfileQuery()

    useEffect(() => {
        const fetchJudgementQuery = async () => {
            const judgementRequesto = await getJudgmentById(
                judgementRequestId!
            ).unwrap()
            setJudgementRequest(judgementRequesto)
        }
        const fetchCurrentUser = async () => {
            const currentUser: UserDto = await profile(null).unwrap()
            setUser(currentUser)
        }
        fetchCurrentUser()
        fetchJudgementQuery()
    }, [isInitialValid])

    return (
        <React.Fragment>
            {[
                Role.MAGISTRATE,
                Role.PROSECUTOR,
                Role.REGISTRAR,
                Role.P_FOKONTANY,
                Role.SEC,
                Role.DOCTOR,
                Role.COURT_CLERK,
                Role.ADMIN,
                Role.CENTRAL,
            ].includes(user?.role!) && (
                <React.Fragment>
                    <Title order={6} sx={{ padding: 5 }}>
                        {"Avy amin'ny mpanao fangatahana"}
                    </Title>
                    <AttachmentItem
                        title={'Taratasy fangatahana: '}
                        name={`Fangatahana_${
                            judgementRequest?.applicant?.fullName +
                            ' ' +
                            judgementRequest?.applicant?.fullLastName
                        }.jpg`}
                        file={
                            judgementRequest?.attachedFiles?.length! >= 1
                                ? judgementRequest?.attachedFiles[0].file!
                                : ''
                        }
                        status={
                            judgementRequest?.attachedFiles?.length! >= 1 &&
                            judgementRequest?.attachedFiles[0]?.file?.toString()
                                .length > 0
                                ? AttachmentStatus.FOUND
                                : AttachmentStatus.NOTFOUND
                        }
                        contentForm={<React.Fragment></React.Fragment>}
                    />
                    <AttachmentItem
                        title={'CIN Vavolombelona 1(Recto): '}
                        name={`CIN_vavolombelona1Recto.jpg`}
                        file={
                            judgementRequest?.attachedFiles?.length! >= 3
                                ? judgementRequest?.attachedFiles[2]?.file!
                                : ''
                        }
                        status={
                            judgementRequest?.attachedFiles?.length! >= 3 &&
                            judgementRequest?.attachedFiles[2].file?.toString()
                                .length > 0
                                ? AttachmentStatus.FOUND
                                : AttachmentStatus.NOTFOUND
                        }
                        contentForm={<React.Fragment></React.Fragment>}
                    />
                    <AttachmentItem
                        title={'CIN Vavolombelona 1(Verso): '}
                        name={`CIN_vavolombelona1Verson.jpg`}
                        file={
                            judgementRequest?.attachedFiles?.length! >= 4
                                ? judgementRequest?.attachedFiles[3]?.file!
                                : ''
                        }
                        status={
                            judgementRequest?.attachedFiles?.length! >= 4 &&
                            judgementRequest?.attachedFiles[3].file?.toString()
                                .length > 0
                                ? AttachmentStatus.FOUND
                                : AttachmentStatus.NOTFOUND
                        }
                        contentForm={<React.Fragment></React.Fragment>}
                    />
                    <AttachmentItem
                        title={'CIN Vavolombelona 2(Recto): '}
                        name={'CIN_vavolombelona2Recto.jpg'}
                        file={
                            judgementRequest?.attachedFiles?.length! >= 5
                                ? judgementRequest?.attachedFiles[4]?.file!
                                : ''
                        }
                        status={
                            judgementRequest?.attachedFiles?.length! >= 5 &&
                            judgementRequest?.attachedFiles[4]?.file?.toString()
                                .length > 0
                                ? AttachmentStatus.FOUND
                                : AttachmentStatus.NOTFOUND
                        }
                        contentForm={<React.Fragment></React.Fragment>}
                    />
                    <AttachmentItem
                        title={'CIN Vavolombelona 2(Verso): '}
                        name={'CIN_vavolombelona2Verso.jpg'}
                        file={
                            judgementRequest?.attachedFiles?.length! >= 6
                                ? judgementRequest?.attachedFiles[5]?.file!
                                : ''
                        }
                        status={
                            judgementRequest?.attachedFiles?.length! >= 6 &&
                            judgementRequest?.attachedFiles[5]?.file?.toString()
                                .length > 0
                                ? AttachmentStatus.FOUND
                                : AttachmentStatus.NOTFOUND
                        }
                        contentForm={<React.Fragment></React.Fragment>}
                    />
                </React.Fragment>
            )}

            {/* commented because we have not a model yet */}
            {/* 
                {(user?.role.toString() === Role.SEC ||
                user?.role.toString() === Role.DOCTOR ||
                user?.role.toString() === Role.COURT_CLERK ||
                user?.role.toString() === Role.ADMIN ||
                user?.role.toString() === Role.CENTRAL) && (
                <React.Fragment>
                    <Title order={6} sx={{ padding: 5 }}>
                        {"Avy amin'ny fokontany"}
                    </Title>
                    <AttachmentItem
                        title={'Fanamarinam-ponenana: '}
                        name={'fonenana.jpg'}
                        file={
                            judgementRequest?.attachedFiles?.length! >= 7
                                ? judgementRequest?.attachedFiles[6]?.file!
                                : ''
                        }
                        status={
                            judgementRequest?.attachedFiles?.length! >= 7
                                ? judgementRequest?.attachedFiles[6]?.file?.toString()
                                      .length > 0
                                    ? AttachmentStatus.FOUND
                                    : AttachmentStatus.NOTFOUND
                                : AttachmentStatus.NOTFOUND
                        }
                        contentForm={
                            <React.Fragment>
                                
                            </React.Fragment>
                        }
                    />
                </React.Fragment>
                )}
            */}

            {[
                Role.MAGISTRATE,
                Role.PROSECUTOR,
                Role.REGISTRAR,
                Role.SEC,
                Role.DOCTOR,
                Role.COURT_CLERK,
                Role.ADMIN,
                Role.CENTRAL,
            ].includes(user?.role!) && (
                <React.Fragment>
                    {judgementRequest?.unsuccessfulSearch
                        ?.birthCertificateFound ? (
                        <>
                            <Title order={6} sx={{ padding: 5 }}>
                                {"Avy amin'ny kaominina"}
                            </Title>
                            <AttachmentItem
                                title={'Kopia nahaterahana: '}
                                name={'kopia.pdf'}
                                file={''}
                                status={AttachmentStatus.FOUND}
                                contentForm={
                                    <React.Fragment>
                                        <BirthCertificate
                                            judgementRequest={judgementRequest!}
                                        />
                                    </React.Fragment>
                                }
                            />
                        </>
                    ) : (
                        !judgementRequest?.unsuccessfulSearch
                            ?.birthCertificateFound &&
                        judgementRequest?.unsuccessfulSearch
                            ?.judgmentRequestId! > 0 && (
                            <>
                                <Title order={6} sx={{ padding: 5 }}>
                                    {"Avy amin'ny kaominina"}
                                </Title>
                                <AttachmentItem
                                    title={
                                        'Fanamarinana fikarohana tsy nahitambokany: '
                                    }
                                    name={'CRI.pdf'}
                                    file={''}
                                    status={AttachmentStatus.FOUND}
                                    contentForm={
                                        <React.Fragment>
                                            <FruitlessSearchCertificate
                                                judgementRequest={
                                                    judgementRequest!
                                                }
                                            />
                                        </React.Fragment>
                                    }
                                />
                            </>
                        )
                    )}
                </React.Fragment>
            )}

            {(([Role.SEC, Role.REGISTRAR].includes(user?.role!) &&
                judgementRequest?.progression?.step ===
                    ProgressionSituation.TPI) ||
                (user?.role.toString() === Role.DOCTOR &&
                    judgementRequest?.somaticExam?.applicantAge! > 0) ||
                [
                    Role.ADMIN,
                    Role.COURT_CLERK,
                    Role.CENTRAL,
                    Role.MAGISTRATE,
                    Role.PROSECUTOR,
                ].includes(user?.role!)) && (
                <React.Fragment>
                    <Title order={6} sx={{ padding: 5 }}>
                        {"Avy amin'ny dokotera"}
                    </Title>
                    <AttachmentItem
                        title={'Fitsirihana ara-pahasalamana: '}
                        name={'examenSomatique.pdf'}
                        file={''}
                        status={AttachmentStatus.FOUND}
                        contentForm={
                            <React.Fragment>
                                <SomaticExamCertificate
                                    judgementRequest={judgementRequest!}
                                />
                            </React.Fragment>
                        }
                    />
                </React.Fragment>
            )}

            {(([Role.SEC, Role.REGISTRAR].includes(user?.role!) &&
                judgementRequest?.progression?.step ===
                    ProgressionSituation.TPI) ||
                ([
                    Role.ADMIN,
                    Role.CENTRAL,
                    Role.SEC,
                    Role.REGISTRAR,
                    Role.COURT_CLERK,
                    Role.MAGISTRATE,
                    Role.PROSECUTOR,
                ].includes(user?.role!) &&
                    judgementRequest?.prosecution !== null)) && (
                <React.Fragment>
                    <Title order={6} sx={{ padding: 5 }}>
                        {"Avy amin'ny fampanoavana"}
                    </Title>
                    <AttachmentItem
                        title={'Hevitry ny fampanoavana: '}
                        name={'conclusionCivile.pdf'}
                        file={''}
                        status={AttachmentStatus.FOUND}
                        contentForm={
                            <React.Fragment>
                                <ConclusionCivilCertificate
                                    judgementRequest={judgementRequest!}
                                />
                            </React.Fragment>
                        }
                    />
                </React.Fragment>
            )}

            {(([Role.SEC, Role.REGISTRAR].includes(user?.role!) &&
                judgementRequest?.progression?.step ===
                    ProgressionSituation.TPI) ||
                ([
                    Role.ADMIN,
                    Role.COURT_CLERK,
                    Role.CENTRAL,
                    Role.MAGISTRATE,
                    Role.PROSECUTOR,
                ].includes(user?.role!) &&
                    judgementRequest?.grosse?.tpiNamePlace?.toString()
                        ?.length! > 0)) && (
                <React.Fragment>
                    <Title order={6} sx={{ padding: 5 }}>
                        {"Avy amin'ny mpitsara"}
                    </Title>
                    <AttachmentItem
                        title={'Dididm-pitsarana misolo sora-pahaterahana: '}
                        name={'grosse.pdf'}
                        file={''}
                        status={AttachmentStatus.FOUND}
                        contentForm={
                            <React.Fragment>
                                <GrosseCertificate
                                    judgementRequest={judgementRequest!}
                                />
                            </React.Fragment>
                        }
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

AttachmentDetails.displayName = 'AttachmentDetails feature'

export default AttachmentDetails

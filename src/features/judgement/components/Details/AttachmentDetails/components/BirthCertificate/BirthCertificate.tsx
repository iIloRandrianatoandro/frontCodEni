import React from 'react'
import moment from 'moment'
import { Role, UserDto } from '@/features/admin/types'
import { Box, Grid, Paper, Stack, Text } from '@mantine/core'
import { Gender, JudgmentRequestDto } from '@/features/judgement/state/types'
import { customizeOffice, setDateCustomString, } from '@/core/dateManagement'
import { setNumberToLetterForMalagasySpecificLanguage, setTimeToCustomString } from '@/core/dateManagement'

interface BirthCertificateProps {
    judgementRequest?: JudgmentRequestDto
    currentUser?: UserDto
}

const BirthCertificate:React.FC<BirthCertificateProps> = ({
    judgementRequest,
    currentUser,
}): JSX.Element => {

    const current_user_role: string =
        currentUser?.role.toString().toLowerCase() === 'oec'
            ? 'Mpiandraikitra ny fiankohonana'
            : currentUser?.role.toString().toLowerCase() ==
              Role.SEC.toString().toLowerCase()
            ? 'Mpitantsoratry ny fiankohonana'
            : ''
    const actualDate: string = new Date()
        .toISOString()
        .split('T')[0]
        .split('.')[0]

    return (
        <React.Fragment>
            <Box component={'div'}>
                <Paper variant="outlined" p="xl" sx={{ marginLeft: 60, marginRight: 60, marginBottom: 60, }}>
                    <Grid
                        gutter={5}
                        gutterXs="md"
                        gutterMd="xl"
                        gutterLg={20}
                    >
                        <Grid.Col span={3}>
                            <Stack sx={{ display: 'flex' }}>
                                <span className="float-center">
                                    <img
                                        src={'/toamasinaLogo.png'}
                                        alt="LOGO CU TOAMASINA"
                                        width={100}
                                    />
                                </span>
                                <span>
                                    {' '}
                                    FIRAISANA{' '}
                                    {customizeOffice(
                                        judgementRequest?.commune?.name!
                                    )}
                                </span>
                                ---------------
                                <span>{'FIANKOHONANA'}</span>
                                ---------------
                            </Stack>
                            <Stack>
                                <div>
                                    <br />
                                    laharana :{' '}
                                    <b>
                                        {
                                            judgementRequest?.grosse
                                                ?.identityNumber
                                        }
                                    </b>{' '}
                                    <br />
                                    {moment(
                                        judgementRequest?.grosse?.dateVerdict
                                    ).format('DD/MM/YYYY')}
                                    <br/>
                                </div>
                                <div>
                                    <br />
                                    <br />
                                    <h4>
                                        {' '}
                                        Fandikana didim-pitsarana misolo
                                        sora-pahaterahan'i{' '}
                                    </h4>
                                    <b>
                                        {judgementRequest?.applicant?.fullName}{' '}
                                        {''}
                                        {
                                            judgementRequest?.applicant
                                                ?.fullLastName
                                        }
                                    </b>{' '}
                                    <br />
                                    NUI:
                                    <b>{judgementRequest?.applicant?.nui}</b>{' '}
                                    <br />
                                    Teraka tamin'ny{' '}
                                    <b>
                                        {' '}
                                        {moment(
                                            judgementRequest?.applicant?.birthDate
                                        ).format('DD/MM/YYYY')}{' '}
                                    </b>{' '}
                                    <br />
                                </div>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={9}>
                            <Box sx={{ pl: 4, pr: 4 }}>
                                <Stack>
                                    <Text
                                        variant="h6"
                                        sx={{
                                            textTransform: 'uppercase',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Kopian'ny Sora-piakohonana
                                    </Text>
                                </Stack>
                                <br />
                                <Stack>
                                    <div>
                                        Araka ny ventin'ny didim-pitsarana
                                        mitety vohitra laharana faha{' '}
                                        {setNumberToLetterForMalagasySpecificLanguage(
                                            Number(
                                                judgementRequest?.grosse
                                                    ?.identityNumber
                                            )
                                        )}{' '}
                                        izay navoakan'ny Fitsarana
                                        Ambaratonga Voalohany eto amin'ny
                                        Firaisana{' '}
                                        {customizeOffice(
                                            judgementRequest?.commune?.name!
                                        )}{' '}
                                        voarainay androany{' '}
                                        {setDateCustomString(actualDate)}{' '}
                                        tamin'ny{' '}
                                        {setTimeToCustomString(
                                            new Date()
                                                .toISOString()
                                                .split('T')[1]
                                                .split('.')[0]
                                        )}
                                        .
                                    </div>
                                    <div>
                                        Ny fitsarana mitety vohitra eto{' '}
                                        {judgementRequest?.province?.name
                                            .toString()
                                            .toLowerCase()}{' '}
                                        dia mamoaka izao didy manaraka izao:
                                    </div>
                                    <b>
                                        <span
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            NOHO IREO ANTONY IREO
                                        </span>
                                    </b>
                                    <div>
                                        Dia ambaraina fa teraka tao{' '}
                                        {customizeOffice(
                                            judgementRequest?.commune?.name!
                                        )}
                                        , Distrika{' '}
                                        {customizeOffice(
                                            judgementRequest?.district?.name!
                                        )}{' '}
                                        tamin'ny{' '}
                                        <span>
                                            {' '}
                                            {setDateCustomString(
                                                moment(
                                                    judgementRequest?.applicant
                                                        .birthDate
                                                ).format('YYYY-MM-DD')
                                            )}{' '}
                                        </span>{' '}
                                        , i {' '}
                                        <span>
                                            {' '}
                                            {
                                                judgementRequest?.applicant
                                                    ?.fullName
                                            }{' '}
                                            {
                                                judgementRequest?.applicant
                                                    ?.fullLastName
                                            }{' '}
                                        </span>
                                        {judgementRequest?.applicant?.gender ===
                                        Gender.MALE
                                            ? 'zazalahy'
                                            : 'zazavavy'}{' '}
                                        zanak'i {''}
                                        {
                                            (judgementRequest?.father?.fullName || judgementRequest?.father?.numCIN.toString()) &&
                                            <>
                                                {
                                                    judgementRequest?.father
                                                        ?.fullName
                                                }{' '}
                                                {
                                                    judgementRequest?.father
                                                        ?.fullLastName
                                                }{' '}
                                                teraka tamin'ny{' '}
                                                {setDateCustomString(
                                                    moment(
                                                        judgementRequest?.father
                                                            .birthDate
                                                    ).format('YYYY-MM-DD')
                                                )}
                                                , tao{' '}
                                                {
                                                    judgementRequest?.father
                                                        .birthPlace
                                                }{' '}
                                                sy{' '}
                                            </>
                                            
                                        }
                                        {judgementRequest?.mother?.fullName}{' '}
                                        {judgementRequest?.mother?.fullLastName}{' '}
                                        teraka tamin'ny{''}{' '}
                                        {setDateCustomString(
                                            moment(
                                                judgementRequest?.mother
                                                    ?.birthDate
                                            ).format('YYYY-MM-DD')
                                        )}
                                        , tao{' '}
                                        {judgementRequest?.mother?.birthPlace},
                                        monina ao amin'ny{' '}
                                        {judgementRequest?.mother?.address}.
                                    </div>
                                    <div>
                                        Didianay ny handikana ny ventin'izao
                                        ao amin'ny bokim-pahaterahana ao
                                        amin'ny{' '}
                                        {customizeOffice(
                                            judgementRequest?.commune?.name!
                                        )}{' '}
                                        amin'ny taona diavina.
                                    </div>
                                    <div>
                                        Natao androany{' '}
                                        {setDateCustomString(actualDate)}{' '}
                                        tamin'ny{' '}
                                        {setTimeToCustomString(
                                            new Date()
                                                .toISOString()
                                                .split('T')[1]
                                                .split('.')[0]
                                        )}
                                        .
                                    </div>
                                    <div>
                                        Fandikana nataonay{' '}
                                        {currentUser?.firstName}{' '}
                                        {currentUser?.lastName} ,
                                        {current_user_role} , androany{' '}
                                        {setDateCustomString(actualDate)} .
                                    </div>
                                    =============== MANARAKA NY SONIA
                                    ============
                                    <div>
                                        Kokipa manontolo nadika androany
                                        tamin'ny boky androany{' '}
                                        {setDateCustomString(actualDate)}.
                                    </div>
                                    <div style={{ marginLeft: 100 }}>
                                        Ny mpiandraikitra ny
                                        sora-piankohonana
                                    </div>
                                </Stack>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Box>
        </React.Fragment>
    )
}

BirthCertificate.displayName='BirthCertificate component'

export default BirthCertificate
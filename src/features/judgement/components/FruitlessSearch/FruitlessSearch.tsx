import React from 'react'
import { Grid, TextInput, } from '@mantine/core'
import { JudgmentRequestDto } from '@/features/judgement/state/types';

interface FruitlessSearchProps {
    judgmentData?: JudgmentRequestDto
    formData?: JSX.Element
}

const FruitlessSearch: React.FC<FruitlessSearchProps> = ({judgmentData }): JSX.Element => {
    return (
        <React.Fragment>
            <Grid>
                <Grid.Col span={6}>
                    <TextInput
                        id='applicant_fullName'
                        name='applicant_fullName'
                        label='Anarana sy fanampiny'
                        placeholder={'RAFANOMEZANTSOA Mendrika Toavina'}
                        variant={'filled'}
                        value={ judgmentData?.applicant?.fullName + ' ' + judgmentData?.applicant?.fullLastName }
                        sx={{ paddingBottom: 5 }}
                    />
                    <TextInput
                        id='applicant_father_fullName'
                        name='applicant_father_fullName'
                        label="Zanak'i"
                        variant={'filled'}
                        placeholder={'RAFANOMEZANTSOA Eric'}
                        sx={{ paddingBottom: 5 }}
                        value={ judgmentData?.father?.fullName + ' ' + judgmentData?.father?.fullLastName }
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        id='applicantDob'
                        name='accused_birth_place'
                        label="Teraka tamin'ny"
                        variant='filled'
                        size='md'
                        sx={{ paddingBottom: 20, marginTop: -10 }}
                        value={judgmentData?.applicant?.birthDate
                            .split('T')[0]
                            .replaceAll('-', '/')}
                    />
                    <TextInput
                        id='applicant_mother_FullName'
                        name='applicant_mother_FullName'
                        label='sy'
                        placeholder={'ANDRIANTSEHENO Monica'}
                        variant={'filled'}
                        value={ judgmentData?.mother?.fullName + ' ' + judgmentData?.mother?.fullLastName }
                    />
                </Grid.Col>
            </Grid>
        </React.Fragment>
    );
};

FruitlessSearch.displayName='FruitlessSearch Page'

export default FruitlessSearch
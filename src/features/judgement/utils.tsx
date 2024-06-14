import {
    ActionIcon,
    Badge,
    Button,
    Flex,
    Group,
    Tooltip,
    Modal,
    Tabs,
    TabsProps,
    rem,
} from '@mantine/core'
import {
    IconCircleCheckFilled,
    IconCircleXFilled,
    IconCircleArrowUpRight,
    IconCircleCaretUp,
    IconEdit,
    IconTrash,
    IconEye,
} from '@tabler/icons-react'
import {
    CitizenDto,
    IGenerateNuiResponse,
    JudgmentRequestDto,
    ProfileUserSignatureTag,
    ProgressionSituation,
    ProgressionState,
} from './state/types'
import ActionMenu, {
    ActionMenuItem,
} from './components/Table/ActionMenu/ActionMenu'
import constants from '@/core/constants'
import { useDisclosure } from '@mantine/hooks'
// import { DeleteJudgment } from '@/routes/Judgement/Delete/'
import { useNavigate } from 'react-router-dom'
import { maxDob } from '@/core/dateManagement'
import { Role } from '../admin/types'
import { DisplayUserSignatureAndTag } from '../admin/components/Signature'

const readableProgressionState = new Map<ProgressionState, string>()
readableProgressionState.set(
    ProgressionState.DONE,
    constants.progressionState.done
)
readableProgressionState.set(
    ProgressionState.IN_PROGRESS,
    constants.progressionState.inprogress
)
readableProgressionState.set(
    ProgressionState.REJECTED,
    constants.progressionState.rejected
)
readableProgressionState.set(
    ProgressionState.WAITING,
    constants.progressionState.waiting
)

const readableProgressionSituation = new Map<ProgressionSituation, string>()
readableProgressionSituation.set(ProgressionSituation.COMMUNE, 'Firaisana')
readableProgressionSituation.set(ProgressionSituation.DOCTOR, 'Mpitsabo')
readableProgressionSituation.set(ProgressionSituation.FOKONTANY, 'Fokontany')
readableProgressionSituation.set(ProgressionSituation.TPI, 'Tpi')

export const generateUUIDKey = () => {
    let d = new Date().getTime()
    let d2 =
        (typeof performance !== 'undefined' &&
            performance.now &&
            performance.now() * 1000) ||
        0
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            let r = Math.random() * 16
            if (d > 0) {
                r = (d + r) % 16 | 0
                d = Math.floor(d / 16)
            } else {
                r = (d2 + r) % 16 | 0
                d2 = Math.floor(d2 / 16)
            }
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        }
    )
}

interface JudgmentIdProps {
    judgmentRequestId: number
}

interface JudgmentRequestDtoProps {
    judgment: JudgmentRequestDto
}

const EditJudgment: React.FC<JudgmentIdProps> = ({
    judgmentRequestId,
}): JSX.Element => {
    const navigate = useNavigate()

    return (
        <Tooltip label="Hanova">
            <Button
                variant="outline"
                style={{ border: 0, color: '#546E7A' }}
                onClick={() => navigate(`edit/${judgmentRequestId}`)}
            >
                <ActionIcon component="span" style={{ width: 16, height: 16 }}>
                    <IconEdit />
                </ActionIcon>
                Hanova
            </Button>
        </Tooltip>
    )
}

const DestroyJudgment: React.FC<JudgmentRequestDtoProps> = ({
    judgment,
}): JSX.Element => {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
            <Tooltip label="Hamafa">
                <Button
                    variant="outline"
                    style={{ border: 0, color: '#FF7D67' }}
                    onClick={open}
                >
                    <ActionIcon
                        component="span"
                        color="red"
                        style={{ width: 16, height: 16 }}
                    >
                        <IconTrash />
                    </ActionIcon>
                    Hamafa
                </Button>
            </Tooltip>
            <Modal
                opened={opened}
                onClose={close}
                closeOnClickOutside={true}
                centered
                size="lg"
                title="Tena te-hamafa ity fanambaran ity ve ianao?"
            >
                {/* <DeleteJudgment
                    onClose={close}
                    judgment={judgment}
                ></DeleteJudgment> */}
            </Modal>
        </>
    )
}

const DisplaySignature: React.FC<JudgmentRequestDtoProps> = ({
    judgment,
}): JSX.Element => {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
            <Tooltip label="Hanasonia">
                <Button
                    variant="outline"
                    style={{ border: 0, color: '#02B19D' }}
                    onClick={open}
                >
                    <ActionIcon
                        component="span"
                        color="green"
                        style={{ width: 16, height: 16, color: '#02B19D' }}
                    >
                        <IconEdit />
                    </ActionIcon>
                    Hanasonia
                </Button>
            </Tooltip>
            <Modal
                opened={opened}
                onClose={close}
                closeOnClickOutside={true}
                centered
                size="lg"
                title="Fanamarinana"
            >
                <DisplayUserSignatureAndTag
                    onClose={close}
                    judgment={judgment}
                ></DisplayUserSignatureAndTag>
            </Modal>
        </>
    )
}

const JudgmentDetail: React.FC<JudgmentIdProps> = ({
    judgmentRequestId,
}): JSX.Element => {
    const navigate = useNavigate()

    return (
        <Tooltip label="Hijery">
            <Button
                variant="outline"
                style={{ border: 0, color: '#005162' }}
                onClick={() => navigate(`details/${judgmentRequestId}`)}
            >
                <ActionIcon
                    component="span"
                    style={{ width: 16, height: 16, color: '#005162' }}
                >
                    <IconEye />
                </ActionIcon>
                Hijery
            </Button>
        </Tooltip>
    )
}

export const handleCitizenBirthDate = (
    citizen: CitizenDto,
    age: number = 0
) => {
    if (citizen.birthDate.toLowerCase().includes('vers')) {
        citizen.unspecifiedBirthDate = citizen.birthDate
        citizen.knownBirthDate = 'false'
        citizen.birthDate = maxDob(age).toISOString()
    } else {
        citizen.unspecifiedBirthDate = `vers ${(
            new Date().getFullYear() - age
        ).toString()}`
        citizen.knownBirthDate = 'true'
    }
}

export const mapWithSpecificProfileTheJudgmentsToRows = (
    judgments: JudgmentRequestDto[],
    role: Role,
    fromRegistrarAndRejected: boolean = false
) => {
    let isJudgmentRequestAlreadySigned = (
        judgment: JudgmentRequestDto,
        fromMagistrat: boolean = true
    ): boolean => {
        if (fromMagistrat)
            return (
                judgment.userSignatureTags.filter((userSignatureTag) => {
                    return [
                        ProfileUserSignatureTag.APPROVED_AND_SIGNED_BY_MAGISTRATE,
                    ].includes(userSignatureTag.tag)
                }).length > 0
            )
        if (fromRegistrarAndRejected)
            return (
                judgment.userSignatureTags.filter((userSignatureTag) => {
                    return (
                        [
                            ProfileUserSignatureTag.BIRTH_CERTIFICATE_NOT_DELIVERED,
                        ].includes(userSignatureTag.tag) &&
                        judgment.unsuccessfulSearch.birthCertificateFound.toString() ===
                            'false'
                    )
                }).length > 0
            )

        return (
            judgment.userSignatureTags.filter((userSignatureTag) => {
                return [ProfileUserSignatureTag.BIRTH_CERTIFICATE].includes(
                    userSignatureTag.tag
                )
            }).length > 0
        )
    }

    return judgments.length != 0
        ? judgments.map((judgment) => {
              return [
                  judgment.numDemand,
                  judgment.applicant.fullName,
                  judgment.applicant.fullLastName,
                  <Flex
                      gap="md"
                      key={`${judgment.id} - ${generateUUIDKey()}`}
                      style={{ justifyContent: 'center' }}
                  >
                      {role === Role.COMMUNITY_AGENT && (
                          <>
                              <EditJudgment judgmentRequestId={judgment.id} />
                              <DestroyJudgment judgment={judgment} />
                          </>
                      )}
                      {[
                          Role.REGISTRAR,
                          Role.MAGISTRATE,
                          Role.PROSECUTOR,
                      ].includes(role) && (
                          <>
                              {((role === Role.REGISTRAR &&
                                  !isJudgmentRequestAlreadySigned(
                                      judgment,
                                      false
                                  )) ||
                                  (role === Role.MAGISTRATE &&
                                      !isJudgmentRequestAlreadySigned(
                                          judgment
                                      ))) && (
                                  <DisplaySignature judgment={judgment} />
                              )}
                              <JudgmentDetail judgmentRequestId={judgment.id} />
                          </>
                      )}
                  </Flex>,
              ]
          })
        : null
}

export const mapJudgmentsToRows = (
    judgments: JudgmentRequestDto[],
    actionMenuItems: ActionMenuItem[]
) => {
    return judgments && judgments.length != 0
        ? judgments.map((judgment) => {
              return [
                  judgment.numDemand,
                  judgment.applicant.fullName,
                  judgment.applicant.fullLastName,
                  <Group
                      position="center"
                      key={`${judgment.id} - ${generateUUIDKey()}`}
                  >
                      <Badge
                          variant="gradient"
                          gradient={{
                              from: `${setBadgeStepColor(
                                  judgment,
                                  ProgressionSituation.FOKONTANY
                              )}`,
                              to: `${setBadgeStepColor(
                                  judgment,
                                  ProgressionSituation.FOKONTANY
                              )}`,
                          }}
                      >
                          Fokontany
                      </Badge>
                      <Badge
                          variant="gradient"
                          gradient={{
                              from: `${setBadgeStepColor(
                                  judgment,
                                  ProgressionSituation.COMMUNE
                              )}`,
                              to: `${setBadgeStepColor(
                                  judgment,
                                  ProgressionSituation.COMMUNE
                              )}`,
                          }}
                      >
                          Firaisana
                      </Badge>
                      <Badge
                          variant="gradient"
                          gradient={{
                              from: `${setBadgeStepColor(
                                  judgment,
                                  ProgressionSituation.DOCTOR
                              )}`,
                              to: `${setBadgeStepColor(
                                  judgment,
                                  ProgressionSituation.DOCTOR
                              )}`,
                          }}
                      >
                          Mpitsabo
                      </Badge>
                      <Badge
                          variant="gradient"
                          gradient={{
                              from: `${setBadgeStepColor(
                                  judgment,
                                  ProgressionSituation.TPI
                              )}`,
                              to: `${setBadgeStepColor(
                                  judgment,
                                  ProgressionSituation.TPI
                              )}`,
                          }}
                      >
                          Fitsarana
                      </Badge>
                  </Group>,

                  <Group
                      position="center"
                      key={`${judgment.id} - ${generateUUIDKey()}`}
                  >
                      <Badge
                          leftSection={
                              judgment.progression.state.toLowerCase() ===
                              constants.filter.value.rejected ? (
                                  <IconCircleXFilled
                                      size={20}
                                      style={{ paddingTop: 5 }}
                                  />
                              ) : (
                                  <>
                                      {judgment.progression.state.toLowerCase() ===
                                      constants.filter.value.done ? (
                                          <IconCircleCheckFilled
                                              size={20}
                                              style={{ paddingTop: 5 }}
                                          />
                                      ) : (
                                          <>
                                              {judgment.progression.state.toLowerCase() ===
                                              constants.filter.value.waiting ? (
                                                  <IconCircleCaretUp
                                                      size={20}
                                                      style={{ paddingTop: 5 }}
                                                  />
                                              ) : (
                                                  <IconCircleArrowUpRight
                                                      size={20}
                                                      style={{ paddingTop: 5 }}
                                                  />
                                              )}
                                          </>
                                      )}
                                  </>
                              )
                          }
                          variant="gradient"
                          w={120}
                          gradient={{
                              from: `${setBadgeColor(judgment, true)}`,
                              to: `${setBadgeColor(judgment, true)}`,
                          }}
                      >
                          {readableProgressionState.get(
                              judgment.progression.state
                          )}
                      </Badge>
                  </Group>,
                  <ActionMenu
                      menuItems={actionMenuItems}
                      itemId={judgment.id}
                      editable={
                          judgment.progression?.state ===
                              (ProgressionState.DONE ||
                                  ProgressionState.REJECTED) &&
                          judgment.progression?.step ===
                              ProgressionSituation.TPI
                      }
                      key={`${judgment.id} - ${generateUUIDKey()}`}
                  />,
              ]
          })
        : null
}

export const mapDoneJudgmentsToRows = (judgments: JudgmentRequestDto[]) => {
    return judgments.length != 0
        ? judgments.map((judgment) => {
              return [
                  judgment.id,
                  judgment.applicant.fullName,
                  judgment.applicant.fullLastName,
                  judgment.createdAt,
                  judgment.grosse.dateVerdict,
                  <Badge
                      leftSection={
                          judgment.grosse.acceptedJudgement ? (
                              <IconCircleCheckFilled size={16} />
                          ) : (
                              <IconCircleXFilled size={16} />
                          )
                      }
                      size="lg"
                      style={{ lineHeight: 1 }}
                      color={
                          judgment.grosse.acceptedJudgement ? 'green' : 'red'
                      }
                      key={`${judgment.id} - ${generateUUIDKey()}`}
                  >
                      {judgment.grosse.acceptedJudgement ? 'Accordé' : 'Refusé'}
                  </Badge>,
              ]
          })
        : null
}

export const string2Bin = (text: string) => {
    let result = []
    for (let i = 0; i < text.length; i++) {
        result.push(text.charCodeAt(i).toString(2))
    }
    return result
}

export const fileToBin = async (file: File, cb: (result: any) => void) => {
    let r = new FileReader()
    r.onload = () => {
        cb(r.result)
    }
    r.readAsBinaryString(file)
}

export const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

export async function generateCitizenUniqueId(): Promise<string | undefined> {
    try {
        const response = await fetch(
            `${constants.nuiGenerator.nuiGeneratorUrl}/generate`,
            {
                method: 'POST',
                body: JSON.stringify({
                    batchSize: 1,
                    destinator: 'siecm',
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${constants.nuiGenerator.nuiGeneratorToken}`,
                },
            }
        )

        const nuiData: IGenerateNuiResponse = await response.json()

        if (nuiData && nuiData.theNuis && nuiData.theNuis.length > 0) {
            updateCitizenUniqueIdStatus(nuiData.theNuis[0])
            return nuiData.theNuis[0]
        }
    } catch (error) {
        console.error('generateCitizenUniqueIdWithError: ', error)
    }
    return undefined
}

async function updateCitizenUniqueIdStatus(theNui: string) {
    await fetch(`${constants.nuiGenerator.nuiGeneratorUrl}/affect`, {
        method: 'POST',
        body: JSON.stringify({
            nui: [theNui],
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${constants.nuiGenerator.nuiGeneratorToken}`,
        },
    })
}

function setBadgeStepColor(
    judgment: JudgmentRequestDto,
    localizationTag: string = ProgressionSituation.FOKONTANY
) {
    let gradient = constants.progressStepColor.stepOrStatusInprogress
    let localizationStepsColor: {
        fokontany: string
        commune: string
        doctor: string
        tpi: string
    } = {
        fokontany: gradient,
        commune: gradient,
        doctor: gradient,
        tpi: gradient,
    }

    switch (judgment.progression.step.toUpperCase()) {
        case ProgressionSituation.FOKONTANY:
            localizationStepsColor.fokontany = setBadgeColor(judgment)
            break
        case ProgressionSituation.COMMUNE:
            localizationStepsColor.commune = setBadgeColor(judgment)
            localizationStepsColor.fokontany =
                constants.progressStepColor.stepDone
            break
        case ProgressionSituation.DOCTOR:
            localizationStepsColor.doctor = setBadgeColor(judgment)
            localizationStepsColor.fokontany =
                constants.progressStepColor.stepDone
            localizationStepsColor.commune =
                constants.progressStepColor.stepDone
            break
        case ProgressionSituation.TPI:
            localizationStepsColor.doctor = constants.progressStepColor.stepDone
            localizationStepsColor.fokontany =
                constants.progressStepColor.stepDone
            localizationStepsColor.commune =
                constants.progressStepColor.stepDone
            localizationStepsColor.tpi = setBadgeColor(judgment)
            break
    }

    return (localizationStepsColor as any)[localizationTag.toLowerCase()]
}

function setBadgeColor(
    judgment: JudgmentRequestDto,
    fromState: boolean = false
) {
    let gradiantColor = constants.progressStepColor.stepOrStatusInprogress
    if (
        judgment.progression.state.toLowerCase() === constants.filter.value.done
    ) {
        gradiantColor = fromState
            ? constants.progressStepColor.statusComplete
            : constants.progressStepColor.stepDone
    } else if (
        judgment.progression.state.toLowerCase() ===
        (constants.filter.value.rejected || constants.filter.value.answered)
    ) {
        gradiantColor = constants.progressStepColor.stepOrStatusRejected
    } else if (
        judgment.progression.state.toLowerCase() ===
        constants.filter.value.waiting
    ) {
        gradiantColor = constants.progressStepColor.stepOrStatusInprogress
    } else if (
        judgment.progression.state.toLowerCase() ===
        constants.filter.value.inprogress
    ) {
        gradiantColor = constants.progressStepColor.stepOrStatusInprogress
    }

    return gradiantColor
}

export const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function StyledTabs(props: TabsProps) {
    return (
        <Tabs
            unstyled
            styles={(theme) => ({
                tab: {
                    ...theme.fn.focusStyles(),
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[6]
                            : '#CFD8DC',
                    color:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[0]
                            : theme.colors.gray[9],
                    border: `${rem(1)} solid ${
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[6]
                            : theme.colors.gray[4]
                    }`,
                    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                    cursor: 'pointer',
                    fontSize: theme.fontSizes.sm,
                    display: 'flex',
                    alignItems: 'center',

                    '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                    },

                    '&:not(:first-of-type)': {
                        borderLeft: 0,
                    },

                    '&:first-of-type': {
                        borderTopLeftRadius: theme.radius.md,
                        borderBottomLeftRadius: theme.radius.md,
                    },

                    '&:last-of-type': {
                        borderTopRightRadius: theme.radius.md,
                        borderBottomRightRadius: theme.radius.md,
                    },

                    '&[data-active]': {
                        backgroundColor: '#005162',
                        borderColor: theme.colors.blue[7],
                        color: theme.white,
                    },
                },

                tabIcon: {
                    marginRight: theme.spacing.xs,
                    display: 'flex',
                    alignItems: 'center',
                },

                tabsList: {
                    display: 'flex',
                },
            })}
            {...props}
        />
    )
}

import { Badge } from '@mantine/core'
import { Role, UserDto } from './types'
import { store } from '@/store'
import { ActionMenu } from '../judgement/components/Table/ActionMenu'
import { ActionMenuItem } from '../judgement/components/Table/ActionMenu/ActionMenu'

import * as Yup from 'yup'
import { generateUUIDKey } from '../judgement/utils'

export const mapUsersToRows = (
    users: UserDto[],
    actionMenuItems: ActionMenuItem[]
) => {
    const currentUser = store.getState().authentication.currentUser as UserDto

    return users.length != 0
        ? users.map((user) => {
              return [
                  `${user.firstName} ${
                      user.firstName == currentUser?.firstName ? '(vous)' : ''
                  }`,
                  user.lastName,
                  user.email,
                  mapRoleToReadableRole(user.role),
                  <Badge
                      size="lg"
                      style={{ lineHeight: 1 }}
                      color={user.enabled ? 'green' : 'yellow'}
                      key={`${user.id} - ${generateUUIDKey()}`}
                  >
                      {user.enabled ? 'Actif' : 'Inactif'}
                  </Badge>,
                  user.role != Role.ADMIN || user.id != currentUser.id ? (
                      <ActionMenu
                          menuItems={actionMenuItems}
                          itemId={user.id}
                          editable={false}
                      />
                  ) : null,
              ]
          })
        : null
}

const readableRole = new Map<Role, string>()

readableRole.set(Role.ADMIN, 'Admin')
readableRole.set(Role.CENTRAL, 'Centrale')
readableRole.set(Role.COURT_CLERK, 'Greffier')
readableRole.set(Role.DOCTOR, 'Médecin')
readableRole.set(Role.P_FOKONTANY, 'Président du fokontany')
readableRole.set(Role.SEC, "Secrétaire d'état civil")
readableRole.set(Role.REGISTRAR, "Officier d'état civil")
readableRole.set(Role.COMMUNITY_AGENT, 'Agent Communautaire')
readableRole.set(Role.MAGISTRATE, 'Président')
readableRole.set(Role.PROSECUTOR, 'Procureur')

export const mapRoleToReadableRole = (role: Role) => {
    return readableRole.get(role)
}

const INPUT_REQUIRED_MESSAGE = 'Mila fenoina ity'
const PHONE_NUMBER_REGEXP = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
const MESSAGE_TEXT_HELPER = 'Ny laharana finday dia tsy maintsy tarehimarika 10'

export const createUserFormSchema = Yup.object().shape({
    email: Yup.string().required(INPUT_REQUIRED_MESSAGE).email(),
    // role: Yup.object().shape({
    //     label: Yup.string().required(INPUT_REQUIRED_MESSAGE),
    //     value: Yup.string().required(INPUT_REQUIRED_MESSAGE),
    // }),
    // boroughId: Yup.object().shape({
    //     label: Yup.string().required(INPUT_REQUIRED_MESSAGE),
    //     value: Yup.string().required(INPUT_REQUIRED_MESSAGE),
    // }),
    // communeId: Yup.object().shape({
    //     label: Yup.string().required(INPUT_REQUIRED_MESSAGE),
    //     value: Yup.string().required(INPUT_REQUIRED_MESSAGE),
    // }),
    // districtId: Yup.object().shape({
    //     label: Yup.string().required(INPUT_REQUIRED_MESSAGE),
    //     value: Yup.string().required(INPUT_REQUIRED_MESSAGE),
    // }),
    firstName: Yup.string().required(INPUT_REQUIRED_MESSAGE).min(4).max(255),
    phoneNumber: Yup.string()
        .required(INPUT_REQUIRED_MESSAGE)
        .matches(PHONE_NUMBER_REGEXP, MESSAGE_TEXT_HELPER)
        .length(10, MESSAGE_TEXT_HELPER),
})

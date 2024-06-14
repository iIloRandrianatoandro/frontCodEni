import { FaBars } from 'react-icons/fa'
import React, { FC, useState } from 'react'
import { TfiMenuAlt } from 'react-icons/tfi'
import { NavLink } from 'react-router-dom'
import { SideBarData } from '@/components/SideBarView/Type'
import { SideBarProps } from '@/components/SideBarView/Type'
import { Div, H1, Main, Span } from '@/components/SideBarView/Style'
import constants from '@/core/constants'

const SideBarView: FC<SideBarProps> = ({ children }): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const toggle = () => setIsOpen(!isOpen)

    const sidebarData: SideBarData[] = [
        {
            path: constants.routes.root,
            name: 'Liste des demandes',
            icon: <TfiMenuAlt />,
        },
    ]

    return (
        <React.Fragment>
            <Div className="container">
                <Div
                    className="sidebar"
                    style={{ width: isOpen ? '220px' : '50px' }}
                >
                    <Div className="top_section">
                        <Div
                            className="bars"
                            style={{ marginLeft: isOpen ? '10px' : '0px' }}
                        >
                            <H1
                                className="logo"
                                style={{ display: isOpen ? 'block' : 'none' }}
                            >
                                <Span
                                    style={{
                                        marginRight: isOpen ? '2px' : '0px',
                                    }}
                                >
                                    Tableau de bord
                                </Span>
                            </H1>
                            &nbsp; &nbsp;
                            <FaBars
                                onClick={toggle}
                                style={{
                                    marginLeft: isOpen ? '02px' : '0px',
                                    marginTop: '08px',
                                }}
                            />
                            &nbsp;
                        </Div>
                    </Div>
                    {sidebarData.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link">
                            {/* <Div className='icon'>{item.icon}</Div> */}
                            <Div
                                className="link_text"
                                style={{ display: isOpen ? 'block' : 'none' }}
                            >
                                {item.icon} {item.name}
                            </Div>
                        </NavLink>
                    ))}
                </Div>
                <Main>{children}</Main>
            </Div>
        </React.Fragment>
    )
}

export default SideBarView

import { MenuOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import React from 'react'

import CnSvg from '@/icons/icon_cn.svg'
import EnSvg from '@/icons/icon_en.svg'
import useContainer from '@/shared/hooks/useContainer'
import useTheme from '@/shared/hooks/useTheme'

import ActiveLink from '../Link/ActiveLink'

const languages = {
  cn: <CnSvg width={32} height={32} />,
  en: <EnSvg width={32} height={32} />
}

const Header: React.FunctionComponent = () => {
  const [lan] = React.useState<'cn' | 'en'>('cn')
  const theme = useTheme()
  const { containerWidth } = useContainer()

  const navs = [
    {
      href: '/',
      title: 'Home'
    },
    {
      href: '/ranking',
      title: 'Ranking'
    },
    {
      href: '/activity',
      title: 'Activity'
    },
    {
      href: '/market',
      title: 'Market'
    },
    {
      href: '/help',
      title: 'Help'
    },
    {
      href: '/record',
      title: 'Record'
    }
  ]

  return (
    <>
      <header>
        <div className="container">
          <img className="logo" src="/imgs/logo.png" alt="logo" />
          <nav>
            {navs.map((nav, index) => (
              <ActiveLink href={nav.href} key={index}>
                <a>{nav.title}</a>
              </ActiveLink>
            ))}
          </nav>
          <div className="right">
            <Button type="text">My Account</Button>
            <div className="language">
              <Dropdown
                placement={'bottomLeft'}
                trigger={['click']}
                overlay={
                  <Menu>
                    <Menu.Item key="1">{languages['en']}</Menu.Item>
                    <Menu.Item key="2">{languages['cn']}</Menu.Item>
                  </Menu>
                }>
                {languages[lan]}
              </Dropdown>
            </div>
            <div className="mb-menu">
              <Dropdown
                placement={'bottomLeft'}
                trigger={['click']}
                overlay={
                  <Menu>
                    {navs.map((nav, index) => (
                      <Menu.Item key={index}>
                        <ActiveLink href={nav.href}>
                          <a>{nav.title}</a>
                        </ActiveLink>
                      </Menu.Item>
                    ))}
                  </Menu>
                }>
                <MenuOutlined />
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
      <style jsx>{`
        a {
          color: ${theme['@text-color']};
        }
        a.active {
          color: ${theme['@primary-color']};
        }

        header {
          width: 100%;
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: ${containerWidth}px;
          height: 64px;
          margin: 0 auto;
        }

        .right {
          display: flex;
          align-items: center;
        }

        nav {
          flex: 1;
          margin: 0 40px;
        }
        nav a {
          margin-right: 40px;
        }
        nav a:nth-last-of-type(1) {
          margin-right: 0;
        }

        .mb-menu {
          display: none;
          margin-left: 16px;
        }

        @media screen and (max-width: 1200px) {
          nav a {
            margin-right: 20px;
          }
        }
        @media screen and (max-width: 992px) {
          .mb-menu {
            display: block;
          }
          nav {
            display: none;
          }
        }
        @media screen and (max-width: 576px) {
          .language {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export default Header
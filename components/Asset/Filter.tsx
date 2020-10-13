import { Checkbox, Input, Menu, Row, Slider } from 'antd'
import Link from 'next/link'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { IProject } from '@/api/types'
import { AssetItem } from '@/components/Asset'
import CloseSvg from '@/icons/close.svg'
import SearchSvg from '@/icons/icon_search.svg'
import useTheme from '@/shared/hooks/useTheme'

const { SubMenu } = Menu

export interface Props<FT = any> {
  projects: IProject[]
  filter: any
  toogleFilter: FT
}

const ActivityFilter: React.FunctionComponent<Props> = ({ projects, filter, toogleFilter }) => {
  const theme = useTheme()

  return (
    <>
      <div className="container">
        <div className="title">DAPP Set</div>
        <div className="search">
          <Input
            prefix={<SearchSvg />}
            placeholder="Search"
            suffix={
              filter.id && (
                <CloseSvg
                  style={{ cursor: 'pointer' }}
                  onClick={() => toogleFilter({ ...filter, id: undefined, name: undefined })}
                />
              )
            }
            value={filter.name}
          />
        </div>
        <div className="list">
          {filter.id ? null : (
            // <Menu mode="inline">
            //   <SubMenu key="sub1" title="A selection-type">
            //     <div className="menu-child">
            //       <Checkbox.Group>
            //         <Row>
            //           <Checkbox value="A">A</Checkbox>
            //         </Row>
            //         <Row>
            //           <Checkbox value="B">B</Checkbox>
            //         </Row>
            //         <Row>
            //           <Checkbox value="C">C</Checkbox>
            //         </Row>
            //         <Row>
            //           <Checkbox value="D">D</Checkbox>
            //         </Row>
            //         <Row>
            //           <Checkbox value="E">E</Checkbox>
            //         </Row>
            //       </Checkbox.Group>
            //     </div>
            //   </SubMenu>
            //   <SubMenu key="sub2" title="B rating-progress">
            //     <div className="menu-child">
            //       <Slider range step={1} defaultValue={[20, 50]} />
            //       <div className="range">
            //         <div>
            //           <label>Minimum</label>
            //           <br />
            //           189,219,287
            //         </div>
            //         <span>-</span>
            //         <div>
            //           <label>Maximum</label>
            //           <br />
            //           189,219,287
            //         </div>
            //       </div>
            //     </div>
            //   </SubMenu>
            // </Menu>
            <PerfectScrollbar style={{ height: '100%' }}>
              {projects.map((project, index) => (
                <Link
                  as={{ pathname: '/market', query: { id: project.id, name: project.name } }}
                  href="/market"
                  key={index}>
                  <a
                    onClick={(e) => {
                      e.preventDefault()
                      toogleFilter({ ...filter, id: project.id, name: project.name })
                    }}>
                    <AssetItem icon={project.logoUrl} title={project.name} extra={project.num} />
                  </a>
                </Link>
              ))}
            </PerfectScrollbar>
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 240px;
          height: 605px;
          border: 1px solid ${theme['@border-color-base']};

          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #f2f3f3;

          overflow: hidden;
        }

        .title {
          display: flex;
          align-items: center;
          height: 55px;
          padding: 0 15px;
          background-color: ${theme['@primary-color']};

          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }

        .search {
          height: 50px;
          padding: 15px 15px 0 15px;
        }
        .search :global(.ant-input-affix-wrapper) {
          height: 35px;
          border-left: none;
          border-right: none;
          border-top: none;
          border-radius: 0;
          box-shadow: none;
        }

        .list {
          height: 500px;
        }

        .list :global(.ant-menu-submenu-title) {
          padding-left: 16px !important;
        }

        .menu-child {
          padding: 15px 20px;
          background-color: ${theme['@body-background']};
        }

        a {
          color: ${theme['@text-color']};
        }

        .range {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .range > span {
          margin: 0 5px;
        }
        .range > div {
          padding: 6px;
          border-radius: 4px;
          background-color: #fff;
          color: ${theme['@text-color-tertiary']};
          font-size: 12px;
          line-height: 12px;
        }
        .range > div label {
          color: ${theme['@disabled-color']};
        }
      `}</style>
    </>
  )
}

export default ActivityFilter

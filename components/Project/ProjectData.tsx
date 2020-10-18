import React from 'react'

import { IProject } from '@/api/types'
import useTheme from '@/shared/hooks/useTheme'
import { useApp } from '@/shared/providers/AppProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'

const ProjectData: React.FunctionComponent<{ project?: IProject }> = ({ project }) => {
  const theme = useTheme()
  const { web3 } = useApp()
  const { t } = useLanguage()

  if (!project) {
    return null
  }

  return (
    <>
      <div className="content">
        <div className="item">
          {t('project.projectData.holder')}
          <span>{project.owners}</span>
        </div>
        <div className="item">
          {t('project.projectData.avgPrice')}
          <span>{web3.utils.fromWei(project.avgPrice ?? '0')}ETH</span>
        </div>
        <div className="item">
          {t('project.projectData.turnover')}
          <span>{web3.utils.fromWei(project.total ?? '0')}ETH</span>
        </div>
      </div>
      <style jsx>{`
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 48px;
          border-bottom: 1px solid ${theme['@border-color-base']};
        }
        .item > span {
          color: ${theme['@text-color-tertiary']};
        }
      `}</style>
    </>
  )
}

export default ProjectData

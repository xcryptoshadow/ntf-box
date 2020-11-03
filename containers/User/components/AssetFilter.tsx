import React from 'react'

import { ProjectFilter } from '@/components/Asset'
import ProjectData from '@/components/Project/ProjectData'
import { useAsset } from '@/shared/providers/AssetProvider'
import { useProject } from '@/shared/providers/ProjectProvider'

const Filter: React.FunctionComponent = () => {
  const { projects, project } = useProject()
  const { filter, toogleFilter } = useAsset()

  return (
    <>
      <ProjectFilter
        projects={projects}
        project={project}
        showHead={false}
        onSelectProject={(project) => {
          if (project) {
            toogleFilter({ ...filter, id: project.id, name: project.name })
          } else {
            toogleFilter({ ...filter, id: undefined, name: undefined })
          }
        }}
        renderDetail={() => (
          <>
            <div className="content">
              <ProjectData project={project} />
            </div>
            <style jsx>{`
              .content {
                padding: 0 16px;
              }
            `}</style>
          </>
        )}
      />
    </>
  )
}

export default Filter

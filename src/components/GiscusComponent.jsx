import React from 'react'
import Giscus from '@giscus/react'
import { useColorMode } from '@docusaurus/theme-common'

export default function GiscusComponent() {
  const { colorMode } = useColorMode()

  return (
    <Giscus
      repo='WenYHsieh/Docusaurus-Blog'
      repoId='R_kgDOImk_QQ'
      category='General'
      categoryId='DIC_kwDOImk_Qc4CYb3G'
      mapping='pathname'
      term='Welcome to @giscus/react component!'
      strict='0'
      reactionsEnabled='1'
      emitMetadata='1'
      inputPosition='top'
      theme={colorMode}
      lang='en'
      loading='lazy'
      crossorigin='anonymous'
      async
    />
  )
}

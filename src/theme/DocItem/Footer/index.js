import React from 'react'
import Footer from '@theme-original/DocItem/Footer'
import GiscusComponent from '@site/src/components/GiscusComponent'
import { useDoc } from '@docusaurus/theme-common/internal'

export default function FooterWrapper(props) {
  const { frontMatter } = useDoc()
  const { enableComments } = frontMatter

  return (
    <>
      <Footer {...props} />
      {enableComments && <GiscusComponent />}
    </>
  )
}

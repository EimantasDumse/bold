import hljs from 'highlight.js'
import React from 'react'

import { Theme, useStyles } from '../../lib'
import demos from '../demos'

export interface DemoProps {
  src: string
}

export function Demo(props: DemoProps) {
  const { src } = props
  const { classes } = useStyles(createStyles)
  const { Component, source } = demos[`./${src}.demo.tsx`]

  if (!Component) {
    throw new Error(`Demo ${src} not found. You must specify the demo import location on file "demos.ts"`)
  }

  const Source = hljs.highlight('jsx', source).value

  return (
    <div className={classes.wrapper}>
      <div className={classes.component}>
        <Component />
      </div>
      <pre>
        <code className='hljs language-jsx' dangerouslySetInnerHTML={{ __html: Source }} />
      </pre>
    </div>
  )
}

const createStyles = (theme: Theme) => ({
  wrapper: {
    border: `1px solid ${theme.pallete.divider}`,
    borderRadius: 4,
    marginBottom: '2rem',

    pre: {
      margin: 0,
      code: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
    },
  },
  component: {
    padding: '1.5rem',
  },
})

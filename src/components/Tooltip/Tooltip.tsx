import Popper from 'popper.js'
import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useTransition } from '../../hooks/useTransition'
import { ExternalStyles, Theme, useStyles } from '../../styles'
import { randomStr } from '../../util/string'
import { Portal } from '../Portal'
import { RootRef } from '../RootRef'

import { TooltipPopper } from './TooltipPopper'

export interface TooltipProps extends Popper.PopperOptions {
  text: string
  style?: ExternalStyles
  offset?: number
  container?: Element
  transitionDelay?: number
  children: React.ReactElement<any>
}

export interface TooltipState {
  visible: boolean
}

export function Tooltip(props: TooltipProps) {
  const { text, offset, children, style: externalStyle, transitionDelay, container, ...rest } = props
  const child = React.Children.only(children)

  const { css, theme, classes } = useStyles(createStyles, props)
  const [visible, setVisible] = useState<boolean>(false)

  const rootRef = useRef<HTMLElement>()
  const popperRef = useRef<HTMLDivElement>()
  const popperInstance = useRef<Popper>()
  const tooltipId = useMemo(() => `tooltip-${randomStr()}`, [])
  const transitionState = useTransition(visible, { exitTimeout: transitionDelay })

  useEffect(() => {
    if (rootRef.current && popperRef.current) {
      popperInstance.current = new Popper(rootRef.current, popperRef.current, {
        modifiers: {
          arrow: { enabled: false },
          offset: { offset: `0, ${theme.typography.sizes.html * offset}` },
          preventOverflow: {
            boundariesElement: 'window',
          },
        },
        ...rest,
      })
    }

    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy()
      }
    }
  }, [rootRef.current, popperRef.current])

  useEffect(() => {
    if (!rootRef.current || !visible) {
      return
    }

    const handleWindowMouseOver = (e: MouseEvent) => {
      // This is implemented using mouseover since mouseleave does not trigger
      // for disabled elements due to browser/react bugs (https://github.com/facebook/react/issues/4251)
      const target = e.target as Node
      if (!rootRef.current.contains(target)) {
        setVisible(false)
      }
    }

    window.addEventListener('mouseover', handleWindowMouseOver)
    return () => window.removeEventListener('mouseover', handleWindowMouseOver)
  }, [rootRef.current, visible])

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setVisible(true)
    child.props.onMouseEnter && child.props.onMouseEnter(e)
  }, [])

  const handleFocus = useCallback(e => {
    setVisible(true)
    child.props.onFocus && child.props.onFocus(e)
  }, [])

  const handleBlur = useCallback(e => {
    setVisible(false)
    child.props.onBlur && child.props.onBlur(e)
  }, [])

  if (!text) {
    return child
  }

  return (
    <>
      <RootRef rootRef={rootRef}>
        {React.cloneElement(child, {
          title: !visible ? child.props.title || text : child.props.title,
          'aria-describedby': visible ? tooltipId : undefined,
          onMouseEnter: handleMouseEnter,
          onFocus: handleFocus,
          onBlur: handleBlur,
        })}
      </RootRef>

      {transitionState !== 'exited' && (
        <Portal container={container}>
          <div
            id={tooltipId}
            ref={popperRef}
            className={css(classes.popper, transitionState === 'entered' && classes.visible)}
            role='tooltip'
            aria-hidden={!visible ? 'true' : 'false'}
          >
            <TooltipPopper text={text} style={externalStyle} />
          </div>
        </Portal>
      )}
    </>
  )
}

Tooltip.defaultProps = {
  placement: 'top',
  offset: 0.25,
  transitionDelay: 200,
} as Partial<TooltipProps>

const createStyles = (theme: Theme, { transitionDelay }: TooltipProps) => ({
  popper: {
    zIndex: theme.zIndex.tooltip,
    transition: `opacity ${transitionDelay}ms ease`,
    opacity: 0,
  } as CSSProperties,
  visible: {
    opacity: 1,
  } as CSSProperties,
})

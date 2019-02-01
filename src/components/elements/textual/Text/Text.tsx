import { Interpolation } from 'emotion'
import * as React from 'react'

import { TextColor, useStyles } from '../../../../styles'
import { getTextColor } from '../../../../styles/theme/createTheme'

export type Weight = 'normal' | 'bold'
export type TextTag = 'span' | 'p' | 'div' | 'label'
export type FontStyle = 'normal' | 'italic'

export interface TextProps {
    color?: TextColor
    size?: number
    weight?: Weight
    tag?: TextTag
    fontStyle?: FontStyle
    style?: Interpolation
    children: React.ReactNode
}

export const Text = (props: TextProps) => {
    const { tag = 'span', color, size, weight, fontStyle, style } = props
    const { classes, css } = useStyles(theme => ({
        root: {
            color: color && getTextColor(theme, color),
            fontSize: size && size + 'rem',
            fontWeight: weight,
            fontStyle,
        },
    }))

    return React.createElement(tag, {
        className: css(classes.root, style),
    }, props.children)
}

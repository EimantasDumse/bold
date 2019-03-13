import { Interpolation } from 'emotion'
import React from 'react'

import { Styles, withStyles, WithStylesProps } from '../../../styles'

export interface FormErrorProps extends WithStylesProps {
    error: string
    style?: Interpolation
}

@withStyles
export class FormError extends React.Component<FormErrorProps, any> {

    render() {
        const { css, theme, style } = this.props
        const styles: Styles = {
            wrapper: {
                display: 'flex',
                alignItems: 'center',
                color: theme.pallete.status.danger.main,
            },
            icon: {
                marginLeft: '0.25rem',
            },
        }
        return (
            <div className={css(styles.wrapper, style)}>
                {this.props.error}
            </div>
        )
    }

}
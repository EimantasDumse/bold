import * as React from 'react'

import { withStyles, WithStylesProps } from '../../../../styles'
import { Omit } from '../../../../util/types'

import { createTableStyles } from './styles'

export interface TableProps extends WithStylesProps, Omit<React.TableHTMLAttributes<any>, 'css'> { }

@withStyles
export class Table extends React.PureComponent<TableProps> {
    render() {
        const { theme, css, ...rest } = this.props
        const styles = createTableStyles(theme)
        return <table className={css(styles.table)} {...rest} />
    }
}

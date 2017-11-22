import * as React from 'react'
import { WrappedFieldProps } from 'redux-form'
import { Checkbox, CheckboxProps } from '../../components/input/Checkbox'
import field, { FieldProps } from '../hoc/field'

export interface CheckboxFieldProps extends CheckboxProps, Partial<WrappedFieldProps<any>> {
}


class CheckboxFieldCmp extends React.Component<CheckboxFieldProps> {

    render() {
        return (
            <Checkbox {...this.props.input} label={this.props.label} disabled={this.props.disabled}>
                {this.props.children}
            </Checkbox>
        )
    }

}

// normalize resolve a issue: https://github.com/erikras/redux-form/issues/2922
export const CheckboxField: React.ComponentClass<FieldProps & CheckboxFieldProps> = field({ type: 'checkbox', hasWrapper: false, normalize: v => !!v })(CheckboxFieldCmp)

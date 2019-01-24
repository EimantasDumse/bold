import * as React from 'react'

import { withStyles, WithStylesProps } from '../../../../../styles'
import { HFlow } from '../../../../layout'
import { Checkbox } from '../../Checkbox/Checkbox'
import { TextInputProps } from '../../TextInput/TextInput'
import { SelectDownshiftRenderProps } from '../SelectSingle/SelectDownshift'
import { SelectDownshiftMenu, SelectDownshiftMenuProps } from '../SelectSingle/SelectDownshiftMenu'
import { DefaultItemType } from '../SelectSingle/SelectSingle'

import { MultiDownshift, MultiDownshiftProps } from './MultiDownshift'
import { SelectMultiInput } from './SelectMultiInput'

export interface SelectMultiProps<T = DefaultItemType> extends MultiDownshiftProps<T>, WithStylesProps {
    value?: T[]
    loading?: SelectDownshiftMenuProps<T>['loading']
    renderItem?: SelectDownshiftMenuProps<T>['renderItem']
    components?: SelectDownshiftMenuProps<T>['components']
    name?: TextInputProps['name']
    onBlur?: TextInputProps['onBlur']
    disabled?: TextInputProps['disabled']
    status?: TextInputProps['status']
    placeholder?: TextInputProps['placeholder']
    clearable?: TextInputProps['clearable']
    style?: TextInputProps['style']
}

@withStyles
export class SelectMulti<T> extends React.Component<SelectMultiProps<T>> {

    render() {
        const {
            css,
            theme,
            renderItem,
            loading,
            components,
            disabled,
            name,
            onBlur,
            status,
            clearable,
            style,
            value,
            placeholder,
            ...rest
        } = this.props

        return (
            <MultiDownshift<T>
                selectedItems={value || []}
                {...rest}
            >
                {(downshift) => {
                    const {
                        // isOpen,
                        getInputProps,
                        selectedItems,
                        itemToString,
                        removeItem,
                        inputValue,
                        visibleItems,
                    } = downshift

                    return (
                        <div>
                            <SelectMultiInput<T>
                                name={name}
                                items={selectedItems}
                                renderItem={itemToString}
                                onRemoveItem={this.handleItemRemove(removeItem)}
                                // icon={isOpen ? 'triangleUp' : 'triangleDown'}
                                disabled={disabled}
                                status={status}
                                placeholder={(!selectedItems || selectedItems.length === 0) ? placeholder : undefined}
                                // clearable={clearable}
                                onBlur={this.handleInputBlur(downshift)}
                                // onIconClick={this.handleInputIconClick(downshift)}
                                onFocus={this.handleInputFocus(downshift)}
                                onClick={this.handleInputClick(downshift)}
                                {...getInputProps()}
                                value={inputValue ? inputValue : ''}
                            />
                            <SelectDownshiftMenu
                                downshift={downshift}
                                items={visibleItems}
                                loading={loading}
                                renderItem={this.renderItem(selectedItems)}
                            />
                        </div>
                    )
                }}
            </MultiDownshift>
        )
    }

    handleItemRemove = (removeItem: Function) => (item: T) => removeItem(item)

    renderItem = (selectedItems: T[]) => (item: T) => (
        <HFlow hSpacing={0.5}>
            <Checkbox checked={selectedItems.includes(item)} tabIndex={-1} readOnly />
            {this.props.renderItem ? this.props.renderItem(item) : this.props.itemToString(item)}
        </HFlow>
    )

    handleInputIconClick = ({ toggleMenu }: SelectDownshiftRenderProps<T>) => () => toggleMenu()
    handleInputFocus = ({ openMenu }: SelectDownshiftRenderProps<T>) => () => openMenu()
    handleInputClick = ({ openMenu }: SelectDownshiftRenderProps<T>) => () => openMenu()
    handleInputBlur = ({ closeMenu }: SelectDownshiftRenderProps<T>) => (e: React.FocusEvent<HTMLInputElement>) => {
        closeMenu()
        this.props.onBlur && this.props.onBlur(e)
    }
}
import type { iconMap, inputTypesMap, sizeMap, variantMap } from './map'
import type {
    btnColorMap,
    btnStyleMap,
    btnSizeMap,
    btnBehaviorMap,
    btnModifierMap,
} from './componentsMaps/actions/btnMap'

export type IconName = keyof typeof iconMap
export type InputType = (typeof inputTypesMap)[number]
export type Size = keyof typeof sizeMap
export type Fill = 'none' | 'currentColor' | 'transparent'
export type Variant = (typeof variantMap)[number]
export type Placement = 'top' | 'right' | 'bottom' | 'left'
export type Direction = 'up' | 'down' | 'left' | 'right'
export type Alignment = 'center' | 'start' | 'end'
export type Justification = 'start' | 'center' | 'end'
export type FlexDirection
    = | 'row'
        | 'row-reverse'
        | 'colum'
        | 'column-reverse'
        | 'row-col'
        | 'row-col-reverse'
        | 'col-row'
        | 'col-row-reverse'
export type ThemeColor
    = | 'primary'
        | 'primary-content'
        | 'secondary'
        | 'secondary-content'
        | 'accent'
        | 'accent-content'
        | 'neutral'
        | 'neutral-content'
        | 'base-100'
        | 'base-200'
        | 'base-300'
        | 'base-content'
        | 'info'
        | 'info-content'
        | 'success'
        | 'success-content'
        | 'warning'
        | 'warning-content'
        | 'error'
        | 'error-content'
export type MaskType
    = | 'phone'
        | 'credit-card'
        | 'date'
        | 'time'
        | 'currency'
        | 'number'
        | 'email'
        | 'zip'
        | 'ssn'

// Button-specific types based on btnMap
export type BtnColor = keyof typeof btnColorMap
export type BtnStyle = keyof typeof btnStyleMap
export type BtnSize = keyof typeof btnSizeMap
export type BtnBehavior = keyof typeof btnBehaviorMap
export type BtnModifier = keyof typeof btnModifierMap

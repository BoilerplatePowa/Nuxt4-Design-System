import { iconMap } from './map'

// Re-export all types from types.d.ts
export type {
    InputType,
    Size,
    Fill,
    Variant,
    Placement,
    Direction,
    Alignment,
    Justification,
    FlexDirection,
    ThemeColor,
    MaskType,
    BtnColor,
    BtnStyle,
    BtnSize,
    BtnBehavior,
    BtnModifier,
} from './types.d'

export const iconNameKeys = Object.keys(iconMap) as Array<keyof typeof iconMap>

import {
    btnColorMap,
    btnStyleMap,
    btnSizeMap,
    btnBehaviorMap,
    btnModifierMap,
    btnBaseClass,
} from '../componentsMaps/actions/btnMap'

import {
    dropdownPartMap,
    dropdownPlacementMap,
    dropdownModifierMap,
    dropdownBaseClass,
} from '../componentsMaps/actions/dropdownMap'

import {
    modalPartMap,
    modalPlacementMap,
    modalModifierMap,
    modalBaseClass,
} from '../componentsMaps/actions/modalMap'

import {
    swapPartMap,
    swapStyleMap,
    swapModifierMap,
    swapBaseClass,
} from '../componentsMaps/actions/swapMap'

import {
    fabPartMap,
    fabModifierMap,
    fabBaseClass,
} from '../componentsMaps/actions/fabMap'

import {
    avatarModifierMap,
    avatarGroupBaseClass,
    avatarBaseClass,
} from '../componentsMaps/data-display/avatarMap'

import {
    badgeStyleMap,
    badgeColorMap,
    badgeSizeMap,
    badgeBaseClass,
} from '../componentsMaps/data-display/badgeMap'

import {
    cardPartMap,
    cardStyleMap,
    cardModifierMap,
    cardSizeMap,
    cardBaseClass,
} from '../componentsMaps/data-display/cardMap'

import {
    carouselPartMap,
    carouselModifierMap,
    carouselDirectionMap,
    carouselBaseClass,
} from '../componentsMaps/data-display/carouselMap'

import {
    chatPartMap,
    chatPlacementMap,
    chatBubbleColorMap,
    chatBaseClass,
} from '../componentsMaps/data-display/chatMap'

import {
    collapsePartMap,
    collapseModifierMap,
    collapseBaseClass,
} from '../componentsMaps/data-display/collapseMap'

import {
    inputStyleMap,
    inputColorMap,
    inputSizeMap,
    inputBaseClass,
} from '../componentsMaps/data-input/inputMap'

import {
    checkboxColorMap,
    checkboxSizeMap,
    checkboxBaseClass,
} from '../componentsMaps/data-input/checkboxMap'

import {
    selectStyleMap,
    selectColorMap,
    selectSizeMap,
    selectBaseClass,
} from '../componentsMaps/data-input/selectMap'

import {
    loadingStyleMap,
    loadingSizeMap,
    loadingBaseClass,
} from '../componentsMaps/feedback/loadingMap'

import {
    alertStyleMap,
    alertColorMap,
    alertDirectionMap,
    alertBaseClass,
} from '../componentsMaps/feedback/alertMap'

import {
    radioColorMap,
    radioSizeMap,
    radioBaseClass,
} from '../componentsMaps/data-input/radioMap'

import {
    rangeColorMap,
    rangeSizeMap,
    rangeBaseClass,
} from '../componentsMaps/data-input/rangeMap'

import {
    ratingModifierMap,
    ratingSizeMap,
    ratingBaseClass,
} from '../componentsMaps/data-input/ratingMap'

import {
    textareaStyleMap,
    textareaColorMap,
    textareaSizeMap,
    textareaBaseClass,
} from '../componentsMaps/data-input/textareaMap'

import {
    fileInputPartMap,
    fileInputVariantMap,
    fileInputSizeMap,
    fileInputBaseClass,
} from '../componentsMaps/data-input/fileInputMap'

import {
    progressColorMap,
    progressBaseClass,
} from '../componentsMaps/feedback/progressMap'

import {
    statPartMap,
    statsDirectionMap,
    statBaseClass,
    statsBaseClass,
} from '../componentsMaps/data-display/statsMap'

import {
    tableModifierMap,
    tableSizeMap,
    tableBaseClass,
} from '../componentsMaps/data-display/tableMap'

import {
    tooltipPartMap,
    tooltipPlacementMap,
    tooltipModifierMap,
    tooltipColorMap,
    tooltipBaseClass,
} from '../componentsMaps/feedback/tooltipMap'

import {
    toastPlacementHorizontalMap,
    toastPlacementVerticalMap,
    toastBaseClass,
} from '../componentsMaps/feedback/toastMap'

import {
    navbarPartMap,
    navbarBaseClass,
} from '../componentsMaps/navigation/navbarMap'

import {
    dockPartMap,
    dockModifierMap,
    dockSizeMap,
    dockBaseClass,
} from '../componentsMaps/navigation/dockMap'

import {
    linkStyleMap,
    linkColorMap,
    linkBaseClass,
} from '../componentsMaps/navigation/linkMap'

import {
    menuPartMap,
    menuModifierMap,
    menuSizeMap,
    menuDirectionMap,
    menuBaseClass,
} from '../componentsMaps/navigation/menuMap'

import {
    tabsPartMap,
    tabsStyleMap,
    tabsModifierMap,
    tabsPlacementMap,
    tabsSizeMap,
    tabsBaseClass,
} from '../componentsMaps/navigation/tabsMap'

import {
    stepsPartMap,
    stepsColorMap,
    stepsDirectionMap,
    stepsBaseClass,
} from '../componentsMaps/navigation/stepsMap'

import {
    dividerColorMap,
    dividerDirectionMap,
    dividerPlacementMap,
    dividerBaseClass,
} from '../componentsMaps/layout/dividerMap'

import {
    drawerPartMap,
    drawerPlacementMap,
    drawerModifierMap,
    drawerBaseClass,
} from '../componentsMaps/layout/drawerMap'

// Join-related imports removed as they are not currently used

import {
    footerPartMap,
    footerPlacementMap,
    footerDirectionMap,
    footerBaseClass,
} from '../componentsMaps/layout/footerMap'

import {
    heroPartMap,
    heroBaseClass,
} from '../componentsMaps/layout/heroMap'

import {
    indicatorPartMap,
    indicatorPlacementMap,
    indicatorBaseClass,
} from '../componentsMaps/layout/indicatorMap'

import {
    maskStyleMap,
    maskModifierMap,
    maskBaseClass,
} from '../componentsMaps/layout/maskMap'

import {
    fieldsetPartMap,
    labelBaseClass,
    fieldsetBaseClass,
} from '../componentsMaps/data-input/fieldsetMap'

import {
    filterPartMap,
    filterBaseClass,
} from '../componentsMaps/data-input/filterMap'

import {
    validatorPartMap,
    validatorBaseClass,
} from '../componentsMaps/data-input/validatorMap'

import {
    toggleColorMap,
    toggleSizeMap,
    toggleBaseClass,
} from '../componentsMaps/data-input/toggleMap'

import {
    timelinePartMap,
    timelineModifierMap,
    timelineDirectionMap,
    timelineBaseClass,
} from '../componentsMaps/data-display/timelineMap'

import {
    diffPartMap,
    diffBaseClass,
} from '../componentsMaps/data-display/diffMap'

import {
    kbdSizeMap,
    kbdBaseClass,
} from '../componentsMaps/data-display/kbdMap'

import {
    listRowBaseClass,
    listModifierMap,
    listBaseClass,
} from '../componentsMaps/data-display/listMap'

import {
    statusColorMap,
    statusSizeMap,
    statusBaseClass,
} from '../componentsMaps/data-display/statusMap'

/**
 * Generate button classes from props
 */
export function generateBtnClasses(props: {
    color?: keyof typeof btnColorMap
    style?: keyof typeof btnStyleMap
    size?: keyof typeof btnSizeMap
    behavior?: keyof typeof btnBehaviorMap
    modifiers?: Array<keyof typeof btnModifierMap>
}) {
    const classes: string[] = [btnBaseClass]

    if (props.color) {
        classes.push(btnColorMap[props.color])
    }

    if (props.style) {
        classes.push(btnStyleMap[props.style])
    }

    if (props.size) {
        classes.push(btnSizeMap[props.size])
    }

    if (props.behavior) {
        classes.push(btnBehaviorMap[props.behavior])
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(btnModifierMap[modifier])
        })
    }

    return classes.join(' ')
}

/**
 * Generate dropdown classes from props
 */
export function generateDropdownClasses(props: {
    parts?: Array<keyof typeof dropdownPartMap>
    placements?: Array<keyof typeof dropdownPlacementMap>
    modifiers?: Array<keyof typeof dropdownModifierMap>
}) {
    const classes: string[] = [dropdownBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(dropdownPartMap[part])
        })
    }

    if (props.placements) {
        props.placements.forEach((placement) => {
            classes.push(dropdownPlacementMap[placement])
        })
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(dropdownModifierMap[modifier])
        })
    }

    return classes.join(' ')
}

/**
 * Generate modal classes from props
 */
export function generateModalClasses(props: {
    parts?: Array<keyof typeof modalPartMap>
    placements?: Array<keyof typeof modalPlacementMap>
    modifiers?: Array<keyof typeof modalModifierMap>
}) {
    const classes: string[] = [modalBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(modalPartMap[part])
        })
    }

    if (props.placements) {
        props.placements.forEach((placement) => {
            classes.push(modalPlacementMap[placement])
        })
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(modalModifierMap[modifier])
        })
    }

    return classes.join(' ')
}

/**
 * Generate swap classes from props
 */
export function generateSwapClasses(props: {
    parts?: Array<keyof typeof swapPartMap>
    styles?: Array<keyof typeof swapStyleMap>
    modifiers?: Array<keyof typeof swapModifierMap>
}) {
    const classes: string[] = [swapBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(swapPartMap[part])
        })
    }

    if (props.styles) {
        props.styles.forEach((style) => {
            classes.push(swapStyleMap[style])
        })
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(swapModifierMap[modifier])
        })
    }

    return classes.join(' ')
}

/**
 * Generate FAB classes from props
 */
export function generateFabClasses(props: {
    parts?: Array<keyof typeof fabPartMap>
    modifiers?: Array<keyof typeof fabModifierMap>
}) {
    const classes: string[] = [fabBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(fabPartMap[part])
        })
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(fabModifierMap[modifier])
        })
    }

    return classes.join(' ')
}

/**
 * Generate avatar classes from props
 */
export function generateAvatarClasses(props: {
    modifiers?: Array<keyof typeof avatarModifierMap>
}) {
    const classes: string[] = [avatarBaseClass]

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(avatarModifierMap[modifier])
        })
    }

    return classes.join(' ')
}

/**
 * Generate avatar group classes from props
 */
export function generateAvatarGroupClasses(_props: Record<string, never>) {
    const classes: string[] = [avatarGroupBaseClass]
    return classes.join(' ')
}

/**
 * Generate badge classes from props
 */
export function generateBadgeClasses(props: {
    style?: keyof typeof badgeStyleMap
    color?: keyof typeof badgeColorMap
    size?: keyof typeof badgeSizeMap
}) {
    const classes: string[] = [badgeBaseClass]

    if (props.style) {
        classes.push(badgeStyleMap[props.style])
    }

    if (props.color) {
        classes.push(badgeColorMap[props.color])
    }

    if (props.size) {
        classes.push(badgeSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate card classes from props
 */
export function generateCardClasses(props: {
    parts?: Array<keyof typeof cardPartMap>
    styles?: Array<keyof typeof cardStyleMap>
    modifiers?: Array<keyof typeof cardModifierMap>
    size?: keyof typeof cardSizeMap
}) {
    const classes: string[] = [cardBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(cardPartMap[part])
        })
    }

    if (props.styles) {
        props.styles.forEach((style) => {
            classes.push(cardStyleMap[style])
        })
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(cardModifierMap[modifier])
        })
    }

    if (props.size) {
        classes.push(cardSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate carousel classes from props
 */
export function generateCarouselClasses(props: {
    parts?: Array<keyof typeof carouselPartMap>
    modifiers?: Array<keyof typeof carouselModifierMap>
    direction?: keyof typeof carouselDirectionMap
}) {
    const classes: string[] = [carouselBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(carouselPartMap[part])
        })
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(carouselModifierMap[modifier])
        })
    }

    if (props.direction) {
        classes.push(carouselDirectionMap[props.direction])
    }

    return classes.join(' ')
}

/**
 * Generate chat classes from props
 */
export function generateChatClasses(props: {
    parts?: Array<keyof typeof chatPartMap>
    placement?: keyof typeof chatPlacementMap
    bubbleColor?: keyof typeof chatBubbleColorMap
}) {
    const classes: string[] = [chatBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(chatPartMap[part])
        })
    }

    if (props.placement) {
        classes.push(chatPlacementMap[props.placement])
    }

    if (props.bubbleColor) {
        classes.push(chatBubbleColorMap[props.bubbleColor])
    }

    return classes.join(' ')
}

/**
 * Generate collapse classes from props
 */
export function generateCollapseClasses(props: {
    parts?: Array<keyof typeof collapsePartMap>
    modifiers?: Array<keyof typeof collapseModifierMap>
}) {
    const classes: string[] = [collapseBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(collapsePartMap[part])
        })
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(collapseModifierMap[modifier])
        })
    }

    return classes.join(' ')
}

/**
 * Generate input classes from props
 */
export function generateInputClasses(props: {
    style?: keyof typeof inputStyleMap
    color?: keyof typeof inputColorMap
    size?: keyof typeof inputSizeMap
}) {
    const classes: string[] = [inputBaseClass]

    if (props.style) {
        classes.push(inputStyleMap[props.style])
    }

    if (props.color) {
        classes.push(inputColorMap[props.color])
    }

    if (props.size) {
        classes.push(inputSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate checkbox classes from props
 */
export function generateCheckboxClasses(props: {
    color?: keyof typeof checkboxColorMap
    size?: keyof typeof checkboxSizeMap
}) {
    const classes: string[] = [checkboxBaseClass]

    if (props.color) {
        classes.push(checkboxColorMap[props.color])
    }

    if (props.size) {
        classes.push(checkboxSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate select classes from props
 */
export function generateSelectClasses(props: {
    style?: keyof typeof selectStyleMap
    color?: keyof typeof selectColorMap
    size?: keyof typeof selectSizeMap
}) {
    const classes: string[] = [selectBaseClass]

    if (props.style) {
        classes.push(selectStyleMap[props.style])
    }

    if (props.color) {
        classes.push(selectColorMap[props.color])
    }

    if (props.size) {
        classes.push(selectSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate loading classes from props
 */
export function generateLoadingClasses(props: {
    style?: keyof typeof loadingStyleMap
    size?: keyof typeof loadingSizeMap
}) {
    const classes: string[] = [loadingBaseClass]

    if (props.style) {
        classes.push(loadingStyleMap[props.style])
    }

    if (props.size) {
        classes.push(loadingSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate alert classes from props
 */
export function generateAlertClasses(props: {
    style?: keyof typeof alertStyleMap
    color?: keyof typeof alertColorMap
    direction?: keyof typeof alertDirectionMap
}) {
    const classes: string[] = [alertBaseClass]

    if (props.style) {
        classes.push(alertStyleMap[props.style])
    }

    if (props.color) {
        classes.push(alertColorMap[props.color])
    }

    if (props.direction) {
        classes.push(alertDirectionMap[props.direction])
    }

    return classes.join(' ')
}

/**
 * Generate radio classes from props
 */
export function generateRadioClasses(props: {
    color?: keyof typeof radioColorMap
    size?: keyof typeof radioSizeMap
}) {
    const classes: string[] = [radioBaseClass]

    if (props.color) {
        classes.push(radioColorMap[props.color])
    }

    if (props.size) {
        classes.push(radioSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate range classes from props
 */
export function generateRangeClasses(props: {
    color?: keyof typeof rangeColorMap
    size?: keyof typeof rangeSizeMap
}) {
    const classes: string[] = [rangeBaseClass]

    if (props.color) {
        classes.push(rangeColorMap[props.color])
    }

    if (props.size) {
        classes.push(rangeSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate rating classes from props
 */
export function generateRatingClasses(props: {
    modifiers?: Array<keyof typeof ratingModifierMap>
    size?: keyof typeof ratingSizeMap
}) {
    const classes: string[] = [ratingBaseClass]

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(ratingModifierMap[modifier])
        })
    }

    if (props.size) {
        classes.push(ratingSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate textarea classes from props
 */
export function generateTextareaClasses(props: {
    style?: keyof typeof textareaStyleMap
    color?: keyof typeof textareaColorMap
    size?: keyof typeof textareaSizeMap
}) {
    const classes: string[] = [textareaBaseClass]

    if (props.style) {
        classes.push(textareaStyleMap[props.style])
    }

    if (props.color) {
        classes.push(textareaColorMap[props.color])
    }

    if (props.size) {
        classes.push(textareaSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate file input classes from props
 */
export function generateFileInputClasses(props: {
    parts?: Array<keyof typeof fileInputPartMap>
    variant?: keyof typeof fileInputVariantMap
    size?: keyof typeof fileInputSizeMap
}) {
    const classes: string[] = [fileInputBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(fileInputPartMap[part])
        })
    }

    if (props.variant) {
        classes.push(fileInputVariantMap[props.variant])
    }

    if (props.size) {
        classes.push(fileInputSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate progress classes from props
 */
export function generateProgressClasses(props: {
    color?: keyof typeof progressColorMap
}) {
    const classes: string[] = [progressBaseClass]

    if (props.color) {
        classes.push(progressColorMap[props.color])
    }

    return classes.join(' ')
}

/**
 * Generate stat classes from props
 */
export function generateStatClasses(props: {
    parts?: Array<keyof typeof statPartMap>
}) {
    const classes: string[] = [statBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(statPartMap[part])
        })
    }

    return classes.join(' ')
}

/**
 * Generate stats classes from props
 */
export function generateStatsClasses(props: {
    direction?: keyof typeof statsDirectionMap
}) {
    const classes: string[] = [statsBaseClass]

    if (props.direction) {
        classes.push(statsDirectionMap[props.direction])
    }

    return classes.join(' ')
}

/**
 * Generate status classes from props
 */
export function generateStatusClasses(props: {
    color?: keyof typeof statusColorMap
    size?: keyof typeof statusSizeMap
}) {
    const classes: string[] = [statusBaseClass]

    if (props.color) {
        classes.push(statusColorMap[props.color])
    }

    if (props.size) {
        classes.push(statusSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate table classes from props
 */
export function generateTableClasses(props: {
    modifiers?: Array<keyof typeof tableModifierMap>
    size?: keyof typeof tableSizeMap
}) {
    const classes: string[] = [tableBaseClass]

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(tableModifierMap[modifier])
        })
    }

    if (props.size) {
        classes.push(tableSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate tooltip classes from props
 */
export function generateTooltipClasses(props: {
    parts?: Array<keyof typeof tooltipPartMap>
    placement?: keyof typeof tooltipPlacementMap
    modifiers?: Array<keyof typeof tooltipModifierMap>
    color?: keyof typeof tooltipColorMap
}) {
    const classes: string[] = [tooltipBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(tooltipPartMap[part])
        })
    }

    if (props.placement) {
        classes.push(tooltipPlacementMap[props.placement])
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(tooltipModifierMap[modifier])
        })
    }

    if (props.color) {
        classes.push(tooltipColorMap[props.color])
    }

    return classes.join(' ')
}

/**
 * Generate toast classes from props
 */
export function generateToastClasses(props: {
    horizontalPlacement?: keyof typeof toastPlacementHorizontalMap
    verticalPlacement?: keyof typeof toastPlacementVerticalMap
}) {
    const classes: string[] = [toastBaseClass]

    if (props.horizontalPlacement) {
        classes.push(toastPlacementHorizontalMap[props.horizontalPlacement])
    }

    if (props.verticalPlacement) {
        classes.push(toastPlacementVerticalMap[props.verticalPlacement])
    }

    return classes.join(' ')
}

/**
 * Generate navbar classes from props
 */
export function generateNavbarClasses(props: {
    parts?: Array<keyof typeof navbarPartMap>
}) {
    const classes: string[] = [navbarBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(navbarPartMap[part])
        })
    }

    return classes.join(' ')
}

/**
 * Generate dock classes from props
 */
export function generateDockClasses(props: {
    parts?: Array<keyof typeof dockPartMap>
    modifiers?: Array<keyof typeof dockModifierMap>
    size?: keyof typeof dockSizeMap
}) {
    const classes: string[] = [dockBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(dockPartMap[part])
        })
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(dockModifierMap[modifier])
        })
    }

    if (props.size) {
        classes.push(dockSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate link classes from props
 */
export function generateLinkClasses(props: {
    style?: keyof typeof linkStyleMap
    color?: keyof typeof linkColorMap
}) {
    const classes: string[] = [linkBaseClass]

    if (props.style) {
        classes.push(linkStyleMap[props.style])
    }

    if (props.color) {
        classes.push(linkColorMap[props.color])
    }

    return classes.join(' ')
}

/**
 * Generate menu classes from props
 */
export function generateMenuClasses(props: {
    parts?: Array<keyof typeof menuPartMap>
    modifiers?: Array<keyof typeof menuModifierMap>
    size?: keyof typeof menuSizeMap
    direction?: keyof typeof menuDirectionMap
}) {
    const classes: string[] = [menuBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(menuPartMap[part])
        })
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(menuModifierMap[modifier])
        })
    }

    if (props.size) {
        classes.push(menuSizeMap[props.size])
    }

    if (props.direction) {
        classes.push(menuDirectionMap[props.direction])
    }

    return classes.join(' ')
}

/**
 * Generate tabs classes from props
 */
export function generateTabsClasses(props: {
    parts?: Array<keyof typeof tabsPartMap>
    style?: keyof typeof tabsStyleMap
    modifiers?: Array<keyof typeof tabsModifierMap>
    placement?: keyof typeof tabsPlacementMap
    size?: keyof typeof tabsSizeMap
}) {
    const classes: string[] = [tabsBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(tabsPartMap[part])
        })
    }

    if (props.style) {
        classes.push(tabsStyleMap[props.style])
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(tabsModifierMap[modifier])
        })
    }

    if (props.placement) {
        classes.push(tabsPlacementMap[props.placement])
    }

    if (props.size) {
        classes.push(tabsSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate steps classes from props
 */
export function generateStepsClasses(props: {
    parts?: Array<keyof typeof stepsPartMap>
    color?: keyof typeof stepsColorMap
    direction?: keyof typeof stepsDirectionMap
}) {
    const classes: string[] = [stepsBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(stepsPartMap[part])
        })
    }

    if (props.color) {
        classes.push(stepsColorMap[props.color])
    }

    if (props.direction) {
        classes.push(stepsDirectionMap[props.direction])
    }

    return classes.join(' ')
}

/**
 * Generate divider classes from props
 */
export function generateDividerClasses(props: {
    color?: keyof typeof dividerColorMap
    direction?: keyof typeof dividerDirectionMap
    placement?: keyof typeof dividerPlacementMap
}) {
    const classes: string[] = [dividerBaseClass]

    if (props.color) {
        classes.push(dividerColorMap[props.color])
    }

    if (props.direction) {
        classes.push(dividerDirectionMap[props.direction])
    }

    if (props.placement) {
        classes.push(dividerPlacementMap[props.placement])
    }

    return classes.join(' ')
}

/**
 * Generate drawer classes from props
 */
export function generateDrawerClasses(props: {
    parts?: Array<keyof typeof drawerPartMap>
    placement?: keyof typeof drawerPlacementMap
    modifiers?: Array<keyof typeof drawerModifierMap>
}) {
    const classes: string[] = [drawerBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(drawerPartMap[part])
        })
    }

    if (props.placement) {
        classes.push(drawerPlacementMap[props.placement])
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(drawerModifierMap[modifier])
        })
    }

    return classes.join(' ')
}

/**
 * Generate footer classes from props
 */
export function generateFooterClasses(props: {
    parts?: Array<keyof typeof footerPartMap>
    placement?: keyof typeof footerPlacementMap
    direction?: keyof typeof footerDirectionMap
}) {
    const classes: string[] = [footerBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(footerPartMap[part])
        })
    }

    if (props.placement) {
        classes.push(footerPlacementMap[props.placement])
    }

    if (props.direction) {
        classes.push(footerDirectionMap[props.direction])
    }

    return classes.join(' ')
}

/**
 * Generate hero classes from props
 */
export function generateHeroClasses(props: {
    parts?: Array<keyof typeof heroPartMap>
}) {
    const classes: string[] = [heroBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(heroPartMap[part])
        })
    }

    return classes.join(' ')
}

/**
 * Generate indicator classes from props
 */
export function generateIndicatorClasses(props: {
    parts?: Array<keyof typeof indicatorPartMap>
    placement?: keyof typeof indicatorPlacementMap
}) {
    const classes: string[] = [indicatorBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(indicatorPartMap[part])
        })
    }

    if (props.placement) {
        classes.push(indicatorPlacementMap[props.placement])
    }

    return classes.join(' ')
}

/**
 * Generate mask classes from props
 */
export function generateMaskClasses(props: {
    style?: keyof typeof maskStyleMap
    modifiers?: Array<keyof typeof maskModifierMap>
}) {
    const classes: string[] = [maskBaseClass]

    if (props.style) {
        classes.push(maskStyleMap[props.style])
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(maskModifierMap[modifier])
        })
    }

    return classes.join(' ')
}

/**
 * Generate fieldset classes from props
 */
export function generateFieldsetClasses(props: {
    parts?: Array<keyof typeof fieldsetPartMap>
}) {
    const classes: string[] = [fieldsetBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(fieldsetPartMap[part])
        })
    }

    return classes.join(' ')
}

/**
 * Generate label classes from props
 */
export function generateLabelClasses(_props: Record<string, never>) {
    const classes: string[] = [labelBaseClass]
    return classes.join(' ')
}

/**
 * Generate filter classes from props
 */
export function generateFilterClasses(props: {
    parts?: Array<keyof typeof filterPartMap>
}) {
    const classes: string[] = [filterBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(filterPartMap[part])
        })
    }

    return classes.join(' ')
}

/**
 * Generate validator classes from props
 */
export function generateValidatorClasses(props: {
    parts?: Array<keyof typeof validatorPartMap>
}) {
    const classes: string[] = [validatorBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(validatorPartMap[part])
        })
    }

    return classes.join(' ')
}

/**
 * Generate toggle classes from props
 */
export function generateToggleClasses(props: {
    color?: keyof typeof toggleColorMap
    size?: keyof typeof toggleSizeMap
}) {
    const classes: string[] = [toggleBaseClass]

    if (props.color) {
        classes.push(toggleColorMap[props.color])
    }

    if (props.size) {
        classes.push(toggleSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate timeline classes from props
 */
export function generateTimelineClasses(props: {
    parts?: Array<keyof typeof timelinePartMap>
    modifiers?: Array<keyof typeof timelineModifierMap>
    direction?: keyof typeof timelineDirectionMap
}) {
    const classes: string[] = [timelineBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(timelinePartMap[part])
        })
    }

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(timelineModifierMap[modifier])
        })
    }

    if (props.direction) {
        classes.push(timelineDirectionMap[props.direction])
    }

    return classes.join(' ')
}

/**
 * Generate diff classes from props
 */
export function generateDiffClasses(props: {
    parts?: Array<keyof typeof diffPartMap>
}) {
    const classes: string[] = [diffBaseClass]

    if (props.parts) {
        props.parts.forEach((part) => {
            classes.push(diffPartMap[part])
        })
    }

    return classes.join(' ')
}

/**
 * Generate kbd classes from props
 */
export function generateKbdClasses(props: {
    size?: keyof typeof kbdSizeMap
}) {
    const classes: string[] = [kbdBaseClass]

    if (props.size) {
        classes.push(kbdSizeMap[props.size])
    }

    return classes.join(' ')
}

/**
 * Generate list classes from props
 */
export function generateListClasses(props: {
    modifiers?: Array<keyof typeof listModifierMap>
}) {
    const classes: string[] = [listBaseClass]

    if (props.modifiers) {
        props.modifiers.forEach((modifier) => {
            classes.push(listModifierMap[modifier])
        })
    }

    return classes.join(' ')
}

/**
 * Generate list row classes from props
 */
export function generateListRowClasses(_props: Record<string, never>) {
    const classes: string[] = [listRowBaseClass]
    return classes.join(' ')
}

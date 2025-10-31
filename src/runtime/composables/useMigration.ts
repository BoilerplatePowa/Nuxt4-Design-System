import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Migration Store
 *
 * Manages the state of data migration including linked pairs,
 * confidence scores, and migration progress.
 *
 * @example
 * ```ts
 * const migrationStore = useMigrationStore()
 * migrationStore.addLink('old-1', 'new-1', 0.95)
 * ```
 */

export interface LinkedPair {
    oldId: string | number
    newId: string | number
    confidence?: number
    createdAt?: string
}

export interface MigrationState {
    linkedPairs: LinkedPair[]
    history: LinkedPair[][]
    currentHistoryIndex: number
}

export const useMigrationStore = defineStore('data-migration', () => {
    // State
    const linkedPairs = ref<LinkedPair[]>([])
    const history = ref<LinkedPair[][]>([])
    const currentHistoryIndex = ref(-1)

    // Getters
    const totalLinks = computed(() => linkedPairs.value.length)

    const averageConfidence = computed(() => {
        if (linkedPairs.value.length === 0) return 0

        const sum = linkedPairs.value.reduce((acc, pair) => acc + (pair.confidence ?? 0), 0)
        return sum / linkedPairs.value.length
    })

    const highConfidenceLinks = computed(() =>
        linkedPairs.value.filter((pair) => (pair.confidence ?? 0) >= 0.8)
    )

    const lowConfidenceLinks = computed(() =>
        linkedPairs.value.filter((pair) => (pair.confidence ?? 0) < 0.6)
    )

    const canUndo = computed(() => currentHistoryIndex.value > 0)

    const canRedo = computed(() => currentHistoryIndex.value < history.value.length - 1)

    // Actions
    /**
     * Initialize the migration store
     */
    function initialize() {
        linkedPairs.value = []
        history.value = [[]]
        currentHistoryIndex.value = 0
    }

    /**
     * Add a link between old and new data items
     */
    function addLink(oldId: string | number, newId: string | number, confidence?: number) {
        // Check if link already exists
        const existingIndex = linkedPairs.value.findIndex(
            (pair) => pair.oldId === oldId && pair.newId === newId
        )

        if (existingIndex !== -1) {
            // Update existing link
            linkedPairs.value[existingIndex] = {
                ...linkedPairs.value[existingIndex],
                confidence,
                createdAt: new Date().toISOString(),
            }
        } else {
            // Add new link
            linkedPairs.value.push({
                oldId,
                newId,
                confidence,
                createdAt: new Date().toISOString(),
            })
        }

        // Save to history
        saveToHistory()
    }

    /**
     * Remove a link between old and new data items
     */
    function removeLink(oldId: string | number, newId: string | number) {
        const index = linkedPairs.value.findIndex(
            (pair) => pair.oldId === oldId && pair.newId === newId
        )

        if (index !== -1) {
            linkedPairs.value.splice(index, 1)
            saveToHistory()
        }
    }

    /**
     * Clear all links
     */
    function clearLinks() {
        linkedPairs.value = []
        saveToHistory()
    }

    /**
     * Get link by old ID
     */
    function getLinkByOldId(oldId: string | number): LinkedPair | undefined {
        return linkedPairs.value.find((pair) => pair.oldId === oldId)
    }

    /**
     * Get link by new ID
     */
    function getLinkByNewId(newId: string | number): LinkedPair | undefined {
        return linkedPairs.value.find((pair) => pair.newId === newId)
    }

    /**
     * Check if old item is linked
     */
    function isOldItemLinked(oldId: string | number): boolean {
        return linkedPairs.value.some((pair) => pair.oldId === oldId)
    }

    /**
     * Check if new item is linked
     */
    function isNewItemLinked(newId: string | number): boolean {
        return linkedPairs.value.some((pair) => pair.newId === newId)
    }

    /**
     * Batch add multiple links
     */
    function addLinks(pairs: LinkedPair[]) {
        pairs.forEach((pair) => {
            addLink(pair.oldId, pair.newId, pair.confidence)
        })
    }

    /**
     * Update link confidence
     */
    function updateConfidence(oldId: string | number, newId: string | number, confidence: number) {
        const pair = linkedPairs.value.find((p) => p.oldId === oldId && p.newId === newId)

        if (pair) {
            pair.confidence = confidence
            saveToHistory()
        }
    }

    /**
     * Save current state to history
     */
    function saveToHistory() {
        // Remove any future history if we're not at the end
        if (currentHistoryIndex.value < history.value.length - 1) {
            history.value = history.value.slice(0, currentHistoryIndex.value + 1)
        }

        // Add current state to history
        history.value.push([...linkedPairs.value])
        currentHistoryIndex.value = history.value.length - 1

        // Limit history to 50 states
        if (history.value.length > 50) {
            history.value.shift()
            currentHistoryIndex.value--
        }
    }

    /**
     * Undo last action
     */
    function undo() {
        if (canUndo.value) {
            currentHistoryIndex.value--
            linkedPairs.value = [...history.value[currentHistoryIndex.value]]
        }
    }

    /**
     * Redo last undone action
     */
    function redo() {
        if (canRedo.value) {
            currentHistoryIndex.value++
            linkedPairs.value = [...history.value[currentHistoryIndex.value]]
        }
    }

    /**
     * Export links as JSON
     */
    function exportLinks(): string {
        return JSON.stringify(linkedPairs.value, null, 2)
    }

    /**
     * Import links from JSON
     */
    function importLinks(json: string) {
        try {
            const imported = JSON.parse(json) as LinkedPair[]
            linkedPairs.value = imported
            saveToHistory()
        } catch (error) {
            console.error('[Migration Store] Failed to import links:', error)
        }
    }

    /**
     * Get migration statistics
     */
    function getStatistics() {
        return {
            totalLinks: totalLinks.value,
            averageConfidence: averageConfidence.value,
            highConfidenceCount: highConfidenceLinks.value.length,
            lowConfidenceCount: lowConfidenceLinks.value.length,
            canUndo: canUndo.value,
            canRedo: canRedo.value,
        }
    }

    return {
        // State
        linkedPairs,
        history,
        currentHistoryIndex,

        // Getters
        totalLinks,
        averageConfidence,
        highConfidenceLinks,
        lowConfidenceLinks,
        canUndo,
        canRedo,

        // Actions
        initialize,
        addLink,
        removeLink,
        clearLinks,
        getLinkByOldId,
        getLinkByNewId,
        isOldItemLinked,
        isNewItemLinked,
        addLinks,
        updateConfidence,
        undo,
        redo,
        exportLinks,
        importLinks,
        getStatistics,
    }
})

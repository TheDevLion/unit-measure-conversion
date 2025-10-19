import {describe, it, expect} from 'vitest'
import { microOperation, OPERATION_ENUM } from './micro_operations'


describe('Group of tests for "helpers/micro_operations"', () => {
    it('should add numbers correctly', () => {
        const n1 = 12.57
        const n2 = 23.43
        const result1 = microOperation(n1, n2, OPERATION_ENUM.PLUS)

        expect(result1).toBe(36)

        const n3 = 0.1
        const n4 = 0.2
        const result2 = microOperation(n3, n4, OPERATION_ENUM.PLUS)

        expect(result2).toBe(0.3)
    })
})
import {describe, it, expect} from 'vitest'
import { microOperation, OPERATION_ENUM } from './micro_operations'


describe('Group of tests for "helpers/micro_operations"', () => {
    it('should add numbers correctly', () => {
        const n1 = 12.57
        const n2 = 23.43
        const result1 = microOperation(n1, n2, OPERATION_ENUM.PLUS)

        expect(result1).toBe(36)

    })
})
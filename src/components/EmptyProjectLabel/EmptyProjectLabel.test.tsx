import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { EmptyProjectLabel } from '.'

describe('Test EmptyProjectLabel component', () => {
    it('render component text properly', () => {
        render(<EmptyProjectLabel />)
        expect(screen.getByText('Empty Project')).toBeInTheDocument()
    })
})
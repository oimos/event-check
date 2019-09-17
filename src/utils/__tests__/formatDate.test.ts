
import { describe, it } from 'mocha'
import { assert } from 'chai'
import { formatDate } from '../formatDate'

describe('月が一桁、日が一桁', () => {
    it('4月1日', () => {
        assert.equal(formatDate('4月1日'), '0401')
    })
})

describe('月が一桁、日が二桁', () => {
    it('4月12日', () => {
        assert.equal(formatDate('4月12日'), '0412')
    })
})

describe('月が二桁、日が一桁', () => {
    it('12月4日', () => {
        assert.equal(formatDate('12月4日'), '1204')
    })
})

describe('月が二桁、日が二桁', () => {
    it('12月12日', () => {
        assert.equal(formatDate('12月12日'), '1212')
    })
})
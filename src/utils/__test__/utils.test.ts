import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { describe, it, expect } from 'vitest'
import { isAxiosUnprocessableEntityError } from '../utils'

// Describe dùng để mô tả tập hợp các ngữ cảnh
// hoặc là 1 đơn vị cần test, ví dụ : Func, Component

describe('Test function isAxiosError', () => {
  // It dùng để ghi chú trường hợp cần test
  it('isAxiosError trả về boolean, phân biệt được Axios Error', () => {
    // Expect là mong muốn, toBe là giá trị trả về
    expect(isAxiosError(new Error())).toBe(false)

    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('Test function isAxiosUnprocessableError', () => {
  // It dùng để ghi chú trường hợp cần test
  it('isAxiosUnprocessableError phân biệt được UnprocessableError', () => {
    // Expect là mong muốn, toBe là giá trị trả về
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)

    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})

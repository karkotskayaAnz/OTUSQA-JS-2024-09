import { nameIsValid, fullTrim, getTotal } from '../src/app'

describe('nameIsValid function', () => {
    it('should return the correct response for not string', () => {
      const result = nameIsValid(12)
      expect(result).toBe(false)
    })
  
    it('should return the correct response for less than 2', () => {
      const result = nameIsValid(1)
      expect(result).toBe(false)
    })
  
    it('should return the correct response not letters', () => {
      const result = nameIsValid('12')
      expect(result).toBe(false)
    })
  
    it('should return the correct response valid name', () => {
        const result = nameIsValid('validname')
        expect(result).toBe(true)
    })
  })

  describe('fullTrim function', () => {
    it('should return null when sending empty value', () => {
      const result = fullTrim('')
      expect(result).toEqual('')
    })

    it('should return the same when sending a value without commas', () => {
      const result = fullTrim('ТекстТекстТекст')
      expect(result).toEqual('ТекстТекстТекст')
    })
  
    it('should return the correct value without commas', () => {
      const result = fullTrim(' Текст Текст Текст ')
      expect(result).toEqual('ТекстТекстТекст')
    })
  })

  describe('getTotal function', () => {

    const invalidCases = [
        {
            name: 'negative discount',
            items: [
              { quantity: 1, name: 'мороженное одно',  price: 10 },
              { quantity: 1, name: 'мороженное второе',  price: 10 }
            ],
            discount: -1,
            error: 'Процент скидки должен быть от 0 до 99'
        },

        {
            name: 'discount 100%',
            items: [
                { quantity: 1, name: 'мороженное одно',  price: 10 },
                { quantity: 1, name: 'мороженное второе',  price: 10 }
            ],
            discount: 100,
            error: 'Процент скидки должен быть от 0 до 99'
        },

        {
            name: 'discount not number',
            items: [
                { quantity: 1, name: 'мороженное одно',  price: 10 },
                { quantity: 1, name: 'мороженное второе',  price: 10 }
            ],
            discount: "СКИДОЧКА 50%",
            error: 'Скидка должна быть числом'
        }

        ]
      
        test.each(invalidCases)('%s', ({ items, discount, error }) => {
          expect(() => getTotal(items, discount)).toThrow(error)
        })

     const validCases = [
            {
              name: 'example 1',
              items: [
                { quantity: 10, name: 'мороженное одно',  price: 10 }
              ],
              discount: 0,
              expected: 100 
            }
            ,

            {
              name: 'example 2',
              items: [
                { quantity: 1, name: 'мороженное одно',  price: 10 }
              ],
              discount: 0,
              expected: 10 
            },

            {
                name: 'example 3',
                items: [
                  { quantity: 1, name: 'мороженное одно',  price: 10 },
                  { quantity: 9, name: 'мороженное второе',  price: 10 }
                ],
                discount: 0,
                expected: 100 
            },

            {
                name: 'example 4',
                items: [
                  { quantity: 0, name: 'мороженное одно',  price: 10 },
                  { quantity: 9, name: 'мороженное второе',  price: 10 }
                ],
                discount: 0,
                expected: 90 
            },

            {
                name: 'example 5',
                items: [
                  { quantity: 10, name: 'мороженное одно',  price: 10 }
                ],
                discount: 10,
                expected: 90 
            },

            {
                name: 'example 6',
                items: [
                    { quantity: 1, name: 'мороженное одно',  price: 10 },
                    { quantity: 9, name: 'мороженное второе',  price: 10 }
                ],
                discount: 50,
                expected: 50
            }
          ]
        
          test.each(validCases)('%s', ({items, discount, expected}) => {
            const result = getTotal(items, discount)
            expect(result).toEqual(expected)
          })

  })
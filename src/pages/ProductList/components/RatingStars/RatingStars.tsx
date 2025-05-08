import { createSearchParams, Link } from 'react-router-dom'

import path from '~/constants/path'
import { QueryParams } from '~/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryParams
}

export default function RatingStars({ queryConfig }: Props) {
  return (
    <ul className='mt-2.5'>
      {Array(5)
        .fill(0)
        .map((_, liIndex) => (
          <li className='pt-1.5 px-3 cursor-pointer' key={liIndex}>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({ ...queryConfig, rating_filter: (5 - liIndex).toString() }).toString()
              }}
              className='inline-flex items-center text-sm'
            >
              {Array(5)
                .fill(0)
                .map((_, starIndex) => {
                  return (
                    <div className='w-4.5 h4.5 pr-1' key={liIndex + starIndex}>
                      {starIndex < 5 - liIndex && (
                        <svg viewBox='0 0 30 30'>
                          <defs>
                            <linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
                              <stop offset='0%' stopColor='#FFCA11' />
                              <stop offset='100%' stopColor='#FFAD27' />
                            </linearGradient>
                          </defs>
                          <path
                            fill='url(#star__solid)'
                            fillRule='evenodd'
                            d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
                          />
                        </svg>
                      )}
                      {!(starIndex < 5 - liIndex) && (
                        <svg viewBox='0 0 30 30'>
                          <defs>
                            <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                              <stop offset='0%' stopColor='#FFD211' />
                              <stop offset='100%' stopColor='#FFAD27' />
                            </linearGradient>
                          </defs>
                          <path
                            fill='none'
                            fillRule='evenodd'
                            stroke='url(#star__hollow)'
                            strokeWidth={2}
                            d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                          />
                        </svg>
                      )}
                    </div>
                  )
                })}

              {liIndex !== 0 && <span className='ml-1'>trở lên</span>}
            </Link>
          </li>
        ))}
    </ul>
  )
}

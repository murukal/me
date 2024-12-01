'use client'

import Box from '@/components/box'
import { Select } from 'musae'

const Problems = () => {
  return (
    <Box className='px-10'>
      <div>
        <Select
          placeholder='Difficulty'
          options={[
            {
              value: 'easy'
            },
            {
              value: 'medium'
            },
            {
              value: 'hard'
            }
          ]}
        />
      </div>
    </Box>
  )
}

export default Problems

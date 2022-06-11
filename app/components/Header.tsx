import { Header as MantineHeader, Text } from '@mantine/core';
import Shape from './Shape';


export default function Header() {
  return (
    <MantineHeader height="5rem" style={{ borderBottom: 0 }}>
      <Shape>
          <Text
            size='xl'
            weight={800}
            variant="gradient"
            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
          >
            CoverGAN
          </Text>
      </Shape>
    </MantineHeader>
  )
}
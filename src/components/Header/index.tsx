import * as React from 'react'
import * as styles from './styles.css'

interface LogoProps {
  src: string,
  alt: string,
  width?: number,
  height?: number,
}

const Logo = (props: LogoProps): JSX.Element => (
  <article className={styles.header}>
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  </article>
)

const Header: React.FC<LogoProps> = ({ ...props }) => (
  <Logo {...props} />
)

export default Header

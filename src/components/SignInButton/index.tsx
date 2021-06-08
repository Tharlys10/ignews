import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss';

export function SignInButton() {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <button
      className={styles.singInButton}
      type="button"
    >
      <FaGithub color="#04d361" />
      Tharlys Alves
      <FiX className={styles.closeIcon} color="#737380" />
    </button>
  ) : (
    <button
      className={styles.singInButton}
      type="button"
    >
      <FaGithub color="#eba417" />
      Sing in with GitHub
    </button>
  );
}
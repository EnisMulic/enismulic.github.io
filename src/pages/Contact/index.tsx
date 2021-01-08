import style from './Contact.module.css';
import { HiOutlineMail } from 'react-icons/hi';

const Contact = () => {
  return (
    <div className={style.Contact}>
      <div>
        <a
          href="https://www.linkedin.com/in/enis-muli%C4%87/"
          target="_blank"
          rel="noreferrer"
        >
          <i className={[style.Icon, 'devicon-linkedin-plain'].join(' ')}> </i>
        </a>
      </div>
      <div>
        <a
          href="https://www.github.com/EnisMulic"
          target="_blank"
          rel="noreferrer"
        >
          <i className={[style.Icon, 'devicon-github-original'].join(' ')}></i>
        </a>
      </div>
      <div>
        <a
          href="mailto:enis.s.mulic@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <HiOutlineMail style={{ fontSize: '72px' }} />
        </a>
      </div>
    </div>
  );
};

export default Contact;

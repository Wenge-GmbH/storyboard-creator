import ReactDOM from 'react-dom';

const rootDOM = document.getElementById('root');

const Portal = ({ children, open }) => {
  if(!open) return null;

  return ReactDOM.createPortal(
    children,
    rootDOM
  )
}

export default Portal;

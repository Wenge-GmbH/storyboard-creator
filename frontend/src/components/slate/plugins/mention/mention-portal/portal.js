import ReactDOM from 'react-dom';

const rootDOM = document.getElementById('root');

const Portal = ({ children }) => (
  ReactDOM.createPortal(
    children,
    rootDOM
  )
)

export default Portal;

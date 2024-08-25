import { createRoot } from 'react-dom/client';
import App from './views/app/App';
import 'antd/dist/reset.css';
import './index.less';

console.log('%c当前环境:' + process.env.NODE_ENV, 'background-color: yellow;', {
  $APP_NAME: $APP_NAME,
  $APP_VERSION: $APP_VERSION,
  $APP_MODE: $APP_MODE,
  $APP_ENV: $APP_ENV,
  $APP_IS_H5: $APP_IS_H5,
});

const render = (dom: HTMLElement) => {
  createRoot(dom).render(<App />);
};

if (process.env.NODE_ENV === 'development') {
  render(document.getElementById('--project-h5')!);
}

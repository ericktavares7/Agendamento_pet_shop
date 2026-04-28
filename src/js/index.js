import '../styles/main.css';
import dayjs from 'dayjs';

const icons = require.context('../assets/icons', true, /\.svg$/);
icons.keys().forEach(icons);

document.addEventListener("DOMContentLoaded", () => {
  const imgLogo = document.querySelector("img.logo");

  if (imgLogo) {

  }
});

const hoje = dayjs().format('DD/MM/YYYY');



import '../styles/main.css';
import dayjs from 'dayjs';

const icons = require.context('../assets/icons', true, /\.svg$/);
icons.keys().forEach(icons);
const BtnNovoAgendamento = document.getElementById('new-appointment-btn');
const modalWrapper = document.getElementById('form-wrapper');
const BtnCancelar = document.getElementById('close-form');

BtnCancelar.addEventListener('click', () => {
  modalWrapper.classList.remove('active');
});

BtnNovoAgendamento.addEventListener('click', () => {
  modalWrapper.classList.add('active');
});

// Fechar o modal quando clicar fora do conteúdo
modalWrapper.addEventListener('click', (e) => {
  if (e.target === modalWrapper) {
    modalWrapper.classList.remove('active');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const imgLogo = document.querySelector("img.logo");

  if (imgLogo) {

  }
});

const hoje = dayjs().format('DD/MM/YYYY');



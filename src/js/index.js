import '../styles/main.css';
import dayjs from 'dayjs';

const icons = require.context('../assets/icons', true, /\.svg$/);
icons.keys().forEach(icons);

// Seletores 
const BtnNovoAgendamento = document.getElementById('new-appointment-btn');
const modalWrapper = document.getElementById('form-wrapper');
const BtnCancelar = document.getElementById('close-form');

const dateContainer = document.getElementById('date-container');
const dateSelect = document.getElementById('date-select');
const hiddenDate = document.getElementById('hidden-date');

const hoursSelect = document.getElementById('hours-select');


hiddenDate.addEventListener('change', () => {
  const dateValue = hiddenDate.value;
  if (dateValue) {
    const [year, month, day] = dateValue.split('-');
    dateSelect.value = `${day}/${month}/${year}`;
  }
});

// Abrir o datepicker ao clicar no container
dateContainer.addEventListener('click', () => hiddenDate.showPicker());

// Função para carregar os horários disponíveis
function preencherHorarios() {
  console.log("Tentando preencher horários...");

  if (!hoursSelect) {
    console.error("ERRO: O elemento #hours-select não foi encontrado no HTML.");
    return;
  }

  const horarios = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00'
  ];

  // Limpar opções anteriores
  hoursSelect.innerHTML = '<option value="">Selecione um horário</option>';

  horarios.forEach(horario => {
    const option = document.createElement('option');
    option.value = horario;
    option.textContent = horario;
    hoursSelect.appendChild(option);
  });

  console.log("Horários preenchidos com sucesso!");
}

document.addEventListener('DOMContentLoaded', () => {
    preencherHorarios();

    const hoje = dayjs().format('YYYY-MM-DD');
    if(dateSelect) dateSelect.placeholder = hoje;
});



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


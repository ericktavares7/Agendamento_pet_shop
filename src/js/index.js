import '../styles/main.css';
import dayjs from 'dayjs';

/**
 * SELETORES — Header (agenda principal)
 */
const mainDatePicker = document.getElementById('main-date-picker');
const mainDateDisplay = document.getElementById('main-date-display');

/**
 * SELETORES — Modal (novo agendamento)
 */
const btnNovoAgendamento = document.getElementById('new-appointment-btn');
const modalWrapper = document.getElementById('form-wrapper');
const btnCancelar = document.getElementById('close-form');
const modalDatePicker = document.getElementById('hidden-date');
const modalDateDisplay = document.getElementById('date-select');
const hoursSelect = document.getElementById('hours-select');

/**
 * HELPERS
 */

// Formata de YYYY-MM-DD para DD/MM/YYYY
function formatarData(isoString) {
  return dayjs(isoString).format('DD/MM/YYYY');
}

// Retorna a data de hoje no formato ISO (YYYY-MM-DD)
function hojeISO() {
  return dayjs().format('YYYY-MM-DD');
}

/**
 * CALENDÁRIO DO HEADER
 * Ao mudar a data no picker invisível → atualiza o display visível
 */
function inicializarCalendarioHeader() {
  const mainDateWrapper = document.getElementById('main-date-wrapper');

  if (!mainDateWrapper || !mainDatePicker || !mainDateDisplay) return;

  mainDatePicker.value = hojeISO();
  mainDateDisplay.value = formatarData(hojeISO());

  // Clique em qualquer parte do wrapper abre o calendário
  mainDateWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    mainDatePicker.style.pointerEvents = 'auto';

    try {
      mainDatePicker.showPicker();
    } catch (err) {
      mainDatePicker.click();
    }

    mainDatePicker.style.pointerEvents = 'none';
  });

  mainDatePicker.addEventListener('change', () => {
    if (!mainDatePicker.value) return;
    const dataFormatada = formatarData(mainDatePicker.value);
    mainDateDisplay.value = dataFormatada;
    console.log('📅 Agenda filtrada para:', dataFormatada);
  });
}

/**
 * CALENDÁRIO DO MODAL
 */
function inicializarCalendarioModal() {
  const modalDateWrapper = document.getElementById('date-container');

  if (!modalDateWrapper || !modalDatePicker || !modalDateDisplay) return;

  modalDatePicker.value = hojeISO();
  modalDateDisplay.value = formatarData(hojeISO());

  // Clique em qualquer parte do wrapper abre o calendário
  modalDateWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    modalDatePicker.style.pointerEvents = 'auto';

    try {
      modalDatePicker.showPicker();
    } catch (err) {
      modalDatePicker.click();
    }

    modalDatePicker.style.pointerEvents = 'none';
  });

  modalDatePicker.addEventListener('change', () => {
    if (!modalDatePicker.value) return;
    const dataFormatada = formatarData(modalDatePicker.value);
    modalDateDisplay.value = dataFormatada;
    console.log('📅 Data do agendamento:', dataFormatada);
  });
}

/**
 * MODAL — Abrir / Fechar
 */
function inicializarModal() {
  // Abre ao clicar no botão
  btnNovoAgendamento?.addEventListener('click', () => {
    modalWrapper.classList.add('active');
  });

  // Fecha ao clicar em Cancelar
  btnCancelar?.addEventListener('click', () => {
    modalWrapper.classList.remove('active');
  });

  // Fecha ao clicar no fundo escuro (fora do .form)
  modalWrapper?.addEventListener('click', (e) => {
    if (e.target === modalWrapper) {
      modalWrapper.classList.remove('active');
    }
  });

  // Fecha ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalWrapper?.classList.remove('active');
    }
  });
}

function inicializarHorariosWrapper() {
  const hoursContainer = document.getElementById('hours-container');

  if (!hoursContainer || !hoursSelect) return;

  hoursContainer.addEventListener('click', () => {
    hoursSelect.focus(); // foca no select
    hoursSelect.click(); // abre o dropdown nativo
  });
}
/**
 * HORÁRIOS — preenche o select do modal dinamicamente
 * Separados por período para facilitar validação futura
 */
function preencherHorarios() {
  if (!hoursSelect) return;

  const horarios = [
    // Manhã
    { value: '09:00', label: '09:00 — Manhã' },
    { value: '10:00', label: '10:00 — Manhã' },
    { value: '11:00', label: '11:00 — Manhã' },
    // Tarde
    { value: '13:00', label: '13:00 — Tarde' },
    { value: '14:00', label: '14:00 — Tarde' },
    { value: '15:00', label: '15:00 — Tarde' },
    { value: '16:00', label: '16:00 — Tarde' },
    { value: '17:00', label: '17:00 — Tarde' },
    // Noite
    { value: '18:00', label: '18:00 — Noite' },
    { value: '19:00', label: '19:00 — Noite' },
    { value: '20:00', label: '20:00 — Noite' },
  ];

  // Limpa e reconstrói
  hoursSelect.innerHTML = '<option value="" disabled selected>Selecione um horário</option>';

  horarios.forEach(({ value, label }) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    hoursSelect.appendChild(option);
  });
}

/**
 * INICIALIZAÇÃO
 * Espera o DOM estar pronto antes de rodar tudo
 */
document.addEventListener('DOMContentLoaded', () => {
  inicializarCalendarioHeader();
  inicializarCalendarioModal();
  inicializarModal();
  inicializarHorariosWrapper();
  preencherHorarios();

  console.log('🐾 PetShop Agenda inicializado!');
});
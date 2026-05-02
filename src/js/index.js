import '../styles/main.css';
import dayjs from 'dayjs';

/**
 * SELETORES
 */
const mainDatePicker = document.getElementById('main-date-picker');
const mainDateDisplay = document.getElementById('main-date-display');
const btnNovoAgendamento = document.getElementById('new-appointment-btn');
const modalWrapper = document.getElementById('form-wrapper');
const btnCancelar = document.getElementById('close-form');
const modalDatePicker = document.getElementById('hidden-date');
const modalDateDisplay = document.getElementById('date-select');
const hoursSelect = document.getElementById('hours-select');
const form = document.getElementById('appointment-form');

/**
 * HELPERS DE DATA
 */
function formatarData(isoString) {
  return dayjs(isoString).format('DD/MM/YYYY');
}

function hojeISO() {
  return dayjs().format('YYYY-MM-DD');
}

// Descobre o período pela hora
function getPeriodo(hora) {
  const h = parseInt(hora.split(':')[0]);
  if (h >= 9 && h < 13) return 'morning';
  if (h >= 13 && h < 18) return 'afternoon';
  if (h >= 18 && h < 23) return 'evening';
  return null; // hora inválida
}

// Gera um id único baseado no timestamp
function gerarId() {
  return Date.now().toString();
}

/**
 * ================================
 * CRUD — localStorage
 * ================================
 */

// READ — lê todos os agendamentos salvos
function getAgendamentos() {
  const dados = localStorage.getItem('agendamentos');
  return dados ? JSON.parse(dados) : [];
}

// SAVE — sobrescreve o array inteiro no localStorage
function salvarAgendamentos(agendamentos) {
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}

// CREATE — adiciona um novo agendamento
function adicionarAgendamento(novo) {
  const agendamentos = getAgendamentos();
  agendamentos.push(novo);
  salvarAgendamentos(agendamentos);
}

// DELETE — remove pelo id
function removerAgendamento(id) {
  const agendamentos = getAgendamentos().filter(a => a.id !== id);
  salvarAgendamentos(agendamentos);
}

// FILTER — filtra por data
function getAgendamentosPorData(dataISO) {
  return getAgendamentos()
    .filter(a => a.data === dataISO)
    .sort((a, b) => a.hora.localeCompare(b.hora)); // ordena por hora
}

/**
 * VALIDAÇÕES
 */
function validarConflito(data, hora) {
  const agendamentos = getAgendamentos();
  return agendamentos.some(a => a.data === data && a.hora === hora);
}

function validarHora(hora) {
  return getPeriodo(hora) !== null;
}

/**
 * ================================
 * RENDERIZAÇÃO
 * ================================
 */
function renderizarAgendamentos(dataISO) {
  const periodos = {
    morning: document.getElementById('period-morning'),
    afternoon: document.getElementById('period-afternoon'),
    evening: document.getElementById('period-evening'),
  };

  // Limpa as listas antes de renderizar
  Object.values(periodos).forEach(ul => {
    if (ul) ul.innerHTML = '';
  });

  const agendamentos = getAgendamentosPorData(dataISO);

  // Se não houver agendamentos, mostra mensagem em cada período
  if (agendamentos.length === 0) {
    Object.values(periodos).forEach(ul => {
      if (ul) ul.innerHTML = `
        <li class="appointment-empty">
          Nenhum agendamento para este período.
        </li>`;
    });
    return;
  }

  // Insere cada agendamento na seção correta
  agendamentos.forEach(a => {
    const ul = periodos[a.periodo];
    if (!ul) return;

    const li = document.createElement('li');
    li.classList.add('appointment');
    li.dataset.id = a.id;
    li.dataset.time = a.hora;
    li.dataset.period = a.periodo;

    li.innerHTML = `
      <div class="appointment_header">
        <span class="appointment_time">${a.hora}</span>
        <span class="appointment_pet">${a.pet}</span>
        <span class="appointment_separator">/</span>
        <span class="appointment_owner">${a.tutor}</span>
      </div>
      <div class="appointment_body">
        <span class="appointment_service">${a.servico}</span>
      </div>
      <footer class="appointment_footer">
        <a href="#" class="appointment_remove" data-id="${a.id}">
          Remover agendamento
        </a>
      </footer>
    `;

    ul.appendChild(li);
  });
}

/**
 * ================================
 * FORMULÁRIO — Submit
 * ================================
 */
function inicializarFormulario() {
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Coleta os valores
    const tutor = document.getElementById('owner').value.trim();
    const pet = document.getElementById('pet').value.trim();
    const telefone = document.getElementById('contact').value.trim();
    const servico = document.getElementById('service').value;
    const dataISO = modalDatePicker.value;
    const hora = hoursSelect.value;

    // Validação — campos obrigatórios
    if (!tutor || !pet || !telefone || !servico || !dataISO || !hora) {
      alert('Preencha todos os campos!');
      return;
    }

    // Validação — hora dentro das faixas válidas
    if (!validarHora(hora)) {
      alert('Horário fora das faixas permitidas!');
      return;
    }

    // Validação — conflito de horário
    if (validarConflito(dataISO, hora)) {
      alert(`Já existe um agendamento às ${hora} nesta data!`);
      return;
    }

    // Monta o objeto do agendamento
    const novoAgendamento = {
      id: gerarId(),
      data: dataISO,
      hora,
      pet,
      tutor,
      telefone,
      servico,
      periodo: getPeriodo(hora),
    };

    // Salva e atualiza a tela
    adicionarAgendamento(novoAgendamento);
    renderizarAgendamentos(mainDatePicker.value || hojeISO());

    // Fecha o modal e limpa o form
    modalWrapper.classList.remove('active');
    form.reset();
    modalDatePicker.value = hojeISO();
    modalDateDisplay.value = formatarData(hojeISO());

    console.log('✅ Agendamento salvo:', novoAgendamento);
  });
}

/**
 * REMOVER — delegação de eventos
 */
function inicializarRemoverAgendamento() {
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('appointment_remove')) return;
    e.preventDefault();

    const id = e.target.dataset.id;
    const card = document.querySelector(`.appointment[data-id="${id}"]`);

    // Remove do localStorage e do DOM
    removerAgendamento(id);
    card?.remove();

    console.log('🗑️ Agendamento removido:', id);
  });
}

/**
 * CALENDÁRIO DO HEADER
 */
function inicializarCalendarioHeader() {
  const mainDateWrapper = document.getElementById('main-date-wrapper');
  if (!mainDateWrapper || !mainDatePicker || !mainDateDisplay) return;

  mainDatePicker.value = hojeISO();
  mainDateDisplay.value = formatarData(hojeISO());

  mainDateWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    mainDatePicker.style.pointerEvents = 'auto';
    try {
      mainDatePicker.showPicker();
    } catch {
      mainDatePicker.click();
    }
    mainDatePicker.style.pointerEvents = 'none';
  });

  // Ao trocar a data → re-renderiza os agendamentos
  mainDatePicker.addEventListener('change', () => {
    if (!mainDatePicker.value) return;
    mainDateDisplay.value = formatarData(mainDatePicker.value);
    renderizarAgendamentos(mainDatePicker.value);
    console.log('📅 Agenda filtrada para:', mainDateDisplay.value);
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

  modalDateWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    modalDatePicker.style.pointerEvents = 'auto';
    try {
      modalDatePicker.showPicker();
    } catch {
      modalDatePicker.click();
    }
    modalDatePicker.style.pointerEvents = 'none';
  });

  modalDatePicker.addEventListener('change', () => {
    if (!modalDatePicker.value) return;
    modalDateDisplay.value = formatarData(modalDatePicker.value);
  });
}

/**
 * MODAL — Abrir / Fechar
 */
function inicializarModal() {
  btnNovoAgendamento?.addEventListener('click', () => {
    modalWrapper.classList.add('active');
  });

  btnCancelar?.addEventListener('click', () => {
    modalWrapper.classList.remove('active');
  });

  modalWrapper?.addEventListener('click', (e) => {
    if (e.target === modalWrapper) {
      modalWrapper.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modalWrapper?.classList.remove('active');
  });
}

/**
 * HORÁRIOS
 */
function preencherHorarios() {
  if (!hoursSelect) return;

  const horarios = [
    { value: '09:00', label: '09:00 — Manhã' },
    { value: '10:00', label: '10:00 — Manhã' },
    { value: '11:00', label: '11:00 — Manhã' },
    { value: '13:00', label: '13:00 — Tarde' },
    { value: '14:00', label: '14:00 — Tarde' },
    { value: '15:00', label: '15:00 — Tarde' },
    { value: '16:00', label: '16:00 — Tarde' },
    { value: '17:00', label: '17:00 — Tarde' },
    { value: '18:00', label: '18:00 — Noite' },
    { value: '19:00', label: '19:00 — Noite' },
    { value: '20:00', label: '20:00 — Noite' },
  ];

  hoursSelect.innerHTML = '<option value="" disabled selected>Selecione um horário</option>';
  horarios.forEach(({ value, label }) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    hoursSelect.appendChild(option);
  });
}

function inicializarHorariosWrapper() {
  const hoursContainer = document.getElementById('hours-container');
  if (!hoursContainer || !hoursSelect) return;

  hoursContainer.addEventListener('click', () => {
    hoursSelect.focus();
    hoursSelect.click();
  });
}

/**
 * INICIALIZAÇÃO
 */
document.addEventListener('DOMContentLoaded', () => {
  inicializarCalendarioHeader();
  inicializarCalendarioModal();
  inicializarModal();
  preencherHorarios();
  inicializarHorariosWrapper();
  inicializarFormulario();
  inicializarRemoverAgendamento();

  // Renderiza os agendamentos do dia atual ao carregar
  renderizarAgendamentos(hojeISO());

  console.log('🐾 PetShop Agenda inicializado!');
});
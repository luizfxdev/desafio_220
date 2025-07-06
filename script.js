// Mapeamento completo das poções e suas potências
const potionsMap = {
  sono: { name: 'Poção do Sono', power: 1 },
  'poção-do-sono': { name: 'Poção do Sono', power: 1 },
  dormir: { name: 'Poção do Sono', power: 1 },

  cura: { name: 'Poção de Cura', power: 2 },
  'poção-de-cura': { name: 'Poção de Cura', power: 2 },
  vida: { name: 'Poção de Cura', power: 2 },
  curação: { name: 'Poção de Cura', power: 2 },

  'morto-vivo': { name: 'Poção do Morto-Vivo', power: 3 },
  'poção-do-morto-vivo': { name: 'Poção do Morto-Vivo', power: 3 },
  zumbi: { name: 'Poção do Morto-Vivo', power: 3 },
  mortovivo: { name: 'Poção do Morto-Vivo', power: 3 },

  polissuco: { name: 'Poção Polissuco', power: 4 },
  'poção-polissuco': { name: 'Poção Polissuco', power: 4 },
  polimorfo: { name: 'Poção Polissuco', power: 4 },
  transformação: { name: 'Poção Polissuco', power: 4 },

  amor: { name: 'Poção do Amor', power: 5 },
  'poção-do-amor': { name: 'Poção do Amor', power: 5 },
  apaixonar: { name: 'Poção do Amor', power: 5 },
  coração: { name: 'Poção do Amor', power: 5 }
};

// Função para normalizar o nome da poção
function normalizePotionName(input) {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^a-z0-9-]/g, ''); // Remove caracteres especiais
}

// Função para organizar as poções por potência
function organizePotions(input) {
  const inputPotions = input
    .split(',')
    .map(p => p.trim())
    .filter(p => p !== '');
  let steps = 'Passo a passo:\n\n';
  let validPotions = [];
  let invalidPotions = [];

  steps += '1. Processando entrada:\n';

  inputPotions.forEach((potion, index) => {
    const normalized = normalizePotionName(potion);
    const foundPotion = Object.keys(potionsMap).find(key => key === normalized);

    if (foundPotion) {
      const potionData = potionsMap[foundPotion];
      validPotions.push({
        name: potionData.name,
        power: potionData.power,
        original: potion
      });
      steps += `   - "${potion}" → Reconhecido como ${potionData.name} (Potência: ${potionData.power})\n`;
    } else {
      invalidPotions.push(potion);
      steps += `   - "${potion}" → Não reconhecido (ignorado)\n`;
    }
  });

  steps += '\n2. Ordenando poções por potência (da maior para a menor):\n';

  // Ordenar por potência (decrescente)
  validPotions.sort((a, b) => b.power - a.power);

  validPotions.forEach((potion, index) => {
    steps += `   ${index + 1}. ${potion.name} (Potência: ${potion.power})\n`;
  });

  // Calcular potência total
  const totalPower = validPotions.reduce((sum, potion) => sum + potion.power, 0);
  steps += `\n3. Potência total calculada: ${totalPower}\n`;

  // Preparar resultado
  const resultPotions = validPotions.map(p => p.name);
  const result = resultPotions.join(', ');

  return {
    result,
    steps,
    invalidPotions,
    totalPower
  };
}

// Função para limpar os resultados
function clearResults() {
  document.getElementById('calculation-steps').textContent = '';
  document.getElementById('result-output').textContent = '';
}

// Event listeners
document.getElementById('organize-btn').addEventListener('click', () => {
  const input = document.getElementById('potions-input').value;
  if (!input.trim()) {
    alert('Por favor, insira algumas poções!');
    return;
  }

  const { result, steps, invalidPotions, totalPower } = organizePotions(input);

  document.getElementById('calculation-steps').textContent = steps;
  document.getElementById('result-output').innerHTML = `
        <strong>Poções organizadas:</strong> ${result}<br>
        <strong>Potência total:</strong> ${totalPower}
        ${invalidPotions.length > 0 ? `<br><strong>Poções não reconhecidas:</strong> ${invalidPotions.join(', ')}` : ''}
    `;
});

document.getElementById('return-btn').addEventListener('click', clearResults);

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Exemplo inicial
  document.getElementById('potions-input').value = 'Sono, Amor, Cura, Morto-Vivo, Polissuco';
});

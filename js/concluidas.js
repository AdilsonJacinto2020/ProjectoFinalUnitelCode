// JavaScript para Metas Concluídas (concluidas.js)
document.addEventListener('DOMContentLoaded', () => {
    const listaMetasConcluidas = document.getElementById('lista-metas-concluidas');

    // Função para carregar e exibir metas concluídas
    function carregarMetasConcluidas() {
        listaMetasConcluidas.innerHTML = '';
        const metas = JSON.parse(localStorage.getItem('metas')) || [];

        metas.forEach((meta, index) => {
            if (meta.concluida) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `
                    <strong>${meta.nome}</strong>
                    <p>${meta.descricao}</p>
                    <p>Categoria: ${meta.categoria}</p>
                    <p>Data de Término: ${meta.dataTermino}</p>
                    <p>Progresso: ${meta.progresso}%</p>
                    <p>Prioridade: ${meta.prioridade}</p>
                    <p>Concluída: Sim</p>
                `;
                listaMetasConcluidas.appendChild(li);
            }
        });
    }

    // Carregue e exiba as metas concluídas
    carregarMetasConcluidas();
});

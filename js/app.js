// JavaScript principal (app.js)
document.addEventListener('DOMContentLoaded', () => {
    const metaForm = document.getElementById('meta-form');
    const listaMetas = document.getElementById('lista-metas');
    let metaIndexToEdit = -1;

    // Função para criar um botão de ação
    function criarBotaoAcao(texto, onClickFunction, classe) {
        const button = document.createElement('button');
        button.className = `btn ${classe}`;
        button.textContent = texto;
        button.addEventListener('click', onClickFunction);
        return button;
    }

    // Função para criar uma li com os detalhes da meta
    function criarLiMeta(meta, index) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <strong>${meta.nome}</strong>
            <p>${meta.descricao}</p>
            <p>Categoria: ${meta.categoria}</p>
            <p>Data de Término: ${meta.dataTermino}</p>
            <p>Progresso: ${meta.progresso}%</p>
            <p>Prioridade: ${meta.prioridade}</p>
            <p>Concluída: ${meta.concluida ? 'Sim' : 'Não'}</p>
        `;
        const editarButton = criarBotaoAcao('Editar', () => editarMeta(index), 'btn-primary');
        const concluirButton = criarBotaoAcao('Concluir', () => concluirMeta(index), meta.concluida ? 'btn-success disabled' : 'btn-success');
        const excluirButton = criarBotaoAcao('Excluir', () => removerMeta(index), 'btn-danger');
        li.appendChild(editarButton);
        li.appendChild(concluirButton);
        li.appendChild(excluirButton);
        return li;
    }

    // Função para editar uma meta
    function editarMeta(index) {
        const metas = JSON.parse(localStorage.getItem('metas')) || [];
        const meta = metas[index];
        if (meta && !meta.concluida) {
            document.getElementById('nome').value = meta.nome;
            document.getElementById('descricao').value = meta.descricao;
            document.getElementById('categoria').value = meta.categoria;
            document.getElementById('data-termino').value = meta.dataTermino;
            document.getElementById('progresso').value = meta.progresso.toString();
            document.getElementById('prioridade').value = meta.prioridade || 1;
            metaIndexToEdit = index;
        }
    }

    // Função para concluir uma meta
    function concluirMeta(index) {
        const metas = JSON.parse(localStorage.getItem('metas')) || [];
        const meta = metas[index];
        if (meta) {
            const progresso = parseInt(document.getElementById('progresso').value);
            meta.progresso = progresso;
            meta.concluida = progresso === 100;
            meta.prioridade = parseInt(document.getElementById('prioridade').value);
            metas[index] = meta;
            localStorage.setItem('metas', JSON.stringify(metas));
            atualizarListasMetas();
        }
    }

    // Função para remover uma meta
    function removerMeta(index) {
        const confirmacao = confirm('Tem certeza que deseja excluir esta meta?');
        if (confirmacao) {
            const metas = JSON.parse(localStorage.getItem('metas')) || [];
            metas.splice(index, 1);
            localStorage.setItem('metas', JSON.stringify(metas));
            atualizarListasMetas();
        }
    }

    // Evento de envio do formulário de meta
    metaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtenha valores do formulário
        const nome = document.getElementById('nome').value.trim();
        const descricao = document.getElementById('descricao').value;
        const categoria = document.getElementById('categoria').value.trim();
        const dataTermino = document.getElementById('data-termino').value;
        const progresso = parseInt(document.getElementById('progresso').value);
        const prioridade = parseInt(document.getElementById('prioridade').value);

        // Validação básica
        if (!nome || !categoria) {
            alert('Por favor, preencha os campos obrigatórios: Nome da Meta e Categoria.');
            return;
        }

        // Crie um objeto de meta
        const meta = {
            nome,
            descricao,
            categoria,
            dataTermino,
            progresso,
            prioridade,
            concluida: progresso === 100
        };

        // Obtenha metas do armazenamento local
        const metas = JSON.parse(localStorage.getItem('metas')) || [];

        // Verifique se está editando ou adicionando uma nova meta
        if (metaIndexToEdit >= 0) {
            metas[metaIndexToEdit] = meta;
            metaIndexToEdit = -1;
        } else {
            metas.push(meta);
        }

        // Armazene metas atualizadas no armazenamento local
        localStorage.setItem('metas', JSON.stringify(metas));

        // Atualize a lista de metas
        atualizarListasMetas();
        metaForm.reset();
    });

    // Função para atualizar a lista de metas
    function atualizarListasMetas() {
        listaMetas.innerHTML = '';
        const metas = JSON.parse(localStorage.getItem('metas')) || [];

        metas.forEach((meta, index) => {
            const li = criarLiMeta(meta, index);
            listaMetas.appendChild(li);
        });
    }

    // Inicialize a lista de metas
    atualizarListasMetas();
});

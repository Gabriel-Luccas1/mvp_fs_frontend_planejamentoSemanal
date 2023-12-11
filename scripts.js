/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/planejamento';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.planejamentos.forEach(item => insertList(item.encarregado, item.equipe, item.funcao, item.servico_local))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputEncarregado, inputEquipe, inputFuncao, inputServico_local) => {
  const formData = new FormData();
  formData.append('encarregado', inputEncarregado);
  formData.append('equipe', inputEquipe);
  formData.append('funcao', inputFuncao);
  formData.append('servico_local', inputServico_local);

  let url = 'http://127.0.0.1:5000/planejamento_add';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/planejamento?encarregado=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputEncarregado = document.getElementById("newEncarregado").value;
  let inputEquipe = document.getElementById("newEquipe").value;
  let inputFuncao = document.getElementById("newFuncao").value;
  let inputServico_local = document.getElementById("newServico_local").value;

  if (inputEncarregado, inputEquipe, inputFuncao, inputServico_local === '') {
    alert("Escreva o nome de um item!");
  } else {
    insertList(inputEncarregado, inputEquipe, inputFuncao, inputServico_local)
    postItem(inputEncarregado, inputEquipe, inputFuncao, inputServico_local)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameEncarregado, equipe, funcao, servico_local) => {
  var item = [nameEncarregado, equipe, funcao, servico_local]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newEncarregado").value = "";
  document.getElementById("newEquipe").value = "";
  document.getElementById("newFuncao").value = "";
  document.getElementById("newServico_local").value = "";

  removeElement()
}

/*
  --------------------------------------------------------------------------------------
  Função para filtrar items na lista apresentada
  --------------------------------------------------------------------------------------
*/

const INPUT_BUSCA = document.getElementById('input-busca');
const TABELA_PLANEJAMENTO = document.getElementById('myTable');

INPUT_BUSCA.addEventListener('keyup', () => {
  let expressao = INPUT_BUSCA.value;


  let linhas = TABELA_PLANEJAMENTO.getElementsByTagName('tr');

  console.log(linhas);
  for(let posicao in linhas) {
    if (true === isNaN(posicao)){
      continue;
    }

    let conteudoDaLinha = linhas[posicao].innerHTML;

    if (true === conteudoDaLinha.includes(expressao)){
      linhas[posicao].style.display = ""; 
    } else {
      linhas[posicao].style.display = "none";
    }
  }
});

// Anima as linhas da tabela ao passar o mouse sobre elas
function onRowMouseOver(event) {
  event.target.classList.add("row-hover");
}

// Anima as colunas da tabela ao passar o mouse sobre elas
function onColumnMouseOver(event) {
  event.target.classList.add("column-hover");
}


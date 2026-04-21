let vinhos = [
    { nome: "Vinho Tinto Reserva", preco: 80 },
    { nome: "Vinho Branco Seco", preco: 60 },
    { nome: "Vinho Rosé Premium", preco: 70 }
];

let carrinho = [];

function carregarVinhos() {
    const lista = document.getElementById("listaVinhos");
    lista.innerHTML = "";

    vinhos.forEach((vinho, index) => {
        lista.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card p-3">
                    <h5>${vinho.nome}</h5>
                    <p>R$ ${vinho.preco}</p>
                    <button class="btn btn-success" onclick="adicionarCarrinho(${index})">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;
    });
}

function adicionarCarrinho(index) {
    carrinho.push(vinhos[index]);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    document.getElementById("contador").innerText = carrinho.length;
}

function abrirCarrinho() {
    let lista = document.getElementById("itensCarrinho");
    lista.innerHTML = "";

    carrinho.forEach(item => {
        lista.innerHTML += `<p>${item.nome} - R$ ${item.preco}</p>`;
    });

    let modal = new bootstrap.Modal(document.getElementById("carrinhoModal"));
    modal.show();
}

document.getElementById("pesquisa").addEventListener("input", function() {
    let valor = this.value.toLowerCase();

    let filtrados = vinhos.filter(v => v.nome.toLowerCase().includes(valor));

    const lista = document.getElementById("listaVinhos");
    lista.innerHTML = "";

    filtrados.forEach((vinho, index) => {
        lista.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card p-3">
                    <h5>${vinho.nome}</h5>
                    <p>R$ ${vinho.preco}</p>
                    <button class="btn btn-success" onclick="adicionarCarrinho(${index})">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;
    });
});

carregarVinhos();
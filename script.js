// =====================================
// CADASTRO
// =====================================

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    formCadastro.addEventListener("submit", async function (event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const cpf = document.getElementById("cpf").value;
        const endereco = document.getElementById("endereco").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;
        const mensagem = document.getElementById("mensagem");


        // =====================================
        // VERIFICA SE AS SENHAS SÃO IGUAIS
        // =====================================

        if (senha !== confirmarSenha) {

            mensagem.textContent = "As senhas não são iguais.";
            mensagem.style.color = "red";

            return;
        }


        // =====================================
        // TRANSFORMA A SENHA EM HASH
        // =====================================

        const encoder = new TextEncoder();

        const dadosSenha = encoder.encode(senha);

        const hashBuffer = await crypto.subtle.digest(
            "SHA-256",
            dadosSenha
        );

        const hashArray = Array.from(
            new Uint8Array(hashBuffer)
        );

        const senhaHash = hashArray
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");


        // =====================================
        // CRIA O CADASTRO
        // =====================================

        const usuario = {

            nome: nome,

            cpf: cpf,

            endereco: endereco,

            email: email,

            senhaHash: senhaHash

        };


        // =====================================
        // SALVA NO NAVEGADOR
        // =====================================

        const usuarioJSON = JSON.stringify(usuario);

        localStorage.setItem(
            "usuarioPoupeBank",
            usuarioJSON
        );


        // =====================================
        // CRIA O ARQUIVO TXT
        // =====================================

        const conteudoTXT = `
========================================
           POUPE BANK
        DADOS DO CADASTRO
========================================

Nome: ${nome}

CPF: ${cpf}

Endereço: ${endereco}

Email: ${email}

Senha: [PROTEGIDA POR HASH]

Hash da senha:
${senhaHash}

========================================
Cadastro realizado em:
${new Date().toLocaleString("pt-BR")}
========================================
`;


        // =====================================
        // CRIA O ARQUIVO
        // =====================================

        const arquivo = new Blob(
            [conteudoTXT],
            {
                type: "text/plain;charset=utf-8"
            }
        );


        // =====================================
        // FAZ O DOWNLOAD DO TXT
        // =====================================

        const link = document.createElement("a");

        const urlArquivo = URL.createObjectURL(arquivo);

        link.href = urlArquivo;

        link.download = "cadastro-poupe-bank.txt";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(urlArquivo);


        // =====================================
        // MENSAGEM DE SUCESSO
        // =====================================

        mensagem.textContent =
            "Cadastro realizado com sucesso! O arquivo TXT foi baixado.";

        mensagem.style.color = "#168a45";


        // =====================================
        // LIMPA O FORMULÁRIO
        // =====================================

        formCadastro.reset();

    });

}


// =====================================
// MENUS
// =====================================

const btnSobre =
    document.getElementById("btn-sobre");

const menuSobre =
    document.getElementById("menu-vertical-sobre");


const btnServicos =
    document.getElementById("btn-servicos");

const menuServicos =
    document.getElementById("menu-vertical-servicos");


const btnLicencas =
    document.getElementById("btn-licencas");

const menuLicencas =
    document.getElementById("menu-vertical-licencas");


const btnContato =
    document.getElementById("btn-contato");

const menuContato =
    document.getElementById("menu-vertical-contato");


// =====================================
// FUNÇÃO PARA ABRIR MENU
// =====================================

function abreMenu(event, menu) {

    event.preventDefault();

    if (!menu) {
        return;
    }


    // Fecha os outros menus
    document.querySelectorAll(".submenu").forEach(function (item) {

        if (item !== menu) {

            item.classList.remove("active");

            item.classList.remove("mostrar");

        }

    });


    // Abre ou fecha o menu clicado
    menu.classList.toggle("active");

    menu.classList.toggle("mostrar");

}


// =====================================
// MENU SOBRE
// =====================================

if (btnSobre && menuSobre) {

    btnSobre.addEventListener("click", function (event) {

        abreMenu(event, menuSobre);

    });

}


// =====================================
// MENU SERVIÇOS
// =====================================

if (btnServicos && menuServicos) {

    btnServicos.addEventListener("click", function (event) {

        abreMenu(event, menuServicos);

    });

}


// =====================================
// MENU LICENÇAS
// =====================================

if (btnLicencas && menuLicencas) {

    btnLicencas.addEventListener("click", function (event) {

        abreMenu(event, menuLicencas);

    });

}


// =====================================
// MENU CONTATO
// =====================================

if (btnContato && menuContato) {

    btnContato.addEventListener("click", function (event) {

        abreMenu(event, menuContato);

    });

}


// =====================================
// FECHAR MENU AO CLICAR FORA
// =====================================

document.addEventListener("click", function (event) {

    const menus = document.querySelectorAll(".submenu");


    menus.forEach(function (menu) {

        const dropdown = menu.parentElement;


        if (!dropdown.contains(event.target)) {

            menu.classList.remove("active");

            menu.classList.remove("mostrar");

        }

    });

});
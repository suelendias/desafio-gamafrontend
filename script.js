// VALIDAR CEP **************************************************************************

'use strict';

const limparFormulario = (endereco) =>
{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}


const preencherFormulario = (endereco) =>
{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => 
{
    limparFormulario();
    
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep))
    {
        const dados = await fetch(url);
        const endereco = await dados.json();
            if (endereco.hasOwnProperty('erro'))
            {
                document.getElementById('endereco').value = 'CEP não encontrado!';
            }
            else 
            {
                preencherFormulario(endereco);
            }
    }
    
    else
    {
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
     
}


document.getElementById('cep')
        .addEventListener('focusout', pesquisarCep);




        

// VALIDAR CPF **************************************************************************
function verificarCPF(strCpf) 
{
    if (!/[0-9]{11}/.test(strCpf)) return false;
    if (strCpf === "00000000000") return false;
    if (strCpf === "11111111111") return false;
    if (strCpf === "22222222222") return false;
    if (strCpf === "33333333333") return false;
    if (strCpf === "44444444444") return false;
    if (strCpf === "55555555555") return false;
    if (strCpf === "66666666666") return false;
    if (strCpf === "77777777777") return false;
    if (strCpf === "88888888888") return false;
    if (strCpf === "99999999999") return false;

    var soma = 0;

    for (var i = 1; i <= 9; i++) 
    {
        soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    var resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) 
    {
        resto = 0;
    } 
    else 
    {
        resto = 11 - resto;
    }

    if (resto !== parseInt(strCpf.substring(9, 10))) 
    {
        return false;
    }

    soma = 0;

    for (var i = 1; i <= 10; i++) 
    {
        soma += parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) 
    {
        resto = 0;
    } 
    else 
    {
        resto = 11 - resto;
    }

    if (resto !== parseInt(strCpf.substring(10, 11))) 
    {
        return false;
    } 
     
    return true;
}

function validarNome() 
{
    var strCpf = document.getElementById('cpf1').value;

    if (!verificarCPF(strCpf)) 
    {
        alert("CPF inválido");
        return;
    }

    
    document.getElementById('frm').submit();
}



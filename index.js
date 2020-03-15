function mostraSim()
{
    document.getElementById('div1').style.display='block';
}
function mostraNao()
{
    document.getElementById('div1').style.display='none';
}


function checaLetrasNome(inputtexto)
{
    var letras = /^[A-Za-z]+$/;
    if( inputtexto.match(letras))
    {
        return true;
    }
    else{
        alert("Insira somente letras");
        return false;
        }
}
function checaNumerosTelefone(inputtexto)
{
    var numeros = /^[0-9]+$/;
    if( inputtexto.match(numeros))
    {
        return true;
    }
    else{
        alert("Insira somente numeros");
        return false;
    }
}
function preencherPerfil(form)
{
    // Cria um objeto para retornar o arquivo JSON, inicialmente, todos os campos estao vazios
    var arquivoRetorno = {nomeret:"", telefoneret:"", conhecimentoret:"",redesret:[]};
    var nome = document.forms["formularioRegistro"]["Nome"];
    var telefone = document.forms["formularioRegistro"]["Telefone"];
    var conhecimento = document.forms["formularioRegistro"]["Conhecimento"];
    var redesSociais = document.forms["formularioRegistro"]["RedesSociais"];
    var checados1 = document.forms["formularioRegistro"]["Checados1"];
    var checados2 = document.forms["formularioRegistro"]["Checados2"];
    var checados3 = document.forms["formularioRegistro"]["Checados3"];
    var checaNome = nome.value.split(" ");
    if( checaNome.length != 2)
    {
        window.alert("Inserir o nome e sobrenome.");
        document.getElementById('Nome').style.borderColor = "red";
        return false;
    }
    else{
        for( testeNomes in checaNome) {
            if(! (checaLetrasNome(checaNome[testeNomes])) )
            {
                document.getElementById('Nome').style.borderColor = "red";
                return false;
            }
        } 
    }
// Nome esta ok, logo pode inserir
    arquivoRetorno.nomeret = nome.value;
    document.getElementById('Nome').style.borderColor = "green";
    if( telefone.value[2] != '-')
    {
        window.alert("Favor inserir no formato xx-xxxxxxxx.");
        document.getElementById('Telefone').style.borderColor = "red";
        return false;
    }
    else {
        var checaTelefone = telefone.value.split('-');
        for( testeNums in checaTelefone) {
            if(! (checaNumerosTelefone(checaTelefone[testeNums])) )
            {
                return false;
            }
            if(checaTelefone[1].length != 8)
            {
                window.alert("Favor inserir no formato xx-xxxxxxxx.");
                document.getElementById('Telefone').style.borderColor = "red";
                return false;
            }
        }
    }
    //Telefone ok, pode inserir
    arquivoRetorno.telefoneret = telefone.value;
    arquivoRetorno.conhecimentoret = conhecimento.value;
    document.getElementById('Telefone').style.borderColor = "green";
    if( redesSociais.value == "sim")
    {
        if( checados1.checked == true )
        {
           arquivoRetorno.redesret.push(checados1.value);
        }
        if( checados2.checked == true )
        {
            arquivoRetorno.redesret.push(checados2.value);
        }
        if( checados3.checked == true )
        {
            arquivoRetorno.redesret.push(checados3.value);
        }
    }
            
    var arquivoEnviar = JSON.stringify(arquivoRetorno);
    var envio = new XMLHttpRequest();
    console.log(arquivoEnviar);
    envio.open("POST", "http://localhost:8080");
    
    envio.onreadystatechange = function()
    {
        if(envio.readyState==envio.DONE)
        {
            console.log("reposta aqui");
            console.log(envio.responseText);
        }
    }
    envio.send(arquivoEnviar);
    form.meuButao.disabled = true;
    form.meuButao.value = "Por favor espere...";
    
    // Com o servidor em localhost:8080 habilitado, mudar para return true
    return false;
}

function resetForm(form)
{
    form.meuButao.disabled = false;
    form.meuButao.value = "Enviar";
    document.getElementById("formularioRegistro").reset();
    document.getElementById('Nome').style.borderColor = "grey";
    document.getElementById('Telefone').style.borderColor = "grey";
}
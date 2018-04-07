 $(document).ready(function() {

     function pegarPagina(contudo) {
         //Criando uma Requisicao - Começo
         $.ajax({
             url: "conteudo/" + contudo + ".html",
             beforeSend: function() {
                 $("#container").html('<div class="col-12 mx-auto"><img class-"img-fluid" src="imagens/login.gif"><div>');

             },
             success: function(resultado) {
                 $("#container").html(resultado);
                 $(".btn-info").click(function() {
                     var card = $(this).parent().parent();
                     var nome = card.find('.card-title').html();
                     var valor = card.find("p").first().html();
                     var image = card.find('img').attr('src');
                     salvarDados(nome, valor, image);
                     mostraLivro();
                 });
             },
             statusCode: {
                 404: function() {
                     $("#container").html("<div class='col-12 col-md-6 mx-auto'><h1> =( Ops!</h1><p>Pagina não Encotrada</p></div>");
                 }
             }
         });
         //Fim - requisição
     }

     //Para pegar a URL
     function getUrl() {
         var url = window.location.href;
         url = url.substring(url.search("#") + 1);
         if (url == window.location.href || url == "") {
             mudar($("#principal"));
             return "principal";

         }

         mudar($("#" + url));
         return url;
     }

     //Função - Pegar a URL
     pegarPagina(getUrl());

     //Modificar a Classe Activo do Menu
     function mudar(item) {
         $("nav li a").removeClass("ativ");
         item.addClass("ativ");   
     }

     //Função para Mudar a Pagina - Inicio
     $("#logo").click(function() {
         pegarPagina("principal");
         mudar($(this));
     });

     $("#login").click(function() {
         pegarPagina("login");
         mudar($(this));
     });

     $("#cadastrar").click(function() {
         pegarPagina("cadastrar");
         mudar($(this));
     });

     $("#romance").click(function() {
         pegarPagina("romance");
         mudar($(this));
     });

     $("#ficcao").click(function() {
         pegarPagina("ficcao");
         mudar($(this));
     });


     $("#policial").click(function() {
         pegarPagina("policial");
         mudar($(this));
     });

     $("#autoajuda").click(function() {
         pegarPagina("autoajuda");
         mudar($(this));
     });


     $("#humor").click(function() {
         pegarPagina("humor");
         mudar($(this));
     });

     $("#suspense").click(function() {
         pegarPagina("suspense");
         mudar($(this));
     });

     $("#psicologia").click(function() {
         pegarPagina("psicologia");
         mudar($(this));
     });

     $("#religiosos").click(function() {
         pegarPagina("religiosos");
         mudar($(this));
     });

     $("#contos").click(function() {
         pegarPagina("contos");
         mudar($(this));
     });

     $("#finalizar").click(function() {
         pegarPagina("carrinho");
         mudar($(this));
     });
     //Função para Mudar a Pagina - Final


     //Começo - Carrinho
     //Removendo - Carrinho de Compra
     function remover() {
         $(".remover").click(function() {
             //Pegando o INDEX do Arquivo a Excluir
             var div = parseInt($(this).parent().find("span").html().substr(0, 1));
             var livro = JSON.parse(sessionStorage.getItem('livro'));
             //Removendo do Carrinho
             livro.livro.splice(div, 1);
             var myJSON = JSON.stringify(livro);
             sessionStorage.setItem("livro", myJSON);
             mostraLivro();
         });
     }

     //Adicionar Dados no Carrinho de Compras
     function mostraLivro() {
         var livro = JSON.parse(sessionStorage.getItem('livro'));
         var texto = "";
         var total = 0;

         if (livro != null) {
             $.each(livro.livro, function(index, val) {
                 texto += ' <div class="row"><div class="col-3"><img src="' + val.image + '" class="img-fluid livro"></div><div class="col-8"><a href="#">' + val.nome + '</a><p>' + val.valor + '</p><button class="btn btn-danger remover">Remover</button><span class="d-none">' + index + '<span></div></div><div class="dropdown-divider"></div>';
                 val.valor = val.valor.replace("R$", "").replace(",", ".");
                 total += parseFloat(val.valor);
             });
             $("#livros").html(texto);
             $("#qd").html(livro.livro.length);
             $("#valorTotal").html("Valor total: R$ " + total.toFixed(2));
         }
         remover();
     };

     // Salvando - Dados na Session
     function salvarDados(nome, valor, image) {
         if (!sessionStorage.getItem('livro')) {
             var dados = {
                 "livro": [{
                     "nome": nome,
                     "valor": valor,
                     "image": image
                 }]
             };
             var myJSON = JSON.stringify(dados);
             sessionStorage.setItem("livro", myJSON);
         } else {
             var livro = JSON.parse(sessionStorage.getItem('livro'));
             var dado = {
                 "nome": nome,
                 "valor": valor,
                 "image": image
             };
             livro.livro.push(dado);
             var myJSON = JSON.stringify(livro);
             sessionStorage.setItem("livro", myJSON);
         }
     };

     mostraLivro();
     //Fim - Carrinho do Carrinho

 });
 //Fim - $(document).ready
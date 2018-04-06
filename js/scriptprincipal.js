 $(document).ready(function() {

        function pegarPagina(contudo) {
            //Criando uma Requisicao - Começo
            $.ajax({
                url: "conteudo/" + contudo + ".html",
                beforeSend: function() {
                    //Antes de mandar a requisição

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
                        $("#container").html("<h1>Não Encontrado</h1>");

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
                return "principal";
            }

            return url;
        }

        pegarPagina(getUrl());

        $("#logo").click(function() {
            pegarPagina("principal");
        });

        $("#login").click(function() {
            pegarPagina("login");
        });

        $("#cadastrar").click(function() {
            pegarPagina("cadastrar");
        });

        $("#humor").click(function() {
            pegarPagina("humor");
        });

        $("#romance").click(function() {
            pegarPagina("romance");
        });

        $("#autoajuda").click(function() {
            pegarPagina("autoajuda");
        });

        $("#ficcao").click(function() {
            pegarPagina("ficcao");
        });

        $("#policial").click(function() {
            pegarPagina("policial");
        });
        //Começo Carrinho

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
        //fim carrinho
        
    });
    //fim $(document).ready
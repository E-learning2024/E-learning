export async function criarEmailDeConfirmacao(assunto:string,nome:string) {
  const corpoDaMensagem = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #ff6600;
      }
      p {
        color: #333;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #ff6600;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1> ${assunto}</h1>
      <h3>Caro/a, ${nome}</h3>
      <p>Agradecemos por se inscrever em nosso programa de formação. Confirmamos que sua inscrição foi recebida com sucesso. </p>

      <p> Em anexo, você encontrará a fatura correspondente à inscrição, com informações para efetuar o pagamento por transferência bancária ou utilizando a referência de pagamento.</p> 
          
      <p>  O nosso centro de formação, SFFS - Sociedade de Formação Financeira em Seguros, está localizado em Casa nº 54, Rua 8, Bairro Mártires de Kifangondo, em frente ao Empório das Joias, nos arredores das torres do Banco BAI. Caso precise entrar em contato conosco, ligue para o terminal telefônico 946 099 073.</p>
          
      <p> Agradecemos sua participação e esperamos vê-lo(a) em breve.</p>
          
      <p> Atenciosamente,</p>
          
      <p> SFFS - Sociedade de Formação Financeira em Seguros</p>

    </div>
  </body>
  </html>
  `;
  const corpoBroadCasting =
  `  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
  </head>
  <body>
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="color: #333;">Assunto: ${assunto}</h1>
      <h1 style="color: #333;">Olá, Turma!</h1>
      <p style="color: #666;">${nome}.</p>

    </div>
  </body>
  </html>`
  return  {corpoBroadCasting,corpoDaMensagem};
}


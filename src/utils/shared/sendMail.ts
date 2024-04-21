import * as nodemailer from 'nodemailer';

export async function enviarEmail(destinatario: string, assunto: string, corpo: string,anexo: string) {
  const transporter = nodemailer.createTransport({
    host: 'mail.achei.ao',
    port: 465,
    secure: true,
    auth: {
      user: 'elearning@achei.ao',
      pass: '123456789ISAAC@234'
    }
  });

  const mailOptions = {
    from: 'elearning@achei.ao',
    to: destinatario,
    subject: assunto,
    html: corpo,
    
    attachments: [
        {
          filename: 'fatura.pdf',
          path: anexo
        }
      ]
  };

  transporter.sendMail(mailOptions, (error:any, info:any) => {
    if (error) {
      console.log('Erro ao enviar email: ' + error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}

// const destinatario = 'exemplo@example.com';
// const assunto = 'Confirmação de Inscrição';
// const corpo = 'Agradecemos por se inscrever em nosso programa de formação...'; 
// const anexo = 'fatura.pdf'; // Caminho para o arquivo PDF

// enviarEmail(destinatario, assunto, corpo, anexo);
import * as nodemailer from 'nodemailer';
import emailConfig from '../../config/lib/emailConfig';

export async function enviarEmail(destinatario: string, assunto: string, corpo: string,anexo: string) {
  const transporter = nodemailer.createTransport(emailConfig as any);
  const mailOptions = {
    from:  process.env.SMTP_HOST_USER,
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

export async function sendBroadcastingEmail(destinatarios: string[], assunto: string, corpo: string,description: string) {
  const transporter = nodemailer.createTransport(emailConfig as any);
  const mailOptions = {
    from:  process.env.SMTP_HOST_USER,
    to: destinatarios.join(', '),
    subject: assunto,
    html: corpo,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.response);
  } catch (error) {
    console.log('Erro ao enviar email: ' + error);
  }
}

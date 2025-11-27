import fs from "fs";
import path from "path";
import csv from "csv-parser";
import nodemailer from "nodemailer";
import dayjs from "dayjs";

interface Contato {
  nome: string;
  email: string;
  nascimento: string; // formato dd/mm/yyyy
}

// === CONFIGURAÇÕES DO SMTP ===
const SMTP_USER = "seuemail@gmail.com";   // seu e-mail
const SMTP_PASS = "sua_senha_ou_app_password"; // senha de app (gmail) ou senha normal (outros provedores)
const SMTP_HOST = "smtp.seuprovedor.com"; // se usar Gmail, pode deixar vazio
const SMTP_PORT = 587;

// === TRANSPORTER ===
let transporter: nodemailer.Transporter;

if (SMTP_USER.includes("@gmail.com")) {
  // Configuração automática para Gmail
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS, // precisa ser "senha de app" se 2FA ativado
    },
  });
} else {
  // Configuração genérica
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

// === TEMPLATE HTML ===
const template = fs.readFileSync(path.join(__dirname, "Mensagem.html"), "utf-8");

// === FUNÇÃO PARA CALCULAR IDADE ===
function calcularIdade(nascimento: string): number {
  const dataNasc = dayjs(nascimento, "DD/MM/YYYY");
  let idade = dayjs().year() - dataNasc.year();

  if (
    dayjs().month() < dataNasc.month() ||
    (dayjs().month() === dataNasc.month() && dayjs().date() < dataNasc.date())
  ) {
    idade--;
  }
  return idade;
}

// === FUNÇÃO PARA PEGAR O MÊS SEGUINTE ===
function mesSeguinte(mesAniversario: number): string {
  const mes = (mesAniversario + 1) % 12; // 0-11
  return dayjs().month(mes).format("MMMM");
}

// === LER O CSV E ENVIAR ===
fs.createReadStream("emails.csv")
  .pipe(csv({ separator: ";" }))
  .on("data", async (row: Contato) => {
    try {
      const { nome, email, nascimento } = row;

      const idade = calcularIdade(nascimento);
      const dataNasc = dayjs(nascimento, "DD/MM/YYYY");
      const mesquevem = mesSeguinte(dataNasc.month());

      // Substituir placeholders
      const mensagemHtml = template
        .replace("{{nome}}", nome)
        .replace("{{percdesc}}", String(idade))
        .replace("{{mesquevem}}", mesquevem);

      // Envio
      const info = await transporter.sendMail({
        from: `"Empresa" <${SMTP_USER}>`,
        to: email,
        subject: `Parabéns, ${nome}! 🎉`,
        html: mensagemHtml,
        attachments: [
          {
            filename: "logo.png",
            path: path.join(__dirname, "imagens", "logo.png"),
            cid: "logo.png",
          },
          {
            filename: "assinatura.png",
            path: path.join(__dirname, "imagens", "assinatura.png"),
            cid: "assinatura.png",
          },
        ],
      });

      console.log(`✅ E-mail enviado para ${nome} (${email}) -> ${info.messageId}`);
    } catch (err) {
      console.error("❌ Erro ao enviar e-mail:", err);
    }
  })
  .on("end", () => {
    console.log("📤 Todos os e-mails foram processados.");
  });

import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.vom",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHTML = mailGenerator.generate(options.mailgenContent);
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: MAILTRAP_SMTP_PORT,
    auth: {
      user: MAILTRAP_SMTP_USER,
      pass: MAILTRAP_SMTP_PASS,
    },
  });
  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHTML,
  };
  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Error sending mail. Make sure that you have provided your mailtrap credential in the .env file",
    );
    console.error("error: ", error);
  }
};
const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to Project Management App! We're very excited to have you on board.",
      action: {
        instructions:
          "To verify your email and get started with your account, please click the button below:",
        button: {
          color: "#0086b6", // Optional action button color
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro:
        "we received a request to reset your password. If you did not make this request, please ignore this email.",
      action: {
        instructions: "To reset your password, please click the button below:",
        button: {
          color: "#0086b6", // Optional action button color
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};

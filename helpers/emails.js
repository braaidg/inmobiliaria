import nodemailer from "nodemailer";

const registerEmail = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, name, token } = data;

  await transport.sendMail({
    from: "RealEstate.com",
    to: email,
    subject: "Confirm your account on RealEstate.com",
    text: "Confirm your account on RealEstate.com",
    html: `
        <p>Hello ${name}, check your account on RealEstate.com</p>
        
        <p>Your account is created, but we need a confirmation , please click the link:
        <a href="${process.env.BACKEND_URL}:${
      process.env.BACKEND_PORT ?? 3001
    }/auth/email-confirmation/${token}">Confirm your account</a>
        </p>

        <p>If you didn't created this account, ignore this message</p>
    `,
  });
};

export { registerEmail };

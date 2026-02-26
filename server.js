import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, error: "Name, email and message are required." });
  }

  try {
    await transporter.sendMail({
      // Show the sender's email in the "From" field
      from: `"${name}" <${email}>`,
      // Deliver the email to the inbox configured as EMAIL_USER
      to: process.env.EMAIL_USER,
      // Also set reply-to just in case some clients use that
      replyTo: email,
      subject: "New Contact Form Submission - FitFare",
      text: `
New contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Contact API running on http://localhost:${PORT}`);
});


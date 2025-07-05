import nodemailer from 'nodemailer';

export async function POST(req) {
    const { name, email, message } = await req.json();
    console.log(name)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.MY_EMAIL,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}

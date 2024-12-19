import emailjs from 'emailjs-com';

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${process.env.BASE_URL}/api/email/verify-email?token=${verificationToken}`;

  const emailParams = {
    to_email: email,
    verification_url: verificationUrl,
    subject: 'Email Verification',
  };

  try {
    const response = await emailjs.send(
      process.env.EMAIL_SERVICE_ID,
      process.env.EMAIL_TEMPLATE_ID,
      emailParams,
      process.env.EMAIL_USER_ID
    );
    console.log('Verification email sent successfully:', response);
  } catch (error) {
    console.error('Failed to send verification email:', error.text);
  }
};

export default sendVerificationEmail;

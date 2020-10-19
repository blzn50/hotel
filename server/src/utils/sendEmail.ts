import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_KEY || '');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function sendMail(to: string, html: string) {
  const msg = {
    to,
    from: 'Sunshine Hotel <no-reply@sunshinehotel.com>',
    subject: 'Reset Password',
    html,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
}

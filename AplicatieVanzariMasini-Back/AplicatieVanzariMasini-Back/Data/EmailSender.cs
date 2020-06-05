using Microsoft.Extensions.Configuration;
using MimeKit;
using System;

namespace AplicatieVanzariMasini_Back.Data
{
    public class EmailSender : IEmailSender
    {
        //private readonly string _smtpServer = "smtp.gmail.com";

        //private readonly int _smtpPort = 465;

        //private readonly string _smtpUsername = "edibmarian@gmail.com";

        //private readonly string _smtpPassword = "zeceaug2014";

        //private readonly string _smtpFromAddress = "edibmarian@gmail.com";

        //private readonly bool _smtpEnableSSl = true;

        //private readonly bool _smtpUseDefaultCredentials = false;
        private string _smtpServer;
        private int _smtpPort;
        private string _fromAddress;
        private string _fromAddressTitle;
        private string _username;
        private string _password;
        private bool _enableSsl;
        private bool _useDefaultCredentials;

        public EmailSender(IConfiguration configuration) // configuration is automatically added to DI in ASP.NET Core 3.0
        {

            _smtpServer = configuration["Email:SmtpServer"];

            _smtpPort = int.Parse(configuration["Email:SmtpPort"]);

            _smtpPort = _smtpPort == 0 ? 25 : _smtpPort;

            _fromAddress = configuration["Email:FromAddress"];

            _fromAddressTitle = configuration["FromAddressTitle"];

            _username = configuration["Email:SmtpUsername"];

            _password = configuration["Email:SmtpPassword"];

            _enableSsl = bool.Parse(configuration["Email:EnableSsl"]);

            _useDefaultCredentials = bool.Parse(configuration["Email:UseDefaultCredentials"]);

        }
        public bool SendEmail(string toAddress, string subject, string body, string fromName)
        {
            var mimeMessage = new MimeMessage();
            //numele app tau
            mimeMessage.From.Add(new MailboxAddress(fromName, _fromAddress));
            mimeMessage.To.Add(new MailboxAddress(toAddress));

            mimeMessage.Subject = subject;

            var bodyBuilder = new MimeKit.BodyBuilder
            {
                HtmlBody = body
            };

            mimeMessage.Body = bodyBuilder.ToMessageBody();

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {

                client.Connect(_smtpServer, _smtpPort, _enableSsl);

                client.Authenticate(_username, _password); // If using GMail this requires turning on LessSecureApps : https://myaccount.google.com/lesssecureapps

                //implement send async
                //if (sendAsync)

                //{

                //    await client.SendAsync(mimeMessage);

                //}

                //else

                //{
                try
                {
                    client.Send(mimeMessage);
                }
                catch (Exception ex)
                {
                    return false;
                }

                client.Disconnect(true);

                return true;

            }
        }
    }
}

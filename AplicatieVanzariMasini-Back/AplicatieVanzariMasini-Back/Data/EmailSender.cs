﻿using Microsoft.Extensions.Configuration;
using MimeKit;
using System;

namespace AplicatieVanzariMasini_Back.Data
{
    public class EmailSender : IEmailSender
    {
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _fromAddress;
        private readonly string _fromAddressTitle;
        private readonly string _username;
        private readonly string _password;
        private readonly bool _enableSsl;
        private readonly bool _useDefaultCredentials;

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

                client.Authenticate(_username, _password);
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

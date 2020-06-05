namespace AplicatieVanzariMasini_Back.Data
{
    public interface IEmailSender
    {
        public bool SendEmail(string toAddress, string subject, string body, string fromName);
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PortfolioWebsite.Pages
{
    public class IndexModel : PageModel
    {
        public List<ProjectCard> Projects { get; }

        public IndexModel()
        {
            TechTag csharp = new TechTag("C#", "#a78bfa");
            TechTag aspnet = new TechTag("ASP.NET", "#7c3aed");
            TechTag docker = new TechTag("Docker", "#38bdf8");
            TechTag react = new TechTag("React", "#22d3ee");
            TechTag kubernetes = new("Kubernetes", "#326ce5");
            TechTag vue = new("Vue", "#42b883");
            TechTag typescript = new("TypeScript", "#3178c6");
            TechTag tailwind = new("Tailwind CSS", "#38bdf8");
            TechTag sqlServer = new("SQL Server", "#cc2927");

            Projects =
            [
                new ProjectCard(
                    "Athletiqa",
                    false,
                    null,
                    "/images/projects/athletiqa-project.png",
                    "Athletiqa helps young athletes connect with sponsors and receive financial support.",
                    "A full-stack social media platform built around athlete and sponsor accounts. " +
                    "The frontend uses feature-sliced design, while the backend follows vertical slice architecture with CQRS. " +
                    "The application includes database-backed user flows, Cloudinary image uploads, and integrated frontend/backend features. " +
                    "I collaborated with four full-stack developers, two UI/UX designers, and two DevOps developers in an agile workflow with daily standups and weekly check-ins.",
                    [csharp, aspnet, docker, react, vue, sqlServer, kubernetes, typescript, tailwind]),
                new ProjectCard(
                    "REST-API experiment",
                    true,
                    "https://github.com/GitUser4179/REST-API",
                    "/images/projects/restapi-project.jpg",
                    "REST-API utilizing controllers",
                    "A quick experiment to accustom myself to intializing a code-first database and a REST api utilizing controllers and DTOs. " +
                    "In this experiment I learnt about separating data you want hidden in models and less sensitive data in DTOs so that sensitive information does not get sent out." +
                    "It is also my first few babysteps for learning ASP.NET code-first database including dataseeding through modelBuilder.",
                    [csharp]),
                new ProjectCard(
                    "AFGR Bank",
                    true,
                    "https://github.com/FrusTrick/AFGRBank",
                    "/images/projects/project-image.png",
                    "Console Only Bank Application",
                    "An object-oriented banking system built entirely for the console without using a database. " +
                    "I collaborated with four other developers over a short period to implement multiple bank accounts, " +
                    "passwords, transactions, currencies, savings, login, loans, an admin menu, and validation. " +
                    "The project focused on learning the fundamentals of object-oriented programming.",
                    [csharp, sqlServer]){
                },
            ];
        }

        public record ProjectCard
        (
            string Title,
            bool IsOpenSource, 
            string? SourceUrl,
            string ImagePath, 
            string Summary, 
            string Description, 
            List<TechTag> TechTags
        );

        public record TechTag(string Name, string Color);

        public void OnGet()
        {
        }
    }
}

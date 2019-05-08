using KnowledgeAppBackend.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace KnowledgeAppBackend.Data
{
    public class MyAppContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Knowledge> Knowledges { get; set; }
        public DbSet<SkillInheritance> SkillInheritances { get; set; }

        public MyAppContext(DbContextOptions<MyAppContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            ConfigureModelBuilderForUser(modelBuilder);
            ConfigureModelBuilderForSkill(modelBuilder);
            ConfigureModelBuilderForSkillInheritance(modelBuilder);
            ConfigureModelBuilderForMessage(modelBuilder);
            ConfigureModelBuilderForTag(modelBuilder);
            ConfigureModelBuilderForKnowledge(modelBuilder);
        }

        void ConfigureModelBuilderForUser(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<User>()
                .Property(user => user.Username)
                .HasMaxLength(60)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(user => user.Email)
                .HasMaxLength(60)
                .IsRequired();
        }

        void ConfigureModelBuilderForSkill(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Skill>().ToTable("Skill");
            modelBuilder.Entity<Skill>()
                .Property(s => s.Name)
                .HasMaxLength(100);

            
        }

        void ConfigureModelBuilderForSkillInheritance(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SkillInheritance>().ToTable("SkillInheritance");
            modelBuilder.Entity<SkillInheritance>()
                .HasOne(pt => pt.Child)
                .WithMany(p => p.Parents)
                .HasForeignKey(pt => pt.ChildId);

            modelBuilder.Entity<SkillInheritance>()
                .HasOne(pt => pt.Parent)
                .WithMany(t => t.Children)
                .HasForeignKey(pt => pt.ParentId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        void ConfigureModelBuilderForMessage(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Message>().ToTable("Message");

            modelBuilder.Entity<Message>()
                .HasOne(pt => pt.Question)
                .WithMany(p => p.Answers);

            modelBuilder.Entity<Message>()
                .HasOne(s => s.Owner)
                .WithMany(u => u.Messages)
                .HasForeignKey(s => s.OwnerId);
        }

        void ConfigureModelBuilderForTag(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tag>().ToTable("Tag");

            modelBuilder.Entity<Tag>()
                .HasOne(pt => pt.Message)
                .WithMany(p => p.Tags)
                .HasForeignKey(pt => pt.MessageId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Tag>()
                .HasOne(pt => pt.Skill)
                .WithMany(t => t.RelatedMessages)
                .HasForeignKey(pt => pt.SkillId);
        }

        void ConfigureModelBuilderForKnowledge(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Knowledge>().ToTable("Knowledge");

            modelBuilder.Entity<Knowledge>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.UserSkill)
                .HasForeignKey(pt => pt.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Knowledge>()
                .HasOne(pt => pt.Skill)
                .WithMany(t => t.SkillUsers)
                .HasForeignKey(pt => pt.SkillId);
        }
    }
}

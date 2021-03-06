﻿// <auto-generated />
using System;
using KnowledgeAppBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace KnowledgeAppBackend.Migrations
{
    [DbContext(typeof(MyAppContext))]
    [Migration("20191208185627_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("KnowledgeAppBackend.Model.Knowledge", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Rating");

                    b.Property<Guid>("SkillId");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("SkillId");

                    b.HasIndex("UserId");

                    b.ToTable("Knowledge");
                });

            modelBuilder.Entity("KnowledgeAppBackend.Model.Message", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<long>("CreationTime");

                    b.Property<Guid>("OwnerId");

                    b.Property<int>("Priority");

                    b.Property<Guid?>("QuestionId");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.HasIndex("QuestionId");

                    b.ToTable("Message");
                });

            modelBuilder.Entity("KnowledgeAppBackend.Model.Skill", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<bool>("IsRoot");

                    b.Property<string>("Name")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Skill");
                });

            modelBuilder.Entity("KnowledgeAppBackend.Model.SkillInheritance", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("ChildId");

                    b.Property<Guid>("ParentId");

                    b.HasKey("Id");

                    b.HasIndex("ChildId");

                    b.HasIndex("ParentId");

                    b.ToTable("SkillInheritance");
                });

            modelBuilder.Entity("KnowledgeAppBackend.Model.Tag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("MessageId");

                    b.Property<Guid>("SkillId");

                    b.HasKey("Id");

                    b.HasIndex("MessageId");

                    b.HasIndex("SkillId");

                    b.ToTable("Tag");
                });

            modelBuilder.Entity("KnowledgeAppBackend.Model.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("Password");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("KnowledgeAppBackend.Model.Knowledge", b =>
                {
                    b.HasOne("KnowledgeAppBackend.Model.Skill", "Skill")
                        .WithMany("SkillUsers")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("KnowledgeAppBackend.Model.User", "User")
                        .WithMany("UserSkill")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("KnowledgeAppBackend.Model.Message", b =>
                {
                    b.HasOne("KnowledgeAppBackend.Model.User", "Owner")
                        .WithMany("Messages")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("KnowledgeAppBackend.Model.Message", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("KnowledgeAppBackend.Model.SkillInheritance", b =>
                {
                    b.HasOne("KnowledgeAppBackend.Model.Skill", "Child")
                        .WithMany("Parents")
                        .HasForeignKey("ChildId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("KnowledgeAppBackend.Model.Skill", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("KnowledgeAppBackend.Model.Tag", b =>
                {
                    b.HasOne("KnowledgeAppBackend.Model.Message", "Message")
                        .WithMany("Tags")
                        .HasForeignKey("MessageId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("KnowledgeAppBackend.Model.Skill", "Skill")
                        .WithMany("RelatedMessages")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}

﻿using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    internal sealed class AppDBContext: DbContext
    {
        public DbSet<Post> Posts { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Post[] postsToSeed = new Post[6];
            for (int i = 1; i <=6; i++)
            {
                postsToSeed[i - 1] = new Post
                {
                    Content = $"This is post {i}",
                    Title = $"Post {i}",
                    PostId = i
                };
            }
            modelBuilder.Entity<Post>().HasData(postsToSeed);
        }
    }
}

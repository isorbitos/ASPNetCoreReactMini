﻿using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    internal static class PostRepository
    {

        internal async static Task<List<Post>> GetPostAsync()
        {

            using (var db = new AppDBContext())
            {
                return await db.Posts.ToListAsync();
            }
        }

        internal static async Task<Post> GetPostByIdAsync(int postId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Posts.FirstOrDefaultAsync(post=> post.PostId == postId);
            }
        }

        internal async static Task<bool> CreatePostAsync(Post post)
        {
            using(var db = new AppDBContext())
            {
                try
                {
                    await db.Posts.AddAsync(post);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
        internal async static Task<bool> UpdatePostAsync(Post postToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Posts.Update(postToUpdate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
        internal async static Task<bool> DeletePostAsync(int postId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Post postToDelete = await GetPostByIdAsync(postId);
                    db.Remove(postToDelete);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
    }
}

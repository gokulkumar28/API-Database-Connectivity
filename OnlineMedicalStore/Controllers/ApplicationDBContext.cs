using Microsoft.EntityFrameworkCore;
using OnlineMedicalStore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class ApplicationDBContext : DbContext, IDisposable
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }
    public DbSet<Users> users{get;set;}
    public DbSet<Orders> orders{get;set;}
    public DbSet<Medicine> medicine{get;set;}
}
using System;
using System.Collections.Generic;

namespace BookStoreAPI.Models;

public partial class Book
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Isbn { get; set; }

    public decimal? Price { get; set; }

    public int? Authorid { get; set; }

    public DateOnly? Publisheddate { get; set; }

    public virtual Author? Author { get; set; }
}

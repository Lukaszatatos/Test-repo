using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TeamCapacityCalculator.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;

[BindProperty]
public int EmployeeCount { get; set; }

[BindProperty]
public int WorkingDays { get; set; }

[BindProperty]
public int Availability { get; set; }

public int CapacityHours { get; set; }

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
    }

    public void OnPost()
    {
        CapacityHours = EmployeeCount * WorkingDays * 8 * Availability / 100;
    }
}
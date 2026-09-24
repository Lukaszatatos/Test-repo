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

[BindProperty]
public decimal CostPerFte { get; set; }

[BindProperty]
public decimal TotalCost { get; set; }

[BindProperty]
public int CapacityHours { get; set; }
public decimal AvailableFTE { get; set; }
public string Status { get; set; } = "";

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
        TotalCost = (CapacityHours / 8m / WorkingDays) * CostPerFte;
        AvailableFTE = EmployeeCount * Availability / 100m;
        
        if (AvailableFTE < 5)
    {
        Status = "🔴 Under Capacity";
    }
    else if (AvailableFTE < 10)
    {
        Status = "🟡 Near Capacity";
    }
    else
    {
        Status = "🟢 Healthy Capacity";
}
    }
}
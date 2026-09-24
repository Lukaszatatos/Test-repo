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

    public int CapacityHours { get; set; }

    public decimal AvailableFTE { get; set; }

    public decimal TotalCost { get; set; }

    public decimal MonthlyCapacity { get; set; }

    public decimal AnnualCapacity { get; set; }

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
        if (Availability < 0 || Availability > 100)
        {
            Status = "❌ Availability must be between 0 and 100";
            return;
        }

        if (EmployeeCount <= 0 || WorkingDays <= 0)
        {
            Status = "❌ Liczba pracowników i dni roboczych musi być większa od zera";
            return;
        }

        CapacityHours = EmployeeCount * WorkingDays * 8 * Availability / 100;
        AvailableFTE = EmployeeCount * Availability / 100m;
        MonthlyCapacity = AvailableFTE * 160;
        AnnualCapacity = MonthlyCapacity * 12;
        TotalCost = AvailableFTE * CostPerFte;

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

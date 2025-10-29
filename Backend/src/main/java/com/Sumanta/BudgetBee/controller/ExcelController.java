package com.Sumanta.BudgetBee.controller;

import com.Sumanta.BudgetBee.service.ExcelService;
import com.Sumanta.BudgetBee.service.ExpenseService;
import com.Sumanta.BudgetBee.service.IncomeService;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/excel")
public class ExcelController {
  private final ExcelService excelService;
  private final IncomeService incomeService;
  private final ExpenseService expenseService;

  @GetMapping("/download/income")
  public void downloadIncomeExcel(HttpServletResponse response) throws IOException {
    response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheet.sheet");
    response.setHeader("Content-Disposition", "attachment; filename=income-report.xlsx");
    excelService.generateIncomeExcel(response.getOutputStream(), incomeService.getAllIncomesForCurrentUser());
  }

  @GetMapping("/download/expense")
  public void downloadExpenseExcel(HttpServletResponse response) throws IOException {
    response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheet.sheet");
    response.setHeader("Content-Disposition", "attachment; filename=expense-report.xlsx");
    excelService.generateExpenseExcel(response.getOutputStream(), expenseService.getAllExpensesForCurrentUser());
  }
}

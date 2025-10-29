package com.Sumanta.BudgetBee.controller;

import com.Sumanta.BudgetBee.entity.ProfileEntity;
import com.Sumanta.BudgetBee.service.*;
import jakarta.mail.MessagingException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailController {
  private final EmailService emailService;
  private final ExcelService excelService;
  private final IncomeService incomeService;
  private final ExpenseService expenseService;
  private final ProfileService profileService;

  @GetMapping("/income-excel")
  public ResponseEntity<Void> emailIncomeExcel() throws IOException, MessagingException {
    ProfileEntity profile = profileService.getCurrentProfile();
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    excelService.generateIncomeExcel(baos, incomeService.getAllIncomesForCurrentUser());
    emailService.sendEmailWithAttachment(
        profile.getEmail(),
        "Your Income Excel Report - BudgetBee",
        "Please find attached your income report",
        baos.toByteArray(),
        "Income-Report-Details.xlsx");
    return ResponseEntity.ok(null);
  }

  @GetMapping("/expense-excel")
  public ResponseEntity<Void> emailExpenseExcel() throws IOException, MessagingException {
    ProfileEntity profile = profileService.getCurrentProfile();
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    excelService.generateExpenseExcel(baos, expenseService.getAllExpensesForCurrentUser());
    emailService.sendEmailWithAttachment(
        profile.getEmail(),
        "Your Expense Excel Report - BudgetBee",
        "Please find attached your expense report",
        baos.toByteArray(),
        "Expense-Report-Details.xlsx");
    return ResponseEntity.ok(null);
  }
}

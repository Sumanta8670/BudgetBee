package com.Sumanta.BudgetBee.service;

import com.Sumanta.BudgetBee.dto.ExpenseDTO;
import com.Sumanta.BudgetBee.dto.IncomeDTO;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.stream.IntStream;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

@Service
public class ExcelService {

  public void generateIncomeExcel(OutputStream os, List<IncomeDTO> incomes) throws IOException {
    try (Workbook workbook = new XSSFWorkbook()) {
      Sheet sheet = workbook.createSheet("Income-Report-Details");
      Row header = sheet.createRow(0);
      header.createCell(0).setCellValue("Sl.No.");
      header.createCell(1).setCellValue("Income Source");
      header.createCell(2).setCellValue("Category");
      header.createCell(3).setCellValue("Amount");
      header.createCell(4).setCellValue("Date");
      IntStream.range(0, incomes.size())
          .forEach(
              i -> {
                IncomeDTO income = incomes.get(i);
                Row row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(i + 1);
                row.createCell(1).setCellValue(income.getName() != null ? income.getName() : "N/A");
                row.createCell(2).setCellValue(income.getCategoryId() != null ? income.getCategoryName() : "N/A");
                row.createCell(3).setCellValue(income.getAmount() != null ? income.getAmount().doubleValue() : 0);
                row.createCell(4).setCellValue(income.getDate() != null ? income.getDate().toString() : "N/A");
              });
      workbook.write(os);
    }
  }

  public void generateExpenseExcel(OutputStream os, List<ExpenseDTO> expenses) throws IOException {
    try (Workbook workbook = new XSSFWorkbook()) {
      Sheet sheet = workbook.createSheet("Expense-Report-Details");
      Row header = sheet.createRow(0);
      header.createCell(0).setCellValue("Sl.No.");
      header.createCell(1).setCellValue("Expense Source");
      header.createCell(2).setCellValue("Category");
      header.createCell(3).setCellValue("Amount");
      header.createCell(4).setCellValue("Date");
      IntStream.range(0, expenses.size())
          .forEach(
              i -> {
                ExpenseDTO expense = expenses.get(i);
                Row row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(i + 1);
                row.createCell(1).setCellValue(expense.getName() != null ? expense.getName() : "N/A");
                row.createCell(2).setCellValue(expense.getCategoryId() != null ? expense.getCategoryName() : "N/A");
                row.createCell(3).setCellValue(expense.getAmount() != null ? expense.getAmount().doubleValue() : 0);
                row.createCell(4).setCellValue(expense.getDate() != null ? expense.getDate().toString() : "N/A");
              });
      workbook.write(os);
    }
  }
}

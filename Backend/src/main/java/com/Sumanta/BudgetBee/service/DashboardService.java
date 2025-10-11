package com.Sumanta.BudgetBee.service;

import com.Sumanta.BudgetBee.dto.ExpenseDTO;
import com.Sumanta.BudgetBee.dto.IncomeDTO;
import com.Sumanta.BudgetBee.dto.RecentTransactionDTO;
import com.Sumanta.BudgetBee.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Stream.concat;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProfileService profileService;
    private final IncomeService incomeService;
    private  final ExpenseService expenseService;

    public Map<String, Object> getDashboardData() {
        ProfileEntity profile = profileService.getCurrentProfile();

        Map<String, Object> returnValue = new LinkedHashMap<>();
        List<IncomeDTO> latestIncomes = incomeService.getLatest10IncomesForCurrentUser();
        List<ExpenseDTO> latestExpenses = expenseService.getLatest10ExpensesForCurrentUser();
        List<RecentTransactionDTO> recentTransactions = concat(latestIncomes.stream().map(income ->
                RecentTransactionDTO.builder()
                        .id(income.getId())
                        .profileId(profile.getId())
                        .icon(income.getIcon())
                        .name(income.getName())
                        .amount(income.getAmount())
                        .date(income.getDate())
                        .createdAt(income.getCreatedAt())
                        .updatedAt(income.getUpdatedAt())
                        .type("income")
                        .build()),
                latestExpenses.stream().map(expense ->
                        RecentTransactionDTO.builder()
                                .id(expense.getId())
                                .profileId(profile.getId())
                                .icon(expense.getIcon())
                                .name(expense.getName())
                                .amount(expense.getAmount())
                                .date(expense.getDate())
                                .createdAt(expense.getCreatedAt())
                                .updatedAt(expense.getUpdatedAt())
                                .type("expense")
                                .build()))
                .sorted((a,b) -> {
                    int cmp = b.getDate().compareTo(a.getDate());
                    if(cmp == 0 && a.getCreatedAt() != null && b.getCreatedAt() != null){
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    }
                    return cmp;
                }).collect(Collectors.toList());
        returnValue.put("totalBalance",
                incomeService.getTotalIncomesForCurrentUser()
                        .subtract(expenseService.getTotalExpensesForCurrentUser()));
        returnValue.put("totalIncome", incomeService.getTotalIncomesForCurrentUser());
        returnValue.put("totalExpense", expenseService.getTotalExpensesForCurrentUser());
        returnValue.put("recent10Incomes", latestIncomes);
        returnValue.put("recent10Expenses", latestExpenses);
        returnValue.put("recentTransactions", recentTransactions);
        return returnValue;
    }
}

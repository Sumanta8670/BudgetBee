export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const numStr = num.toString();
  const parts = numStr.split(".");

  let integerPart = parts[0];
  let fractionalPart = parts[1];

  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== "") {
    const formattedOtherNumbers = otherNumbers.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
    integerPart = formattedOtherNumbers + "," + lastThree;
  } else {
    integerPart = lastThree;
  }

  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};

export const prepareIncomeLineChartData = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  // Group transactions by date
  const groupedByDate = transactions.reduce((acc, transaction) => {
    const date = transaction.date;

    if (!acc[date]) {
      acc[date] = {
        date: date,
        totalAmount: 0,
        items: [],
      };
    }

    acc[date].totalAmount += Number(transaction.amount);
    acc[date].items.push({
      name: transaction.name,
      amount: Number(transaction.amount),
      icon: transaction.icon,
    });

    return acc;
  }, {});

  // Convert to array and sort by date
  const chartData = Object.values(groupedByDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => {
      const date = new Date(item.date);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      return {
        date: item.date,
        totalAmount: item.totalAmount,
        items: item.items,
        month: `${date.getDate()}${getDaySuffix(date.getDate())} ${
          monthNames[date.getMonth()]
        }`,
      };
    });

  return chartData;
};

export const prepareExpenseLineChartData = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  // Group transactions by date
  const groupedByDate = transactions.reduce((acc, transaction) => {
    const date = transaction.date;

    if (!acc[date]) {
      acc[date] = {
        date: date,
        totalAmount: 0,
        items: [],
      };
    }

    acc[date].totalAmount += Number(transaction.amount);
    acc[date].items.push({
      name: transaction.name,
      amount: Number(transaction.amount),
      icon: transaction.icon,
    });

    return acc;
  }, {});

  // Convert to array and sort by date
  const chartData = Object.values(groupedByDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => {
      const date = new Date(item.date);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      return {
        date: item.date,
        totalAmount: item.totalAmount,
        items: item.items,
        month: `${date.getDate()}${getDaySuffix(date.getDate())} ${
          monthNames[date.getMonth()]
        }`,
      };
    });

  return chartData;
};

// Helper function to get day suffix (1st, 2nd, 3rd, etc.)
const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
